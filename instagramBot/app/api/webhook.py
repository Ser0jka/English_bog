import logging
from typing import Any

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Request
from fastapi.responses import PlainTextResponse

from app.core.config import Settings, get_settings
from app.core.security import verify_meta_signature
from app.services.instagram_api import InstagramApiClient
from app.services.keyword_matcher import KeywordMatcher
from app.services.message_builder import build_private_reply_text, build_public_reply_text
from app.services.webhook_parser import InstagramCommentEvent, extract_comment_events


logger = logging.getLogger(__name__)
router = APIRouter()

processed_comment_ids: set[str] = set()


@router.get("/webhook")
async def verify_webhook(
    mode: str | None = Query(default=None, alias="hub.mode"),
    verify_token: str | None = Query(default=None, alias="hub.verify_token"),
    challenge: str | None = Query(default=None, alias="hub.challenge"),
    settings: Settings = Depends(get_settings),
) -> PlainTextResponse:
    if mode == "subscribe" and verify_token == settings.meta_verify_token and challenge:
        return PlainTextResponse(challenge)

    raise HTTPException(status_code=403, detail="Webhook verification failed")


@router.post("/webhook")
async def receive_webhook(
    request: Request,
    x_hub_signature_256: str | None = Header(default=None),
    settings: Settings = Depends(get_settings),
) -> dict[str, Any]:
    raw_body = await request.body()
    signature_is_valid = verify_meta_signature(raw_body, settings.meta_app_secret, x_hub_signature_256)
    can_skip_signature = settings.environment == "development" and settings.skip_signature_validation
    if not signature_is_valid and not can_skip_signature:
        raise HTTPException(status_code=403, detail="Invalid Meta signature")

    if not signature_is_valid and can_skip_signature:
        logger.warning("Skipping invalid Meta signature because SKIP_SIGNATURE_VALIDATION=true")

    payload = await request.json()
    events = extract_comment_events(payload)

    matcher = KeywordMatcher(
        keywords=settings.trigger_keyword_list,
        allow_any_comment=settings.allow_any_comment,
    )
    instagram = InstagramApiClient(settings)

    handled: list[dict[str, str | bool]] = []
    for event in events:
        result = await _handle_comment_event(event, matcher, instagram, settings)
        handled.append(result)

    return {"ok": True, "events": len(events), "handled": handled}


async def _handle_comment_event(
    event: InstagramCommentEvent,
    matcher: KeywordMatcher,
    instagram: InstagramApiClient,
    settings: Settings,
) -> dict[str, str | bool]:
    if event.comment_id in processed_comment_ids:
        return {"comment_id": event.comment_id, "sent": False, "reason": "duplicate"}

    match = matcher.match(event.text)
    if not match.matched:
        return {"comment_id": event.comment_id, "sent": False, "reason": "keyword_not_matched"}

    private_text = build_private_reply_text(
        telegram_bot_link=settings.telegram_bot_link,
        keyword=match.keyword,
    )
    await instagram.send_private_reply(comment_id=event.comment_id, text=private_text)

    if settings.public_comment_reply_enabled:
        await instagram.reply_to_comment_publicly(
            comment_id=event.comment_id,
            text=build_public_reply_text(),
        )

    processed_comment_ids.add(event.comment_id)
    logger.info("Processed Instagram comment %s from %s", event.comment_id, event.username or "unknown")

    return {
        "comment_id": event.comment_id,
        "sent": True,
        "keyword": match.keyword or "",
        "dry_run": settings.dry_run,
    }

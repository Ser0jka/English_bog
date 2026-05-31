from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class InstagramCommentEvent:
    comment_id: str
    text: str
    media_id: str | None = None
    username: str | None = None
    user_id: str | None = None


def extract_comment_events(payload: dict[str, Any]) -> list[InstagramCommentEvent]:
    events: list[InstagramCommentEvent] = []

    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})
            field = change.get("field", "")

            event = _event_from_change_value(field=field, value=value)
            if event:
                events.append(event)

        for messaging_event in entry.get("messaging", []):
            event = _event_from_messaging_payload(messaging_event)
            if event:
                events.append(event)

    return events


def _event_from_change_value(field: str, value: dict[str, Any]) -> InstagramCommentEvent | None:
    if field not in {"comments", "live_comments"} and "comment_id" not in value and "id" not in value:
        return None

    comment_id = _first_present(value, "comment_id", "id")
    text = _first_present(value, "text", "message")

    if not comment_id or not text:
        return None

    from_user = value.get("from") if isinstance(value.get("from"), dict) else {}

    return InstagramCommentEvent(
        comment_id=str(comment_id),
        text=str(text),
        media_id=str(value["media_id"]) if value.get("media_id") else None,
        username=from_user.get("username") or value.get("username"),
        user_id=str(from_user["id"]) if from_user.get("id") else None,
    )


def _event_from_messaging_payload(payload: dict[str, Any]) -> InstagramCommentEvent | None:
    postback = payload.get("postback", {})
    referral = payload.get("referral", {})
    comment_id = postback.get("mid") or referral.get("comment_id")
    text = postback.get("title") or referral.get("body")

    if not comment_id or not text:
        return None

    sender = payload.get("sender", {})
    return InstagramCommentEvent(
        comment_id=str(comment_id),
        text=str(text),
        user_id=str(sender["id"]) if sender.get("id") else None,
    )


def _first_present(data: dict[str, Any], *keys: str) -> Any | None:
    for key in keys:
        if data.get(key):
            return data[key]
    return None


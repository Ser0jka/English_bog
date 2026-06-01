import logging
from typing import Any

import httpx

from app.core.config import Settings


logger = logging.getLogger(__name__)


class InstagramApiClient:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def send_private_reply(self, comment_id: str, text: str) -> dict[str, Any]:
        payload = {
            "recipient": {"comment_id": comment_id},
            "message": {"text": text},
        }

        return await self._post_instagram_messages(payload)

    async def reply_to_comment_publicly(self, comment_id: str, text: str) -> dict[str, Any]:
        if self.settings.dry_run:
            logger.info("DRY_RUN public comment reply to %s: %s", comment_id, text)
            return {"dry_run": True, "comment_id": comment_id}

        url = f"{self.settings.facebook_graph_base_url}/{comment_id}/replies"
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(
                url,
                data={
                    "message": text,
                    "access_token": self.settings.instagram_access_token,
                },
            )
            response.raise_for_status()
            return response.json()

    async def _post_instagram_messages(self, payload: dict[str, Any]) -> dict[str, Any]:
        if self.settings.dry_run:
            logger.info("DRY_RUN Instagram private reply payload: %s", payload)
            return {"dry_run": True, "payload": payload}

        if not self.settings.ig_user_id or not self.settings.instagram_access_token:
            raise RuntimeError("IG_USER_ID and INSTAGRAM_ACCESS_TOKEN are required when DRY_RUN=false")

        url = f"{self.settings.instagram_graph_base_url}/{self.settings.ig_user_id}/messages"
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(
                url,
                json=payload,
                headers={"Authorization": f"Bearer {self.settings.instagram_access_token}"},
            )
            response.raise_for_status()
            return response.json()


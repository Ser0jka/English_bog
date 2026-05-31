from dataclasses import dataclass
from pathlib import Path
from typing import Optional
import os

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")


def _parse_admin_ids(value: str) -> list[int]:
    ids: list[int] = []
    for item in value.split(","):
        item = item.strip()
        if not item:
            continue
        try:
            ids.append(int(item))
        except ValueError as exc:
            raise ValueError(f"ADMIN_IDS contains non-numeric value: {item}") from exc
    return ids


@dataclass(frozen=True)
class Settings:
    bot_token: str
    admin_ids: list[int]
    channel_username: Optional[str] = None
    channel_url: str = "https://t.me/englishbogg"
    materials_url: str = "https://englishbog.taplink.ws/"
    welcome_video_note_file_id: Optional[str] = None


def get_settings() -> Settings:
    bot_token = os.getenv("BOT_TOKEN", "").strip()
    if not bot_token:
        raise RuntimeError("BOT_TOKEN is required. Add it to bot/.env")

    return Settings(
        bot_token=bot_token,
        admin_ids=_parse_admin_ids(os.getenv("ADMIN_IDS", "")),
        channel_username=os.getenv("CHANNEL_USERNAME", "").strip() or None,
        channel_url=os.getenv("CHANNEL_URL", "https://t.me/englishbogg").strip(),
        materials_url=os.getenv("MATERIALS_URL", "https://englishbog.taplink.ws/").strip(),
        welcome_video_note_file_id=os.getenv("WELCOME_VIDEO_NOTE_FILE_ID", "").strip() or None,
    )


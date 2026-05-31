import logging
from pathlib import Path

from aiogram.exceptions import TelegramAPIError
from aiogram.types import FSInputFile, InlineKeyboardMarkup, Message

from app.config import BASE_DIR, Settings


logger = logging.getLogger(__name__)


def _resolve_video_note(value: str) -> str | FSInputFile:
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = BASE_DIR / candidate

    if candidate.exists() and candidate.is_file():
        return FSInputFile(candidate)

    return value


async def send_welcome(
    message: Message,
    settings: Settings,
    text: str,
    reply_markup: InlineKeyboardMarkup | None,
) -> None:
    if settings.welcome_video_note_file_id:
        try:
            video_note = _resolve_video_note(settings.welcome_video_note_file_id)
            await message.answer_video_note(video_note)
        except TelegramAPIError as e:
            # The text funnel still works even if a saved video-note id is invalid.
            logger.exception("Failed to send welcome video note: %s", e)

    await message.answer(text, reply_markup=reply_markup)

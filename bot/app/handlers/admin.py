from aiogram import Router
from aiogram.filters import Command
from aiogram.types import FSInputFile
from aiogram.types import Message

from app.config import Settings
from app.services.analytics import ANALYTICS_PATH
from app.utils import texts


router = Router()


@router.message(Command("admin"))
async def admin_panel(message: Message, settings: Settings) -> None:
    user_id = message.from_user.id if message.from_user else None
    if user_id not in settings.admin_ids:
        await message.answer("Команда доступна только администратору.")
        return

    await message.answer(texts.ADMIN_STATUS)
    if ANALYTICS_PATH.exists():
        await message.answer_document(FSInputFile(ANALYTICS_PATH))

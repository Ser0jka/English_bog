from aiogram import Bot
from aiogram.exceptions import TelegramAPIError

from app.config import Settings


async def check_user_subscribed(bot: Bot, user_id: int, settings: Settings) -> bool:
    if not settings.channel_username:
        return True

    try:
        member = await bot.get_chat_member(settings.channel_username, user_id)
    except TelegramAPIError:
        # If Telegram does not allow the check, keep the funnel moving.
        return True

    return member.status in {"creator", "administrator", "member"}


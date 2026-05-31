from html import escape

from aiogram import Bot
from aiogram.exceptions import TelegramAPIError
from aiogram.types import User

from app.config import Settings


def _value(data: dict, key: str) -> str:
    raw_value = data.get(key)
    if raw_value is None or raw_value == "":
        return "—"
    return escape(str(raw_value))


def build_admin_message(title: str, lead_data: dict, user: User | None) -> str:
    username = f"@{user.username}" if user and user.username else "—"
    telegram_id = str(user.id) if user else "—"

    return "\n".join(
        [
            f"<b>{escape(title)}</b>",
            "",
            f"<b>Источник:</b> {_value(lead_data, 'source')}",
            f"<b>Имя:</b> {_value(lead_data, 'name')}",
            f"<b>Возраст / для кого английский:</b> {_value(lead_data, 'age_target')}",
            f"<b>Цель:</b> {_value(lead_data, 'goal')}",
            f"<b>Уровень:</b> {_value(lead_data, 'level')}",
            f"<b>Боль:</b> {_value(lead_data, 'pain')}",
            f"<b>Формат:</b> {_value(lead_data, 'format')}",
            f"<b>Контакт:</b> {_value(lead_data, 'contact')}",
            f"<b>Комментарий:</b> {_value(lead_data, 'comment')}",
            f"<b>Username:</b> {escape(username)}",
            f"<b>Telegram ID:</b> {escape(telegram_id)}",
        ]
    )


async def notify_admins(
    bot: Bot,
    settings: Settings,
    user: User | None,
    lead_data: dict,
    title: str = "Новый контакт",
) -> None:
    if not settings.admin_ids:
        return

    text = build_admin_message(title, lead_data, user)
    for admin_id in settings.admin_ids:
        try:
            await bot.send_message(admin_id, text)
        except TelegramAPIError:
            # One unavailable admin chat should not break the user scenario.
            continue

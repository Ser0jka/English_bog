"""
Напоминалка через 24 часа.

Логика: при просмотре форматов в state сохраняется viewed_formats=True.
Отдельная фоновая задача каждый час проверяет всех пользователей
и отправляет напоминание тем, кто смотрел форматы, но не заполнил анкету.

Для простоты хранения используем in-memory словарь.
При перезапуске бота история сбрасывается — это нормально для MVP.
"""

import asyncio
import logging
import time
from typing import Optional

from aiogram import Bot

from app.keyboards.inline import reminder_keyboard
from app.utils import texts


logger = logging.getLogger(__name__)

# user_id -> timestamp когда пользователь открыл форматы
_reminder_queue: dict[int, float] = {}
# user_id -> был ли уже отправлен reminder
_reminded: set[int] = set()

REMINDER_DELAY = 24 * 60 * 60  # 24 часа в секундах


def schedule_reminder(user_id: int) -> None:
    """Поставить пользователя в очередь на напоминалку."""
    if user_id not in _reminded:
        _reminder_queue[user_id] = time.time()


def cancel_reminder(user_id: int) -> None:
    """Отменить напоминалку (пользователь заполнил анкету)."""
    _reminder_queue.pop(user_id, None)
    _reminded.add(user_id)  # больше не напоминаем


async def reminder_loop(bot: Bot) -> None:
    """Фоновый цикл — раз в час проверяет и отправляет напоминания."""
    while True:
        await asyncio.sleep(60 * 60)  # проверяем раз в час
        now = time.time()
        to_remind = [
            uid for uid, ts in list(_reminder_queue.items())
            if now - ts >= REMINDER_DELAY and uid not in _reminded
        ]
        for user_id in to_remind:
            try:
                await bot.send_message(
                    chat_id=user_id,
                    text=texts.REMINDER_TEXT,
                    reply_markup=reminder_keyboard(),
                    parse_mode="HTML",
                )
                _reminded.add(user_id)
                _reminder_queue.pop(user_id, None)
                logger.info("Reminder sent to user %s", user_id)
            except Exception as e:
                logger.warning("Failed to send reminder to %s: %s", user_id, e)

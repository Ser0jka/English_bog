from pathlib import Path
import asyncio
import logging
import sys


if __name__ == "__main__" and __package__ is None:
    sys.path.append(str(Path(__file__).resolve().parents[1]))

from aiohttp import ClientSession
from aiohttp_socks import ProxyConnector
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.client.session.aiohttp import AiohttpSession
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage

from app.config import get_settings
from app.handlers import admin, formats, lead, materials, start, test
from app.services.reminder import reminder_loop


async def main() -> None:
    logging.basicConfig(level=logging.INFO)

    settings = get_settings()
    # Локальный прокси для обхода блокировки Telegram (Hiddify, смешанный порт 12334).
    # В продакшене (сервер вне РФ) эту строку можно убрать и передавать bot без session.
    session = AiohttpSession(proxy="http://127.0.0.1:12334")
    bot = Bot(
        token=settings.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        session=session,
    )
    dp = Dispatcher(storage=MemoryStorage())
    dp["settings"] = settings

    # Порядок важен: formats до lead, чтобы callback "formats" не перехватывался
    dp.include_router(start.router)
    dp.include_router(formats.router)
    dp.include_router(materials.router)
    dp.include_router(test.router)
    dp.include_router(lead.router)
    dp.include_router(admin.router)

    await bot.delete_webhook(drop_pending_updates=True)

    # Запускаем напоминалку фоном
    asyncio.create_task(reminder_loop(bot))

    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())


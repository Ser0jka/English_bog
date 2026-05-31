from pathlib import Path
import asyncio
import logging
import sys


if __name__ == "__main__" and __package__ is None:
    sys.path.append(str(Path(__file__).resolve().parents[1]))

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage

from app.config import get_settings
from app.handlers import admin, lead, materials, start, test


async def main() -> None:
    logging.basicConfig(level=logging.INFO)

    settings = get_settings()
    bot = Bot(
        token=settings.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dp = Dispatcher(storage=MemoryStorage())
    dp["settings"] = settings

    dp.include_router(start.router)
    dp.include_router(materials.router)
    dp.include_router(test.router)
    dp.include_router(lead.router)
    dp.include_router(admin.router)

    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())


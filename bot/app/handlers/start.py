from aiogram import F, Router
from aiogram.filters import CommandStart
from aiogram.filters.command import CommandObject
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from app.config import Settings
from app.handlers.lead import start_lead_flow
from app.handlers.test import start_test_flow
from app.keyboards.inline import main_menu_keyboard, materials_gate_keyboard
from app.services.welcome import send_welcome
from app.utils import texts


router = Router()

KNOWN_SOURCES = {
    "materials",
    "test",
    "site",
    "insta",
    "lead"
}


def normalize_source(payload: str | None) -> str:
    if not payload:
        return "direct"

    source = payload.strip()
    if source in KNOWN_SOURCES:
        return source

    # Unknown payloads are still useful for future campaigns.
    return source[:64]


@router.message(CommandStart())
async def start_command(
    message: Message,
    command: CommandObject,
    state: FSMContext,
    settings: Settings,
) -> None:
    source = normalize_source(command.args)
    await state.clear()
    await state.update_data(source=source)

    if source == "materials":
        await send_welcome(
            message,
            settings,
            f"{texts.MATERIALS_START}\n\n{texts.MATERIALS_GATE}",
            materials_gate_keyboard(settings.channel_url),
        )
        return

    if source == "test":
        await start_test_flow(message, state)
        return

    if source == "lead":
        await start_lead_flow(message, state)
        return

    if source == "site":
        welcome_text = texts.SITE_WELCOME
    elif source == "insta":
        welcome_text = texts.INSTA_WELCOME
    else:
        welcome_text = texts.DEFAULT_WELCOME

    await send_welcome(
        message,
        settings,
        welcome_text,
        main_menu_keyboard(settings.channel_url),
    )


@router.callback_query(F.data == "menu")
async def back_to_menu(callback: CallbackQuery, state: FSMContext, settings: Settings) -> None:
    data = await state.get_data()
    source = data.get("source", "direct")
    await state.clear()
    await state.update_data(source=source)

    if callback.message:
        await callback.message.answer(
            texts.MENU_TEXT,
            reply_markup=main_menu_keyboard(settings.channel_url),
        )
    await callback.answer()

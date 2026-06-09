from aiogram import Bot, F, Router
from aiogram.filters import CommandStart
from aiogram.filters.command import CommandObject
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message
from aiogram.types import User

from app.config import Settings
from app.handlers.lead import start_lead_flow
from app.handlers.test import start_test_flow
from app.keyboards.inline import main_menu_keyboard, materials_gate_keyboard
from app.services.analytics import track_user_event
from app.services.admin_notify import notify_admins
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

STEP_LABELS = {
    "name": "Имя",
    "age_target": "Возраст / для кого английский",
    "goal": "Цель",
    "level": "Уровень",
    "pain": "Боль",
    "format": "Формат",
    "format_time": "Формат / время занятий",
    "contact": "Контакт",
    "comment": "Комментарий",
}


def normalize_source(payload: str | None) -> str:
    if not payload:
        return "direct"

    source = payload.strip()
    if source in KNOWN_SOURCES:
        return source

    # Unknown payloads are still useful for future campaigns.
    return source[:64]


def _step_label(state_name: str | None) -> str:
    if not state_name:
        return "—"
    raw_step = state_name.split(":", 1)[-1]
    return STEP_LABELS.get(raw_step, raw_step)


async def notify_unfinished_form(
    bot: Bot,
    settings: Settings,
    user: User | None,
    state: FSMContext,
) -> None:
    state_name = await state.get_state()
    data = await state.get_data()
    lead_type = data.get("lead_type")

    if not state_name or lead_type not in {"mini-test", "diagnostic"}:
        return

    unfinished_data = {
        **data,
        "status": "Не завершено",
        "current_step": _step_label(state_name),
    }

    if lead_type == "mini-test":
        title = "Незавершенный мини-тест"
        event = "mini_test_abandoned"
    else:
        title = "Незавершенный тест с разбором"
        event = "diagnostic_abandoned"

    await notify_admins(
        bot=bot,
        settings=settings,
        user=user,
        lead_data=unfinished_data,
        title=title,
    )
    track_user_event(user, event, source=data.get("source"), form_data=unfinished_data)


@router.message(CommandStart())
async def start_command(
    message: Message,
    command: CommandObject,
    state: FSMContext,
    bot: Bot,
    settings: Settings,
) -> None:
    source = normalize_source(command.args)
    await notify_unfinished_form(bot, settings, message.from_user, state)
    await state.clear()
    await state.update_data(source=source)
    track_user_event(message.from_user, "start", source=source)

    if source == "materials":
        await send_welcome(
            message,
            settings,
            f"{texts.MATERIALS_START}\n\n{texts.MATERIALS_GATE}",
            materials_gate_keyboard(settings.channel_url),
        )
        return

    if source == "test":
        await start_test_flow(message, state, message.from_user)
        return

    if source == "lead":
        await start_lead_flow(message, state, message.from_user)
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
async def back_to_menu(
    callback: CallbackQuery,
    state: FSMContext,
    bot: Bot,
    settings: Settings,
) -> None:
    await notify_unfinished_form(bot, settings, callback.from_user, state)
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

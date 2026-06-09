from aiogram import Bot, F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from app.config import Settings
from app.keyboards.inline import after_materials_keyboard, materials_gate_keyboard
from app.services.analytics import track_user_event
from app.services.channel_check import check_user_subscribed
from app.utils import texts


router = Router()


async def show_materials_gate(message: Message, state: FSMContext, settings: Settings) -> None:
    data = await state.get_data()
    if "source" not in data:
        await state.update_data(source="materials")

    await message.answer(
        texts.MATERIALS_GATE,
        reply_markup=materials_gate_keyboard(settings.channel_url),
    )


async def give_materials(message: Message, settings: Settings) -> None:
    await message.answer(
        texts.materials_text(settings.materials_url),
        reply_markup=after_materials_keyboard(),
    )


@router.callback_query(F.data == "materials")
async def materials_from_menu(
    callback: CallbackQuery,
    state: FSMContext,
    settings: Settings,
) -> None:
    data = await state.get_data()
    await state.update_data(source=data.get("source", "direct"))

    if callback.message:
        await show_materials_gate(callback.message, state, settings)
    await callback.answer()


@router.callback_query(F.data == "materials_subscribed")
async def materials_after_subscribe(
    callback: CallbackQuery,
    state: FSMContext,
    bot: Bot,
    settings: Settings,
) -> None:
    if not callback.from_user:
        await callback.answer()
        return

    is_subscribed = await check_user_subscribed(bot, callback.from_user.id, settings)
    if not callback.message:
        await callback.answer()
        return

    if not is_subscribed:
        await callback.message.answer(
            texts.SUBSCRIBE_NOT_FOUND,
            reply_markup=materials_gate_keyboard(settings.channel_url),
        )
        await callback.answer()
        return

    await give_materials(callback.message, settings)
    data = await state.get_data()
    track_user_event(callback.from_user, "materials_taken", source=data.get("source"))
    await callback.answer()

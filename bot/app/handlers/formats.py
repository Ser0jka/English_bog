from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery

from app.keyboards.inline import (
    formats_keyboard,
    group_keyboard,
    individual_keyboard,
    refer_friend_keyboard,
)
from app.services.reminder import schedule_reminder
from app.utils import texts


router = Router()


@router.callback_query(F.data == "about")
async def about_handler(callback: CallbackQuery, state: FSMContext) -> None:
    """Ветка 'Обо мне' — базовые цифры Ивана."""
    data = await state.get_data()
    await state.update_data(source=data.get("source", "direct"))

    if callback.message:
        await callback.message.answer(
            texts.ABOUT_INTRO,
            reply_markup=formats_keyboard(),
        )
    await callback.answer()


@router.callback_query(F.data == "formats")
async def formats_handler(callback: CallbackQuery, state: FSMContext) -> None:
    """Главный экран выбора формата."""
    data = await state.get_data()
    # Помечаем что пользователь смотрел форматы — для напоминалки
    await state.update_data(source=data.get("source", "direct"), viewed_formats=True)
    if callback.from_user:
        schedule_reminder(callback.from_user.id)

    if callback.message:
        await callback.message.answer(
            texts.FORMATS_TEXT,
            reply_markup=formats_keyboard(),
        )
    await callback.answer()


@router.callback_query(F.data == "format_individual")
async def individual_handler(callback: CallbackQuery) -> None:
    """Ветка индивидуальных занятий."""
    if callback.message:
        await callback.message.answer(
            texts.INDIVIDUAL_TEXT,
            reply_markup=individual_keyboard(),
        )
    await callback.answer()


@router.callback_query(F.data == "format_group")
async def group_handler(callback: CallbackQuery) -> None:
    """Ветка групповых занятий."""
    if callback.message:
        await callback.message.answer(
            texts.GROUP_TEXT,
            reply_markup=group_keyboard(),
        )
    await callback.answer()


@router.callback_query(F.data == "refer_friend")
async def refer_friend_handler(callback: CallbackQuery) -> None:
    """Кнопка 'Привести друга' → групповые занятия."""
    if callback.message:
        await callback.message.answer(
            texts.REFER_FRIEND_TEXT,
            reply_markup=refer_friend_keyboard(),
        )
    await callback.answer()

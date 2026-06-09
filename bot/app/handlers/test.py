from aiogram import Bot, F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message, User

from app.config import Settings
from app.keyboards.inline import back_to_menu_keyboard, choices_keyboard
from app.services.analytics import track_user_event
from app.services.admin_notify import notify_admins
from app.states.test_states import TestStates
from app.utils import texts


router = Router()


async def start_test_flow(message: Message, state: FSMContext, user: User | None = None) -> None:
    data = await state.get_data()
    source = data.get("source", "test")
    await state.update_data(source=source, lead_type="mini-test")
    track_user_event(user or message.from_user, "mini_test_started", source=source)
    await state.set_state(TestStates.name)
    await message.answer(texts.TEST_INTRO, reply_markup=back_to_menu_keyboard())


@router.callback_query(F.data == "test")
async def test_from_menu(callback: CallbackQuery, state: FSMContext) -> None:
    if callback.message:
        await start_test_flow(callback.message, state, callback.from_user)
    await callback.answer()


@router.message(TestStates.name)
async def test_name(message: Message, state: FSMContext) -> None:
    await state.update_data(name=message.text)
    await state.set_state(TestStates.age_target)
    await message.answer(texts.TEST_AGE_TARGET_QUESTION, reply_markup=back_to_menu_keyboard())


@router.message(TestStates.age_target)
async def test_age_target(message: Message, state: FSMContext) -> None:
    await state.update_data(age_target=message.text)
    await state.set_state(TestStates.goal)
    await message.answer(
        texts.TEST_GOAL_QUESTION,
        reply_markup=choices_keyboard("test_goal", texts.GOAL_CHOICES),
    )


@router.callback_query(TestStates.goal, F.data.startswith("test_goal:"))
async def test_goal(callback: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(goal=callback.data.split(":", 1)[1])
    await state.set_state(TestStates.level)
    if callback.message:
        await callback.message.answer(
            texts.TEST_LEVEL_QUESTION,
            reply_markup=choices_keyboard("test_level", texts.LEVEL_CHOICES),
        )
    await callback.answer()


@router.callback_query(TestStates.level, F.data.startswith("test_level:"))
async def test_level(callback: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(level=callback.data.split(":", 1)[1])
    await state.set_state(TestStates.pain)
    if callback.message:
        await callback.message.answer(
            texts.TEST_PAIN_QUESTION,
            reply_markup=choices_keyboard("test_pain", texts.PAIN_CHOICES),
        )
    await callback.answer()


@router.callback_query(TestStates.pain, F.data.startswith("test_pain:"))
async def test_pain(callback: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(pain=callback.data.split(":", 1)[1])
    await state.set_state(TestStates.format)
    if callback.message:
        await callback.message.answer(
            texts.TEST_FORMAT_QUESTION,
            reply_markup=choices_keyboard("test_format", texts.FORMAT_CHOICES),
        )
    await callback.answer()


@router.callback_query(TestStates.format, F.data.startswith("test_format:"))
async def test_format(callback: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(format=callback.data.split(":", 1)[1])
    await state.set_state(TestStates.contact)
    if callback.message:
        await callback.message.answer(texts.TEST_CONTACT_QUESTION, reply_markup=back_to_menu_keyboard())
    await callback.answer()


@router.message(TestStates.contact)
async def test_contact(
    message: Message,
    state: FSMContext,
    bot: Bot,
    settings: Settings,
) -> None:
    await state.update_data(contact=message.text)
    data = await state.get_data()
    data = {**data, "status": "Завершено", "current_step": "Контакт"}

    await notify_admins(
        bot=bot,
        settings=settings,
        user=message.from_user,
        lead_data=data,
        title="Новый контакт после мини-теста",
    )
    track_user_event(
        message.from_user,
        "mini_test_completed",
        source=data.get("source"),
        form_data=data,
    )
    source = data.get("source", "direct")
    await state.clear()
    await state.update_data(source=source)
    await message.answer(texts.TEST_FINISH, reply_markup=back_to_menu_keyboard())

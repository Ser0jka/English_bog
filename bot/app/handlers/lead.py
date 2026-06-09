from aiogram import Bot, F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from app.config import Settings
from app.keyboards.inline import back_to_menu_keyboard, choices_keyboard
from app.services.admin_notify import notify_admins
from app.services.reminder import cancel_reminder
from app.states.lead_states import LeadStates
from app.utils import texts


router = Router()


async def start_lead_flow(message: Message, state: FSMContext) -> None:
    data = await state.get_data()
    await state.update_data(source=data.get("source", "direct"), lead_type="diagnostic")
    await state.set_state(LeadStates.name)
    await message.answer(texts.LEAD_INTRO, reply_markup=back_to_menu_keyboard())


@router.callback_query(F.data == "lead")
async def lead_from_menu(callback: CallbackQuery, state: FSMContext) -> None:
    if callback.message:
        await start_lead_flow(callback.message, state)
    await callback.answer()


@router.message(LeadStates.name)
async def lead_name(message: Message, state: FSMContext) -> None:
    await state.update_data(name=message.text)
    await state.set_state(LeadStates.goal)
    await message.answer(
        texts.LEAD_GOAL_QUESTION,
        reply_markup=choices_keyboard("lead_goal", texts.GOAL_CHOICES),
    )


@router.callback_query(LeadStates.goal, F.data.startswith("lead_goal:"))
async def lead_goal(callback: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(goal=callback.data.split(":", 1)[1])
    await state.set_state(LeadStates.level)
    if callback.message:
        await callback.message.answer(
            texts.LEAD_LEVEL_QUESTION,
            reply_markup=choices_keyboard("lead_level", texts.LEVEL_CHOICES),
        )
    await callback.answer()


@router.callback_query(LeadStates.level, F.data.startswith("lead_level:"))
async def lead_level(callback: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(level=callback.data.split(":", 1)[1])
    await state.set_state(LeadStates.format_time)
    if callback.message:
        await callback.message.answer(texts.LEAD_FORMAT_TIME_QUESTION, reply_markup=back_to_menu_keyboard())
    await callback.answer()


@router.message(LeadStates.format_time)
async def lead_format_time(message: Message, state: FSMContext) -> None:
    await state.update_data(format=message.text)
    await state.set_state(LeadStates.contact)
    await message.answer(texts.LEAD_CONTACT_QUESTION, reply_markup=back_to_menu_keyboard())


@router.message(LeadStates.contact)
async def lead_contact(message: Message, state: FSMContext) -> None:
    await state.update_data(contact=message.text)
    await state.set_state(LeadStates.comment)
    await message.answer(texts.LEAD_COMMENT_QUESTION, reply_markup=back_to_menu_keyboard())


@router.message(LeadStates.comment)
async def lead_comment(
    message: Message,
    state: FSMContext,
    bot: Bot,
    settings: Settings,
) -> None:
    await state.update_data(comment=message.text)
    data = await state.get_data()

    await notify_admins(
        bot=bot,
        settings=settings,
        user=message.from_user,
        lead_data=data,
        title="Новый контакт после теста",
    )
    # Анкета заполнена — отменяем напоминалку
    if message.from_user:
        cancel_reminder(message.from_user.id)

    source = data.get("source", "direct")
    await state.clear()
    await state.update_data(source=source)
    await message.answer(texts.LEAD_FINISH, reply_markup=back_to_menu_keyboard())

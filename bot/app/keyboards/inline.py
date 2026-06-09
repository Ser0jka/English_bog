from aiogram.types import InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder


def main_menu_keyboard(channel_url: str) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="👤 Обо мне", callback_data="about")
    builder.button(text="📋 Форматы занятий и цены", callback_data="formats")
    builder.button(text="📝 Записаться на урок", callback_data="lead")
    builder.button(text="📌 Telegram-канал", url=channel_url)
    builder.adjust(1)
    return builder.as_markup()


def formats_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="👤 Индивидуальные занятия", callback_data="format_individual")
    builder.button(text="👥 Групповые занятия", callback_data="format_group")
    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    builder.adjust(1)
    return builder.as_markup()


def individual_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📝 Записаться — первый урок бесплатно!", callback_data="lead")
    builder.button(text="⬅️ Назад к форматам", callback_data="formats")
    builder.adjust(1)
    return builder.as_markup()


def group_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📝 Записаться", callback_data="lead")
    builder.button(text="🤝 Привести друга", callback_data="refer_friend")
    builder.button(text="⬅️ Назад к форматам", callback_data="formats")
    builder.adjust(1)
    return builder.as_markup()


def refer_friend_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📝 Оставить контакт", callback_data="lead")
    builder.button(text="⬅️ Назад", callback_data="format_group")
    builder.adjust(1)
    return builder.as_markup()


def materials_gate_keyboard(channel_url: str) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📌 Telegram-канал", url=channel_url)
    builder.button(text="✅ Я подписался", callback_data="materials_subscribed")
    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    builder.adjust(1)
    return builder.as_markup()


def after_materials_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📋 Форматы занятий", callback_data="formats")
    builder.button(text="📝 Записаться на урок", callback_data="lead")
    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    builder.adjust(1)
    return builder.as_markup()


def back_to_menu_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    return builder.as_markup()


def reminder_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📋 Посмотреть форматы", callback_data="formats")
    builder.button(text="📝 Записаться на урок", callback_data="lead")
    builder.adjust(1)
    return builder.as_markup()


def choices_keyboard(prefix: str, choices: list[str]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for choice in choices:
        builder.button(text=choice, callback_data=f"{prefix}:{choice}")

    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    builder.adjust(1)
    return builder.as_markup()

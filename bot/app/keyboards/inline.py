from aiogram.types import InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder


def main_menu_keyboard(channel_url: str) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="📚 Получить материалы", callback_data="materials")
    builder.button(text="🧠 Пройти мини-тест", callback_data="test")
    builder.button(text="📝 Пройти тест с разбором", callback_data="lead")
    builder.button(text="📌 Telegram-канал", url=channel_url)
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
    builder.button(text="🧠 Пройти мини-тест", callback_data="test")
    builder.button(text="📝 Пройти тест с разбором", callback_data="lead")
    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    builder.adjust(1)
    return builder.as_markup()


def back_to_menu_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    return builder.as_markup()


def choices_keyboard(prefix: str, choices: list[str]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for choice in choices:
        builder.button(text=choice, callback_data=f"{prefix}:{choice}")

    builder.button(text="⬅️ Назад в меню", callback_data="menu")
    builder.adjust(1)
    return builder.as_markup()

def build_private_reply_text(telegram_bot_link: str, keyword: str | None = None) -> str:
    return (
        "Привет! Спасибо за комментарий 🙌\n\n"
        "Собрал для тебя материалы и короткий тест по английскому. "
        "Забрать можно здесь:\n"
        f"{telegram_bot_link}\n\n"
        "Если ссылка не открылась, напиши мне в ответ слово «материалы»."
    )


def build_public_reply_text() -> str:
    return "Спасибо! Отправил ссылку в Direct 🙌"


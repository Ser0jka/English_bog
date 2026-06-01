from dataclasses import dataclass


@dataclass(frozen=True)
class KeywordMatch:
    matched: bool
    keyword: str | None = None


class KeywordMatcher:
    def __init__(self, keywords: list[str], allow_any_comment: bool = False) -> None:
        self.keywords = [keyword.lower() for keyword in keywords]
        self.allow_any_comment = allow_any_comment

    def match(self, text: str) -> KeywordMatch:
        normalized = text.lower()

        if self.allow_any_comment:
            return KeywordMatch(matched=True, keyword="any")

        for keyword in self.keywords:
            if keyword in normalized:
                return KeywordMatch(matched=True, keyword=keyword)

        return KeywordMatch(matched=False)


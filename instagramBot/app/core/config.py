from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "English Bog Instagram Bot"
    environment: Literal["development", "production"] = "development"

    meta_verify_token: str = Field(default="", alias="META_VERIFY_TOKEN")
    meta_app_secret: str = Field(default="", alias="META_APP_SECRET")
    instagram_access_token: str = Field(default="", alias="INSTAGRAM_ACCESS_TOKEN")
    ig_user_id: str = Field(default="", alias="IG_USER_ID")
    graph_api_version: str = Field(default="v22.0", alias="GRAPH_API_VERSION")

    telegram_bot_link: str = Field(
        default="https://t.me/BOT_USERNAME?start=insta",
        alias="TELEGRAM_BOT_LINK",
    )
    trigger_keywords: str = Field(
        default="материал,материалы,ссылка,тест,урок",
        alias="TRIGGER_KEYWORDS",
    )
    allow_any_comment: bool = Field(default=False, alias="ALLOW_ANY_COMMENT")
    dry_run: bool = Field(default=True, alias="DRY_RUN")
    skip_signature_validation: bool = Field(default=False, alias="SKIP_SIGNATURE_VALIDATION")
    public_comment_reply_enabled: bool = Field(default=False, alias="PUBLIC_COMMENT_REPLY_ENABLED")

    @property
    def trigger_keyword_list(self) -> list[str]:
        return [item.strip().lower() for item in self.trigger_keywords.split(",") if item.strip()]

    @property
    def instagram_graph_base_url(self) -> str:
        return f"https://graph.instagram.com/{self.graph_api_version}"

    @property
    def facebook_graph_base_url(self) -> str:
        return f"https://graph.facebook.com/{self.graph_api_version}"


@lru_cache
def get_settings() -> Settings:
    return Settings()

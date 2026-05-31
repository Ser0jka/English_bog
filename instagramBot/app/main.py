from fastapi import FastAPI

from app.api.webhook import router as webhook_router
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(title=settings.app_name)
app.include_router(webhook_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


""" Api to manage visualiation pages.
"""
from fastapi import APIRouter, \
    Request
from fastapi.templating import Jinja2Templates

visualize = APIRouter(
    prefix="/visualize",
    tags=["visualize"],
    responses={404: {"description": "Not found"}},
)

templates = Jinja2Templates(directory="app/templates")

@visualize.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

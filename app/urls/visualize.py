""" Api to manage visualiation pages.
"""
from fastapi import APIRouter, \
    Request
from fastapi.templating import Jinja2Templates
from app.resources import get_elements

visualize = APIRouter(
    prefix="/visualize",
    tags=["visualize"],
    responses={404: {"description": "Not found"}},
)

api = APIRouter(
    prefix="/api",
    tags=["api"],
    responses={404: {"description": "Not found"}},
)

templates = Jinja2Templates(directory="app/front/templates")

@visualize.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@api.get("/elements/{label}")
def api_get_elements(label=None):
    """ Get the elements list.
    
        Args:
            label (str, optional): Label à filtrer. Defaults to None.
    """
    elements = get_elements(label)

    return elements


""" Point d'entrée FastAPI.
"""
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .urls.visualize import visualize, \
    api


app = FastAPI(title="vidimost-viz",
              version="0.0.1")
app.include_router(visualize)
app.include_router(api)

app.mount("/static", StaticFiles(directory="app/front/static"), name="static")

@app.get("/")
def read_root():
    """ Url example.
    """
    return {"Hello": "World"}

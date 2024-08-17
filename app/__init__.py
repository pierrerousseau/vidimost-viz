""" Point d'entrée FastAPI.
"""
from fastapi import FastAPI

app = FastAPI(title="vidimost-viz",
              version="0.0.1")


@app.get("/")
def read_root():
    """ Url example.
    """
    return {"Hello": "World"}
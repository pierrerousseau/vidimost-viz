""" Get resources from outside.
"""
import logging
import requests

URL = {"root": "http://localhost:5001",
       "elements": "/api/elements"}


def get_elements(label):
    """ Récupère les éléments par l'api de vidimost-db.
    """
    url = f"{URL['root']}{URL['elements']}/{label}"

    result = {}
    try:
        response = requests.get(url)
        response.raise_for_status()

        result = response.json()
    except requests.exceptions.RequestException as error:
        logging.error(f"Erreur lors de la requête: {error}")
    
    return result

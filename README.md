Vidimost-db
===========

Application to store data.


Requirements
============

* git bash
* python 3
* virtualenv (pip)
* virtualenvwrapper / virtualenvwrapper-win (pip)
* doit (pip)


Start
=====

* (optional) source /usr/local/bin/virtualenvwrapper_lazy.sh
* mkvirtualenv vidimost-viz / workon vidimost-viz
* doit install
* (optional) doit docker_build


Launch
======

* doit list
    * doit uvicorn
* once launched visit : http://localhost:8000
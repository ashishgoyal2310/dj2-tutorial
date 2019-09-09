# Readme

## prerequisite
- linux
- python >= 3.x
- django >= 2.x
- djangorestframework
- redis
- celery

cd path/to/djangoReact (get into the project root directory where the project(i.e djangoReact) is cloned)

## create virtual environment
virtualenv -p /usr/bin/python3 env

## activate virtual environment
source env/bin/activate

## create tables in database
python manage.py migrate

## runserver
python manage.py runserver 127.0.0.1:8000

## run celery
celery -A config.celery worker --loglevel=INFO

## visit tracker screen
- http://127.0.0.1:8000/trackers/

## Redis
redis-server
redis-cli

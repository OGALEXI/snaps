pipenv install -r requirements.txt

pipenv shell

flask db migrate -m "create tables"

flask db upgrade

flask seed all

flask run
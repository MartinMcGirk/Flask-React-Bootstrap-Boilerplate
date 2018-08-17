# React/Redux/Flask boilerplate

This is a project I put together to act as a boilerplate for all my future web projects.
Feel free to use as required.

Provided in the boilerplate are:
- A landing page with in place register input
- Blank pages for demonstrating client side routing
- A fully functional register and login page
- Token based auth to the api
- A user dashboard and profile page

It uses a frontend built in React 16, with a Redux store, and it uses token based
authentication to talk to a backend API built using the python Flask framework.
Webpack is used for bundling. It's setup
to take a postgres database connection string for persistence, and to deploy easily
to the web using heroku. It also does hot reloading of the page as you are developing
for an easier experience.

## Running the backend

To get started, clone this repo, and do the following:

    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.txt

Then set the SQLALCHEMY_DATABASE_URI environment variable:

On Linux:

    export SQLALCHEMY_DATABASE_URI=<connection string here>

On Windows:

    set SQLALCHEMY_DATABASE_URI=<connection string here>

To create the database:

    python manage.py create_db

To create migrations:

    python manage.py db migrate

To run migrations:

    python manage.py db upgrade

To run the backend:

    python api.py

## Running the frontend

Once you've got that running you can get started with the frontend:

    cd static
    npm install

Then because the api runs on port 5000, and the frontend runs separately for development
you should add a file to the `static` folder called `.env.development` and add the following
line to it:

    API_ROOT=http://localhost:5000

Then start the frontend with:

    npm run dev-server

Uses basic auth to get a token from /login and then token auth from there out.
Put your token in the x-access-token header field/

Rename and fill out config/settings_example.py to settings.py before running or deployment.
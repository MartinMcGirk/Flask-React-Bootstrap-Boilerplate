from flask import Flask, render_template
from flask_cors import CORS

from blueprints.auth import auth
from blueprints.candidate import candidates
from blueprints.users import users
from extensions import db


def extensions(app):
    db.init_app(app)
    return None

app = Flask(__name__, static_folder="./static/public/dist", template_folder="./static/public")
CORS(app)

app.config.from_object('config.settings')
app.config.from_pyfile('settings.py', silent=True)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


app.register_blueprint(auth)
app.register_blueprint(users)
app.register_blueprint(candidates)
extensions(app)


if __name__ == '__main__':
    app.run(debug=True)
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from api import app, db
from test_data import create_test_data

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)

@manager.command
def create_db():
    """Creates the database tables"""
    db.create_all()
    create_test_data()

@manager.command
def delete_db():
    """Drops the database tables"""
    db.drop_all()

if __name__ == '__main__':
    manager.run()



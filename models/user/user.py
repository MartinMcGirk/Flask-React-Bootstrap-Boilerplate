import enum
import uuid

from sqlalchemy import Column, Boolean, String, Integer
from extensions import db
from lib.util_sqlalchemy import ResourceMixin


class User(ResourceMixin, db.Model):
    username = Column(String(50))
    password = Column(String(80))
    role = Column(String(50))

    def is_candidate(self):
        return self.role == 'candidate'

    def is_admin(self):
        return self.role == 'admin'


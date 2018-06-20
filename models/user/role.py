from sqlalchemy import Column, Integer, String

from extensions import db


class Role(db.Model):
    id = Column(Integer, primary_key=True)
    role_name = Column(String(50))
    role_description = Column(String(50))
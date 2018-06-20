import uuid

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship

from extensions import db
from lib.util_sqlalchemy import ResourceMixin
from models.user.user import User


class Candidate(ResourceMixin, db.Model):
    first_name = Column(String(100))
    last_name = Column(String(100))
    pitch = Column(String(2000))
    location = Column(String(100))
    visa_status = Column(String(100))
    phone_number = Column(String(100))
    user_id = Column(Integer, ForeignKey(User.id))

    @hybrid_property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

    user = relationship(User)
import datetime
import uuid

from sqlalchemy import TypeDecorator, DateTime, Column, Integer, String, Boolean

from extensions import db
from lib.util_datetime import tzware_datetime


class AwareDateTime(TypeDecorator):
    """
    A DateTime type which can only store tz-aware DateTimes.

    Source:
      https://gist.github.com/inklesspen/90b554c864b99340747e
    """
    impl = DateTime(timezone=True)

    def process_bind_param(self, value, dialect):
        if isinstance(value, datetime.datetime) and value.tzinfo is None:
            raise ValueError('{!r} must be TZ-aware'.format(value))
        return value

    def __repr__(self):
        return 'AwareDateTime()'


class ResourceMixin(object):
    # Everything has an id
    id = Column(Integer, primary_key=True)
    public_id = Column(String(50), unique=True)
    # Keep track when records are created and updated.
    created_on = db.Column(AwareDateTime(),
                           default=tzware_datetime)
    updated_on = db.Column(AwareDateTime(),
                           default=tzware_datetime,
                           onupdate=tzware_datetime)
    is_deleted = Column(Boolean, default=False)

    def save(self):
        """
        Save a model instance.

        :return: Model instance
        """
        self.public_id = str(uuid.uuid4())
        db.session.add(self)
        db.session.commit()

        return self
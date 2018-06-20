from datetime import datetime

import pytz


def tzware_datetime():
    """
    Return a timezone aware datetime.

    :return: Datetime
    """
    return datetime.now(pytz.utc)


def get_epoch_time(date):
    epoch = datetime(1970, 1, 1)
    i = datetime.utcnow()

    delta_time = (i - epoch).total_seconds()
    return str(delta_time)
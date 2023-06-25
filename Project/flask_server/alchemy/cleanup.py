"""Purge all data from database."""
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from database import session
# from logger import LOGGER


def cleanup_data():
    try:
        session.execute(text("SET FOREIGN_KEY_CHECKS=0;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE due_date_class;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE attendee;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE calendar;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE reminder;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE notification;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE vertex;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE weight;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE edge;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE graph;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE action;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE routine;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE category;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE tag;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE property;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE setting;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE stat;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE info_snippet;"))
        session.commit()
        session.execute(text("TRUNCATE TABLE user;"))
        session.commit()    
        session.execute(text("SET FOREIGN_KEY_CHECKS=1;"))
        session.commit()
        # LOGGER.success("Successfully reset all data.")
    except IntegrityError as e:
        # LOGGER.error(e.orig)
        raise e.orig
    except SQLAlchemyError as e:
        # LOGGER.error(f"Unexpected error when resetting data: {e}")
        raise 
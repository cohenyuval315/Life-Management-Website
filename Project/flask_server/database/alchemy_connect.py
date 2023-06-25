"""Create SQLAlchemy engine and session objects."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import configuration
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URI = configuration.SQLALCHEMY_DATABASE_URI
SQLALCHEMY_DATABASE_PEM = configuration.SQLALCHEMY_DATABASE_PEM
SQLALCHEMY_ECHO = configuration.SQLALCHEMY_ECHO
ssl_args = {"ssl": {"key": SQLALCHEMY_DATABASE_PEM}} 


# Create database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URI,
    echo=SQLALCHEMY_ECHO,
    # connect_args=ssl_args
)

# Create database session
Session = sessionmaker(autocommit=False,
                        autoflush=False,
                        bind=engine)
session = Session()
# db_session = scoped_session(sessionmaker(autocommit=False,
#                                          autoflush=False,
#                                          bind=engine))
Base = declarative_base()
# Base.query = db_session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    import alchemy.models
    Base.metadata.create_all(bind=engine)
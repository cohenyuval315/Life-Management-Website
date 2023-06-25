from config import configuration
# from logger import LOGGER

from .cleanup import cleanup_data
# from .connections import execute_queries
# from .orm import create_and_delete_users
# from .relationships import create_relationships

CLEANUP_DATA = configuration.CLEANUP_DATA

def init_script():
    """Run all scripts."""

    # Part 1: Executing SELECT and UPDATE queries with an SQLAlchemy engine
    LOGGER.info("----------------------------------------------------")
    LOGGER.info("Part 1: Executing queries against an SQLAlchemy engine.")
    # execute_queries()

    # Part 2: Implementing an ORM
    LOGGER.info("----------------------------------------------------")
    LOGGER.info("Part 2: Create and delete records from a data model.")
    # create_and_delete_users()

    # Part 3: ORM relationships
    LOGGER.info("----------------------------------------------------")
    LOGGER.info("Part 3: Utilize relationships to execute JOINs.")
    # create_relationships()

    # OPTIONAL: Reset table data after each run
    if CLEANUP_DATA:
        LOGGER.info("----------------------------------------------------")
        LOGGER.info("Purging all created data...")
        cleanup_data()
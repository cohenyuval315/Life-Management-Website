

# [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
#types:
    # MySQL: mysql
    # PostgreSQL: postgresql
    # SQLite: sqlite
    # Oracle (ugh): oracle
    # Microsoft SQL (slightly less exasperated "ugh"): mssql
#connectors:
    # MySQL: pymysql, mysqldb
    # PostgreSQL: psycopg2, pg8000
    # SQLite: (none needed)
    # Oracle: cx_oracle
    # Microsoft SQL: pymssql, pyodbc
    
class SQLAlchemyAPI(object):
    def __init__(self):
        pass
    
    def init_db(self,db_type,db_connector,username,password,host,port,db_name):
        pass
    
    def init_db_with_url(self,url):
        pass
    
    
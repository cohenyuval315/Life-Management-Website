from neo4j import (
    GraphDatabase,
    WRITE_ACCESS,
)
driver = GraphDatabase.driver(uri='',auth='')

def create_driver(uri, user, password):

    def resolver(address):
        host, port = address
        if host == "x.example.com":
            yield "a.example.com", port
            yield "b.example.com", port
            yield "c.example.com", port
        else:
            yield host, port

    return GraphDatabase.driver(uri, auth=(user, password), resolver=resolver)


def add_person(name):
    driver = create_driver("neo4j://x.example.com", user="neo4j", password="password")
    session = driver.session(default_access_mode=WRITE_ACCESS)
    session.run("CREATE (a:Person {name: $name})", {"name", name})
    session.close()
    driver.close()
from flask import Blueprint,send_from_directory
from flask_restx import Api


from endpoints.auth import auth_ns
from endpoints.notes import note_ns
from endpoints.tags import tag_ns
from endpoints.objectives import objective_ns
from endpoints.routines import routine_ns
from endpoints.me import me_ns
from endpoints.events_items import event_item_ns
from endpoints.categories import category_ns
from endpoints.tasks import task_ns

blueprint = Blueprint('apiv2', __name__, url_prefix='/api/v2')

api2 = Api(blueprint,
    title='My Title',
    version='1.0',
    description='A description',
    # All API metadatas
)

api2.add_namespace(auth_ns)
api2.add_namespace(note_ns)
api2.add_namespace(tag_ns)
api2.add_namespace(objective_ns)
api2.add_namespace(routine_ns)
api2.add_namespace(me_ns)
api2.add_namespace(event_item_ns)
api2.add_namespace(category_ns)
api2.add_namespace(task_ns)


@blueprint.route('/v')
def view_test():
    return send_from_directory('../views/',"main.html")
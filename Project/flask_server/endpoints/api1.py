from flask import Blueprint
from flask_restx import Api


from endpoints.auth import auth_ns
from endpoints.categories import category_ns
from endpoints.events import event_ns
from endpoints.metadata import metadata_ns
from endpoints.objects import object_ns
from endpoints.routines import routine_ns
from endpoints.tags import tag_ns
from endpoints.graphs import graph_ns
from endpoints.notifications import notification_ns
from endpoints.reminders import reminder_ns
from endpoints.settings import setting_ns
from endpoints.stats import stats_ns
from endpoints.calendars import calendar_ns
from endpoints.properties import property_ns
from endpoints.groups import group_ns
from endpoints.me import me_ns

blueprint = Blueprint('api', __name__, url_prefix='/api/v1')

api1 = Api(blueprint,
    title='My Title',
    version='1.0',
    description='A description',
    # All API metadatas
)

api1.add_namespace(auth_ns)
api1.add_namespace(group_ns)
api1.add_namespace(category_ns)
api1.add_namespace(property_ns)
api1.add_namespace(graph_ns)
api1.add_namespace(event_ns)
api1.add_namespace(routine_ns)
api1.add_namespace(metadata_ns)
api1.add_namespace(notification_ns)
api1.add_namespace(reminder_ns)
api1.add_namespace(setting_ns)
api1.add_namespace(stats_ns)
api1.add_namespace(object_ns)
api1.add_namespace(tag_ns)
api1.add_namespace(calendar_ns)
api1.add_namespace(me_ns)
# api.add_namespace(ns2)
# # ...
# api.add_namespace(nsX)
# /api/v3/tags?=name
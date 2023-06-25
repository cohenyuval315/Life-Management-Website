from __future__ import unicode_literals
import enum
import uuid
from sqlalchemy import TypeDecorator, Table, Column, DateTime, Integer, String, Text,ForeignKey,Unicode,UnicodeText,Boolean,cast,null,case,Enum,event,literal_column
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship,backref
from sqlalchemy.orm.interfaces import PropComparator
from sqlalchemy.orm.collections import attribute_mapped_collection
from sqlalchemy.sql import func
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID
from database import Base,session

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class IntEnum(TypeDecorator):
    """
    Enables passing in a Python enum and storing the enum's *value* in the 
    The default would have stored the enum's *name* (ie the string).
    """
    impl = Integer

    def __init__(self, enumtype, *args, **kwargs):
        super(IntEnum, self).__init__(*args, **kwargs)
        self._enumtype = enumtype

    def process_bind_param(self, value, dialect):
        if isinstance(value, int):
            return value

        return value.value

    def process_result_value(self, value, dialect):
        return self._enumtype(value)

class GUID(TypeDecorator):
    """Platform-independent GUID type.

    Uses PostgreSQL's UUID type, otherwise uses
    CHAR(32), storing as stringified hex values.

    """

    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == "postgresql":
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value).int
            else:
                # hexstring
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                value = uuid.UUID(value)
            return value

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class PolymorphicVerticalProperty(object):
    """A key/value pair with polymorphic value storage.
    """

    def __init__(self, key, value=None):
        self.key = key
        self.value = value

    @hybrid_property
    def value(self):
        fieldname, discriminator = self.type_map[self.type]
        if fieldname is None:
            return None
        else:
            return getattr(self, fieldname)

    @value.setter
    def value(self, value):
        py_type = type(value)
        fieldname, discriminator = self.type_map[py_type]

        self.type = discriminator
        if fieldname is not None:
            setattr(self, fieldname, value)

    @value.deleter
    def value(self):
        self._set_value(None)

    @value.comparator
    class value(PropComparator):
        """A comparator for .value, builds a polymorphic comparison
        via CASE."""

        def __init__(self, cls):
            self.cls = cls

        def _case(self):
            pairs = set(self.cls.type_map.values())
            whens = [
                (
                    literal_column("'%s'" % discriminator),
                    cast(getattr(self.cls, attribute), String),
                )
                for attribute, discriminator in pairs
                if attribute is not None
            ]
            return case(whens, value=self.cls.type, else_=null())

        def __eq__(self, other):
            return self._case() == cast(other, String)

        def __ne__(self, other):
            return self._case() != cast(other, String)

    def __repr__(self):
        return "<%s %r=%r>" % (self.__class__.__name__, self.key, self.value)

@event.listens_for(
    PolymorphicVerticalProperty, "mapper_configured", propagate=True
)
def on_new_class(mapper, cls_):
    """Look for Column objects with type info in them, and work up
    a lookup table."""

    info_dict = {}
    info_dict[type(None)] = (None, "none")
    info_dict["none"] = (None, "none")

    for k in mapper.c.keys():
        col = mapper.c[k]
        if "type" in col.info:
            python_type, discriminator = col.info["type"]
            info_dict[python_type] = (k, discriminator)
            info_dict[discriminator] = (k, discriminator)
    cls_.type_map = info_dict

class ProxiedDictMixin(object):
    """Adds obj[key] access to a mapped class.

    This class basically proxies dictionary access to an attribute
    called ``_proxied``.  The class which inherits this class
    should have an attribute called ``_proxied`` which points to a dictionary.

    """

    def __len__(self):
        return len(self._proxied)

    def __iter__(self):
        return iter(self._proxied)

    def __getitem__(self, key):
        return self._proxied[key]

    def __contains__(self, key):
        return key in self._proxied

    def __setitem__(self, key, value):
        self._proxied[key] = value

    def __delitem__(self, key):
        del self._proxied[key]

class RecordMixin(object):
    created = Column(Integer() , default=0)
    modified = Column(Integer(), default=0)
    record_version=Column(Integer(), default=0)
    
class TimeMixin(object):
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
class ContextMixin(object):
    archived_at = Column(DateTime())
    archived = Column(Boolean(), default=False)
    deleted = Column(Boolean(), default=False)
    disabled = Column(Boolean(), default=False)    


# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class FeatureTypes(enum.Enum):
    notes = 1
    wiki = 2
    schedule = 3

class InfoSnippetStateTypes(enum.Enum):
    DEFAULT = 1
    construction = 1
    confirmed = 2
    warning = 3
      
class EventStateTypes(enum.Enum):
    DEFAULT = 1
    free = 1
    busy = 2
       
class EventTypes(enum.Enum):
    DEFAULT = 1
    time=1
    task=2
    event=3
    milestone=4
      
# class ViewTypes(enum.Enum):
#     stars = 1
#     etc = 2

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class HasId(object):
    @declared_attr
    def id(cls):
        return Column('id', GUID, primary_key=True,nullable=False)
        
class HasUserId(object):
    @declared_attr
    def user_id(cls):
        return Column('user_id', GUID,ForeignKey('user.id') ,primary_key=True,nullable=False)

class HasName(object):
    @declared_attr
    def name(cls):
        return Column('name', String(255), nullable=False)
      
class HasDescription(object):
    @declared_attr
    def description(cls):
        return Column('description',String,nullable=False,default='')
      
class HasGroup(object):
    @declared_attr
    def group(cls):
        return Column('group', String(255),nullable=False,default='')
        
class HasView(object):
    
    @declared_attr
    def color(cls):
        return Column('color', String(255))
    
    @declared_attr
    def background_color(cls):
        return Column('background_color', String(255))
    
    @declared_attr
    def dragBackground_color(cls):
        return Column('drag_background_color', String(255))
    
    @declared_attr
    def border_color(cls):
        return Column('border_color', String(255))    

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    
class Property(PolymorphicVerticalProperty,HasId,HasUserId,Base):
    __tablename__ = "property"
    
    key = Column(Unicode(64), primary_key=True)
    type = Column(Unicode(16))
    # add information about storage for different types
    # in the info dictionary of Columns
    int_value = Column(Integer, info={"type": (int, "integer")})
    char_value = Column(UnicodeText, info={"type": (str, "string")})
    boolean_value = Column(Boolean, info={"type": (bool, "boolean")})
    
class Tag(HasId,HasUserId,HasName,HasGroup,TimeMixin,Base):
    __tablename__ = "tag"
    
    def __init__(self,name, group=None):
        self.name = name
        self.group = group
        
    def __repr__(self):
        return "<Tag %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
        
class Category(HasId,HasUserId,HasName,HasGroup,TimeMixin,Base):
    __tablename__ = "category"
    
    feature=Column(Enum(FeatureTypes))
    parent_id=Column(GUID,ForeignKey('category.id'), default='0',nullable=False)

    children = relationship(
        "Category",
        # cascade deletions
        cascade="all, delete-orphan",
        # many to one + adjacency list - remote_side
        # is required to reference the 'remote'
        # column in the join condition.
        backref=backref("category", remote_side=id),
        # children will be represented as a dictionary
        # on the "name" attribute.
        collection_class=attribute_mapped_collection("name"),
    )
    
    def __init__(self, name, feature, parent=None):
        self.feature = feature
        self.name = name
        self.parent = parent
        
        
    def dump(self, _indent=0):
        return (
            "   " * _indent
            + repr(self)
            + "\n"
            + "".join([c.dump(_indent + 1) for c in self.children.values()])
        )
        
    def __repr__(self):
        return "Category(name=%r, id=%r, parent_id=%r)" % (
            self.name,
            self.id,
            self.parent_id,
        )
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
 
class Reminder(HasId,HasUserId,HasName,HasDescription,Base):
    __tablename__ = "reminder"            
    event_id = Column(GUID, ForeignKey("event.id"),nullable=True)
    favorite = Column(Boolean(),nullable=False,default=True)
    on = Column(Boolean(),default=True,nullable=False)
    seen = Column(Boolean(),default=False,nullable=False)    
    alarm_time_length = Column(Integer(),nullable=False)
    max_snooze_count = Column(Integer(),nullable=False,default=5)
    rest_between = Column(Integer(),nullable=False,default=1)
    start_date = Column(DateTime(),nullable=False)

    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Reminder %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
           
class Notification(HasId,HasUserId,HasName,HasDescription,Base):
    __tablename__ = "notification"       
    event_id = Column(GUID, ForeignKey("event.id"),nullable=True)
    start_date=Column(DateTime(),nullable=False)
    seen=Column(Boolean(),default=False,nullable=False)
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Notification %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()

# class Group(HasId,HasUserId,HasName,TimeMixin,Base):
#     __tablename__ = "group"
    
#     def __init__(self,name, group=None):
#         self.name = name

#     def __repr__(self):
#         return "<Group %r>" % self.__tablename__
    
#     def save(self):
#         session.add(self)
#         session.commit()
    
#     def delete(self):
#         session.delete(self)
#         session.commit()
    
#     def update(self):
#         # update ...
#         session.commit()
        
  
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class HasProperties(object):
    
    @declared_attr
    def _proxied(els):
        return association_proxy(
            "properties",
            "value",
            creator=lambda key, value: Property(key=key, value=value), 
        )

    @declared_attr
    def properties(cls):
        property_association = Table(
            "%s_properties" % cls.__tablename__,
            cls.metadata,
            Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__) , primary_key=True, nullable=False),            
            Column("property_id", ForeignKey("property.id")),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__), primary_key=True,
            ),
        )
        return relationship(Property,collection_class=attribute_mapped_collection("key"), secondary=property_association)
    
    @classmethod
    def with_characteristic(self, key, value):
        return self.properties.any(key=key, value=value)

class HasTags(object):

    @declared_attr
    def tags(cls):
        tag_association = Table(
            "%s_tags" % cls.__tablename__,
            cls.metadata,
            Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__), primary_key=True, nullable=False),    
            Column("tag_id", ForeignKey("tag.id")),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__),
                primary_key=True,
            ),
        )
        return relationship(Tag, secondary=tag_association)

class HasCategories(object):
    
    @declared_attr
    def categories(cls):
        category_association = Table(
            "%s_categories" % cls.__tablename__,
            cls.metadata,
            Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__), primary_key=True, nullable=False),    
            Column("category_id", ForeignKey("category.id")),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__),
                primary_key=True,
            ),
        )
        return relationship(Category, secondary=category_association)

# class HasGroups(object):
    
#     @declared_attr
#     def groups(cls):
#         group_association = Table(
#             "%s_groups" % cls.__tablename__,
#             cls.metadata,
#             Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__), primary_key=True, nullable=False),    
#             Column("group_id", ForeignKey("group.id")),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__),
#                 primary_key=True,
#             ),
#         )
#         return relationship(Group, secondary=group_association)



# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class User(HasId,TimeMixin,Base): # HasSettings
    __tablename__ = "user"
    
    username=Column(String(255),unique=True,nullable=False, primary_key=True)
    password=Column(Text,nullable=False)
    firstname=Column(String(255),nullable=False)
    lastname=Column(String(255),nullable=False)
    date_of_birth=Column(DateTime(), nullable=False)
    email=Column(String(255),unique=True,nullable=False)
    bio = Column(Text)
    avatar_url = Column(Text)
    last_seen = Column(DateTime)
    
    routines = relationship("Routine", back_populates="user")
    info_snippets = relationship("InfoSnippet", back_populates="user")
    tags = relationship("Tag", back_populates="user")
    categories = relationship("Category", back_populates="user")
    reminders = relationship("Reminder", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    graphs = relationship("Graph", back_populates="user")
    calendars = relationship("Calendar", back_populates="user")
    events = relationship("Event", back_populates="user")
    

    def __repr__(self):
        return "<User %r>" % self.username
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self, username=None, password=None, firstname=None, lastname=None, date_of_birth=None,email=None, last_seen=None,bio=None,avatar_url=None):
        if username: self.username = username
        if password: self.password = password
        if firstname: self.firstname = firstname
        if lastname: self.lastname = lastname
        if date_of_birth: self.date_of_birth = date_of_birth
        if email: self.email = email
        if last_seen: self.last_seen = last_seen
        if bio: self.bio = bio
        if avatar_url: self.avatar_url = avatar_url
        session.commit()


class InfoSnippet(ProxiedDictMixin,HasId,HasUserId,HasProperties,HasTags,HasCategories,HasName,HasGroup,HasDescription,TimeMixin,Base):
    __tablename__ = "info_snippet"
    state = Column(Enum(InfoSnippetStateTypes),default=InfoSnippetStateTypes.DEFAULT, nullable=False)
    # features = Column(ArrayOfEnum(IntEnum(FeatureTypes)),nullable=False)

    #user = relationship("User", back_populates="info_snippets")   - incase i want shared data
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<InfoSnippet %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()


class Calendar(HasId,HasUserId,HasName,HasDescription,HasView,TimeMixin,Base):
    __tablename__ = "calendar"        
    private=Column(Boolean(),nullable=False,default=False)
    password=Column(Text(),nullable=True)
    events = relationship("Event", back_populates="calendar")

    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Calendar %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
 
class Event(HasId,HasUserId,TimeMixin,HasView,Base):
    __tablename__ = "event"    
    calendar_id=Column(GUID, ForeignKey('calendar.id'),nullable=True)
    calendar = relationship("Calendar", back_populates="events")    
    
    info_snippet_id = Column(GUID, ForeignKey('info_snippet.id'),nullable=True)
    type=Column(Enum(EventTypes))
    title=Column(String(), nullable=False) # name
    body=Column(String(), default='') # description
    
    # due_date_class=Column(GUID,ForeignKey('due_date_class.id'),nullable=False) # group   userDefined
    due_date_class = Column(String(255),default='')
    
    category = Column(Enum(EventTypes),default=EventTypes.DEFAULT,nullable=False) 
    start=Column(DateTime(),nullable=False)
    end=Column(DateTime(),nullable=False)
    all_day=Column(Boolean(),nullable=False,default=False)
    private=Column(Boolean(),nullable=False,default=False)
    visible=Column(Boolean(),nullable=False,default=True)
    read_only=Column(Boolean(),nullable=False,default=False)
    pending=Column(Boolean(),nullable=False,default=False)
    focused=Column(Boolean(),nullable=False,default=False)
    location=Column(String(), default='',nullable=False)
    state=Column(Enum(EventStateTypes) , default=EventStateTypes.DEFAULT,nullable=False) # busy free , userDefined
    going_duration=Column(Integer(),default=0, nullable=False)
    coming_duration=Column(Integer(),default=0,nullable=False)
    recurrence_rule=Column(Integer(), default='',nullable=False)
    custom_style=Column(String(), default='',nullable=False)
    raw=Column(String(),default='',nullable=False) # anything
    reccurance_id=Column(Integer(),nullable=True) # reccurance instance
    attendees = Column(String(255))
    reminders = relationship("Reminder")
    notifications = relationship("Notification")
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Event %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()  


class Action(HasId,HasUserId,HasProperties,HasName,HasDescription,Base):
    __tablename__ = "action"
    duration = Column(Integer, nullable=False)
    info_snippet_id = Column(GUID, ForeignKey('info_snippet.id'),nullable=True)
    routine_id = Column(GUID, ForeignKey("routine.id"),primary_key=True, nullable=False)    
    routine = relationship("Routine", back_populates="actions")
    
    
    @declared_attr
    def parents(cls):
        action_association = Table(
            "action_parents",
            cls.metadata,
            Column("user_id", ForeignKey("action.user_id"), primary_key=True, nullable=False),           
            Column("routine_id", ForeignKey("action.routine_id"), primary_key=True, nullable=False),           
            Column("action_id", ForeignKey("action.id"), primary_key=True),
            Column("parent_id",ForeignKey("action.id")),
        )
        return relationship("action",secondary=action_association)
    
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Action %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
        
class Routine(ProxiedDictMixin,HasId,HasUserId,HasProperties,HasTags,HasCategories,HasName,HasDescription,TimeMixin,Base):
    __tablename__ = "routine"
    actions = relationship("RoutineAction", back_populates="routine")
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Routine %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
        
        
        
class Vertex(ProxiedDictMixin,HasId,HasUserId,HasName,Base):
    __tablename__ = "vertex"
    graph_id = Column(GUID, ForeignKey("graph.id"),nullable=False)
    info_snippet_id = Column(GUID, ForeignKey('info_snippet.id'),nullable=True)
    
    def higher_neighbors(self):
        return [x.higher_vertex for x in self.lower_edges]

    def lower_neighbors(self):
        return [x.lower_vertex for x in self.higher_edges]

    @declared_attr
    def _proxied(els):
        return association_proxy(
            "properties",
            "value",
            creator=lambda key, value: Property(key=key, value=value), 
        )

    @declared_attr
    def properties(cls):
        property_association = Table(
            "%s_properties" % cls.__tablename__,
            cls.metadata,
            Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__) , primary_key=True, nullable=False),            
            Column("graph_id", ForeignKey("%s.graph_id" % cls.__tablename__) , primary_key=True, nullable=False),            
            Column("property_id", ForeignKey("property.id")),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__), primary_key=True,
            ),
        )
        return relationship(Property,collection_class=attribute_mapped_collection("key"), secondary=property_association)
    
    @classmethod
    def with_characteristic(self, key, value):
        return self.properties.any(key=key, value=value)
    
    
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Vertex %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
         
class Edge(HasId,HasUserId, Base):
    __tablename__ = "edge"
    # __table_args__ = {'extend_existing': True}    
    graph_id = Column(GUID, ForeignKey("graph.id"), primary_key=True,nullable=False)
    lower_id = Column(GUID, ForeignKey("vertex.id"), primary_key=True)
    higher_id = Column(GUID, ForeignKey("vertex.id"), primary_key=True)
    
    lower_vertex = relationship(
        Vertex, primaryjoin=lower_id == Vertex.id, backref="lower_edges"
    )

    higher_vertex = relationship(
        Vertex, primaryjoin=higher_id == Vertex.id, backref="higher_edges"
    )


    @declared_attr
    def _proxied(els):
        return association_proxy(
            "properties",
            "value",
            creator=lambda key, value: Property(key=key, value=value), 
        )

    @declared_attr
    def properties(cls):
        property_association = Table(
            "%s_properties" % cls.__tablename__,
            cls.metadata,
            Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__) , primary_key=True, nullable=False),            
            Column("graph_id", ForeignKey("%s.graph_id" % cls.__tablename__) , primary_key=True, nullable=False),                  
            Column("property_id", ForeignKey("property.id")),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__), primary_key=True,
            ),
        )
        return relationship(Property,collection_class=attribute_mapped_collection("key"), secondary=property_association)
    
    @classmethod
    def with_characteristic(self, key, value):
        return self.properties.any(key=key, value=value)
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Edge %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
        
        
        
class Graph(ProxiedDictMixin,HasId,HasUserId,HasProperties,HasTags,HasCategories,HasName,HasDescription,HasGroup,TimeMixin,HasView,Base):
    __tablename__= "graph"
    directed=Column(Boolean(),nullable=False)
    acyclic=Column(Boolean(),nullable=False)
    edges = relationship("Edge", back_populates="graph")
    vertices = relationship("Vertex", back_populates="graph")
    num_vertices =Column(Integer,nullable=False,default=0)
    
    def __init__(self):
        # maybe if need
        pass
        
    def __repr__(self):
        return "<Graph %r>" % self.__tablename__
    
    def save(self):
        session.add(self)
        session.commit()
    
    def delete(self):
        session.delete(self)
        session.commit()
    
    def update(self):
        # update ...
        session.commit()
        
        
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# class Feature(HasId):
#     __tablename__ = "feature"    
#     name = Column('name', Enum(FeatureTypes))
#     def __init__(self):
#         # maybe if need
#         pass
        
#     def __repr__(self):
#         return "<Stat %r>" % self.__tablename__
    
#     def save(self):
#         session.add(self)
#         session.commit()
    
#     def delete(self):
#         session.delete(self)
#         session.commit()
    
#     def update(self):
#         # update ...
#         session.commit()
    
    
# class Stat(HasId,HasName,HasDescription,TimeMixin,Base):
#     __tablename__ = "stat"

#     def __init__(self):
#         # maybe if need
#         pass
        
#     def __repr__(self):
#         return "<Stat %r>" % self.__tablename__
    
#     def save(self):
#         session.add(self)
#         session.commit()
    
#     def delete(self):
#         session.delete(self)
#         session.commit()
    
#     def update(self):
#         # update ...
#         session.commit()
        
        
        
# class Setting(HasId,HasName,HasDescription,TimeMixin,Base):
#     __tablename__ = "setting"
#     default = Column(String)
    

#     def __init__(self):
#         # maybe if need
#         pass
        
#     def __repr__(self):
#         return "<Setting %r>" % self.__tablename__
    
#     def save(self):
#         session.add(self)
#         session.commit()
    
#     def delete(self):
#         session.delete(self)
#         session.commit()
    
#     def update(self):
#         # update ...
#         session.commit()

# class HasStats(object):

#     @declared_attr
#     def _proxied(els):
#         return association_proxy(
#             "stats",
#             "value",
#             creator=lambda key, value: Property(key=key, value=value), 
#         )

#     @declared_attr
#     def stats(cls):
#         stat_association = Table(
#             "%s_stats" % cls.__tablename__,
#             cls.metadata,
#             Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__), primary_key=True, nullable=False),    
#             Column("stat_id", ForeignKey("stat.id")),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__), primary_key=True,
#             ),
#         )
#         return relationship(Stat,collection_class=attribute_mapped_collection("key"), secondary=stat_association)
    
#     @classmethod
#     def with_characteristic(self, key, value):
#         return self.stats.any(key=key, value=value)

# class HasSettings(object):
    
#     @declared_attr
#     def _proxied(els):
#         return association_proxy(
#             "settings",
#             "value",
#             creator=lambda key, value: Property(key=key, value=value), 
#         )
    
#     @declared_attr
#     def settings(cls):
#         setting_association = Table(
#             "%s_settings" % cls.__tablename__,
#             cls.metadata,
#             Column("user_id", ForeignKey("%s.user_id" % cls.__tablename__), primary_key=True, nullable=False),    
#             Column("setting_id", ForeignKey("setting.id")),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__), primary_key=True,
#             ),
#         )
#         return relationship(Setting,collection_class=attribute_mapped_collection("key"), secondary=setting_association)
    
#     @classmethod
#     def with_characteristic(self, key, value):
#         return self.settings.any(key=key, value=value)


# class HasFeatures(object):

#     @declared_attr
#     def features(cls):
#         feature_association = Table(
#             "%s_features" % cls.__tablename__,
#             cls.metadata,
#             Column("feature_id", ForeignKey("feature.id"), primary_key=True),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__),
#                 primary_key=True,
#             ),
#         )
#         return relationship(Feature, secondary=feature_association)


# class HasNotifications(object):
    
#     @declared_attr
#     def notifcations(cls):
#         notification_association = Table(
#             "%s_notifcations" % cls.__tablename__,
#             cls.metadata,
#             Column("notification_id", ForeignKey("notification.id"), primary_key=True),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__),
#                 primary_key=True,
#             ),
#         )
#         return relationship(Notification, secondary=notification_association)


# class HasReminders(object):
    
#     @declared_attr
#     def reminders(cls):
#         reminder_association = Table(
#             "%s_reminders" % cls.__tablename__,
#             cls.metadata,
#             Column("reminder_id", ForeignKey("reminder.id"), primary_key=True),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__),
#                 primary_key=True,
#             ),
#         )
#         return relationship(Reminder, secondary=reminder_association)



# class HasAttendees(object):

#     @declared_attr
#     def attendees(cls):
#         attendee_association = Table(
#             "%s_attendees" % cls.__tablename__,
#             cls.metadata,
#             Column("attendee_id", ForeignKey("attendee.id"), primary_key=True),
#             Column(
#                 "%s_id" % cls.__tablename__,
#                 ForeignKey("%s.id" % cls.__tablename__),
#                 primary_key=True,
#             ),
#         )
#         return relationship(Attendee, secondary=attendee_association)


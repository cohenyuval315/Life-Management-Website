from email.policy import default
from exts import db2 as db
from sqlalchemy import MetaData,Table,declarative_base, Column,Integer,String
from sqlalchemy.orm import declarative_base,relationship

Base = declarative_base()

#from sqlalchemy.dialects.mysql import VARCHAR
#db.session.rolleback()

#__table__ = user_table
# READ!

# PARTITIONS BY TYPE
# db got a lot of work 
# if i want to optimize maybe first make this work

# metadata_obj = MetaData()
# # db.metadata.add(engine)
# class TimestampMixin(object):
#     created = db.Column(
#         db.DateTime, nullable=False, default=datetime.utcnow)
#     updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
#     # class Post(TimestampMixin, db.Model):
# class GetOrQuery(BaseQuery):
#     def get_or(self, ident, default=None):
#         return self.get(ident) or default

# db = SQLAlchemy(query_class=GetOrQuery)
# user = User.query.get_or(user_id, anonymous_user)
# class MyModel(db.Model):
#     cousin = db.relationship('OtherModel', query_class=GetOrQuery)
    
# class Base(db.Model):
#     __abstract__ = True
#     created_on = db.Column(db.DateTime, default=db.func.now())
#     updated_on = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())



class MetaData(db.Model):
    id = db.Column(db.String(), primary_key=True)


class PropertyValue():
    id = db.Column(db.String(), primary_key=True)    

class PropertyValueDateTime(db.Model):
    value=db.Column(db.DateTime())

class PropertyValueText(db.Model):
    value=db.Column(db.Text())   

class PropertyValueDecimal(db.Model):
    value=db.Column(db.Decimal())

class PropertyValueString(db.Model):
    value=db.Column(db.String())

class PropertyValueInt(db.Model):
    value=db.Column(db.Integer())


class Mix(object):
    id = db.Column(db.String(), primary_key=True)
    created = db.Column(db.DateTime(), default=db.func.now())
    lastUpdated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
    createdBy = db.Column(db.Integer())
    modifiedBy = db.Column(db.Integer())
    deleted = db.Column(db.Boolean(), default=False)
    disabled = db.Column(db.Boolean(), default=False)
    recordVersion=db.Column(db.Integer())
    # created = db.Column(db.DateTime, db.ForeignKey("user.id"))

    # def update():
    #     pass  

# meta data


class Attribute(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(100))
    dataType = db.Column(db.String(4))
    measureUnits = db.Column(db.String(10),nullable=False)
    validationRules = db.relationship('ValidationRule',backref=db.backref('attribute'))
    # constraints = db.Column(db.) validation rules
    #template = db.Column() json template 
    #default
    
class AttributeValidationRules(db.Model):
    id = db.Column(db.String(), primary_key=True)
    attributeId = db.Column(db.String(), db.ForeignKey("attribute.id"),nullable=False)    
    validationRuleId = db.Column(db.String(), db.ForeignKey("validation_rule.id"),nullable=False)    






# class Stat(db.Model):
#     pass

# class Statistic(db.Model):
#     pass





class DataType:
    "string",
    "datetime",
    "date",
    "time",
    "int",
    "decimal",
    "number",
    "char",
    "byte",
    "custom"
    
    


class DataType(db.Model):
    id = db.Column(db.String(), primary_key=True)
    type = db.Column(db.String(), primary_key=True) # enum


class ValidationRule(db.Model):
    id = db.Column(db.String(), primary_key=True)
    dataTypeId = db.Column(db.String(), primary_key=True)  # or enum
    name = db.Column(db.String(), primary_key=True)
    description= db.Column(db.String(), primary_key=True)
    rule= db.Column(db.String(), primary_key=True)


class State(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(100))

class Feature(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(100))

class View(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(100))
    dataTypes = db.Column(db.String(100)) # list
    validationRules = db.Column(db.String(100)) # list
    

class Setting(db.Model,Mix):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(300))
    dataTypeId= db.Column(db.String(300))
    default = db.Column(db.String())
    
    # user = db.relationship('UserSetting ' ,back_populates="setting")
        #     entry = db.relationship("Entry", foreign_keys=[entry_id])
    #     entry_user =  db.relationship("Entry", foreign_keys=[entry_user_id])

    #     entities= db.relationship("Entity", secondary=many_to_many_table,
    #                               backref=db.backref("workspaces"))
        
    
    def __repr__(self) -> str:
        return f'<Setting {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, value=None):
        if value: self.value = value
        db.session.commit()

    def _insert(self):
        pass













class property(db.Model):
    id = db.Column(db.String(), primary_key=True)
    attributeId = db.Column(db.String(), primary_key=True)    
    value= db.Column(db.String(), primary_key=True)

class DurationInfo(db.Model):
    id = db.Column(db.String(), primary_key=True)
    infoId = db.Column(db.String(), primary_key=True)
    

class Routine(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name=db.Column(db.String(),nullable=False)
    # splitBy=db.Column(db.String(),nullable=False)# enum = duration time, 
    durationInfos =db.Column(db.String(),nullable=False)
    #DAG-graph adjencylist?
    #view
    #...
    pass


    

class Info(db.Model):
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name=db.Column(db.String(45),nullable=False)
    description=db.Column(db.String(180),nullable=False)
    stateId = db.Column(db.Integer, db.ForeignKey("state.id"))
    properties = db.relationship("InfoAttributes",back_populates="info")
    tagsIds = db.relationship("InfoTags",back_populates="info")
    categoriesIds = db.relationship("InfoCategories",back_populates="info")
    featuresIds = db.relationship("InfoFeatures", back_populates="info")
    groupIds = db.relationship("Child", secondary=association_table)


    def __repr__(self) -> str:
        return f'<Object {self.name}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, name=None, type=None, description=None):
        if name: self.name = name
        if type: self.type = type
        if description: self.description = description
        db.session.commit()


class Property(db.Model):
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String())
    dataTypeId = db.Column(db.String())
    viewId = db.Column(db.String())
    value= db.Column(db.String())
    default=db.Column(db.String())






class User(db.Model):
    id=db.Column(db.String(), primary_key=True,nullable=True)
    username=db.Column(db.String(25),unique=True,nullable=False, primary_key=True)
    password=db.Column(db.Text(),nullable=False)
    firstname=db.Column(db.String(25),nullable=False)
    lastname=db.Column(db.String(25),nullable=False)
    dateOfBirth=db.Column(db.DateTime(), nullable=False)
    email=db.Column(db.String(80),unique=True,nullable=False)
    lastLogin = db.Column(db.DateTime(),default=db.func.now())
    
    def __repr__(self) -> str:
        return f'<User {self.username} >'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, username=None, password=None, firstname=None, lastname=None, date_of_birth=None,email=None, last_login=None):
        if username: self.username = username
        if password: self.password = password
        if firstname: self.firstname = firstname
        if lastname: self.lastname = lastname
        if date_of_birth: self.date_of_birth = date_of_birth
        if email: self.email = email
        if last_login: self.last_login = last_login
        db.session.commit()







class Tag(db.Model):
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String(),nullable=False)


    def __repr__(self) -> str:
        return f'<Property {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, name=None,value=None):
        if name: self.data_type = name
        if value: self.value = value
        db.session.commit()



class Category(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name=db.Column(db.String(),nullable=False)
    description=db.Column(db.String(),nullable=False)
    featureId=db.Column(db.String(),nullable=False)
    group=db.Column(db.String(),nullable=False)
    parentId=db.Column(db.String(),nullable=False,default='0')




class Graph(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name=db.Column(db.String(),nullable=False)
    description=db.Column(db.String(),nullable=False)
    group=db.Column(db.String(),nullable=False)
    isDirected=db.Column(db.Boolean(),nullable=False)
    isAllowCircles=db.Column(db.Boolean(),nullable=False)
    propertiesIds=db.Column(db.String(),nullable=False)
    
    # adjencyList=db.Column(db.String(),nullable=False)
    # views=db.Column(db.String(),nullable=False)
    # weightAttributes=db.Column(db.String(),nullable=False)

    
    #id
    #userid
    #name
    #isDirected
    #isallowcircles
    #weightsAttributes
    #adjenecyList
    # view
    #...

class Edge(db.Model):
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    graphId = db.Column(db.String(), db.ForeignKey("graph.id"),nullable=False)
    vertexParentId = db.Column(db.String(), db.ForeignKey("vertex.id"),nullable=False)
    vertexChildId = db.Column(db.String(), db.ForeignKey("vertex.id"),nullable=False)
    weights = db.Column(db.String())
    #id
    #userId
    #graphId
    #parentId
    #childId
    #weights
    pass

class Weight(db.Model):
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    graphId = db.Column(db.String(), db.ForeignKey("graph.id"),nullable=False)
    edgeId = db.Column(db.String(), db.ForeignKey("edge.id"),nullable=False)
    attributeId = db.Column(db.String(), db.ForeignKey("attribute.id"),nullable=False)
    # weights = db.Column(db.String())

    #id
    #usedId
    #graphId
    #edgeId
    #attrId
    #value
    pass

class Vertex(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    graphId = db.Column(db.String(), db.ForeignKey("graph.id"),nullable=False)
    name=db.Column(db.String(),nullable=False)
    value=db.Column(db.String(),nullable=False)

    #id
    #userId
    #graphId
    #name
    #view
    #outdegree
    #indegree
    #degree
    #value
    #...

    pass










class Notification(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    eventId=db.Column(db.String(),nullable=False)
    eventType=db.Column(db.String(),nullable=False)
    name = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    description= db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    startDate=db.Column(db.DateTime(),nullable=False)
    isSeen=db.Column(db.Boolean(),nullable=False)



class Reminder(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    eventId=db.Column(db.String(),nullable=False)
    eventType=db.Column(db.String(),nullable=False)
    name = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    description= db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    isFavorite = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    isOn = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    isSeen=db.Column(db.Boolean(),nullable=False)    
    alarmTime = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    snoozeCount = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    startDate=db.Column(db.DateTime(),nullable=False)





class Calendar(db.Model):
    id = db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    description= db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    color=db.Column(db.String(),nullable=False)
    borderColor=db.Column(db.String(),nullable=False)
    backgroundColor=db.Column(db.String(),nullable=False)
    dragBackgroundColor=db.Column(db.String(),nullable=False)
    isPrivate=db.Column(db.Boolean(),nullable=False)
    password=db.Column(db.Text(),nullable=False)
    
class EventType:
    "milestone",
    "task",
    "time",
    "routine",
    "event",

class Attendees:
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String())
    
class EventState:
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String())

class DueDateClass:
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    name = db.Column(db.String())

class Event(db.Model):
    id=db.Column(db.String(), primary_key=True)
    userId = db.Column(db.String(), db.ForeignKey("user.id"),nullable=False)
    calendarId=db.Column(db.String(), primary_key=True)
    infoId=db.Column(db.String(), primary_key=True) # can be null
    Type=db.Column(db.String())
    title=db.Column(db.String()) # name
    body=db.Column(db.String()) # description
    dueDateClass=db.Column(db.String()) # group   userDefined
    start=db.Column(db.String())
    end=db.Column(db.String())
    isAllday=db.Column(db.Boolean())
    isPrivate=db.Column(db.Boolean())
    isVisible=db.Column(db.Boolean())
    isReadOnly=db.Column(db.Boolean())
    isPending=db.Column(db.Boolean())
    isFocused=db.Column(db.Boolean())
    location=db.Column(db.String())
    state=db.Column(db.String()) # busy free , userDefined
    goingDuration=db.Column(db.Integer())
    comingDuration=db.Column(db.Integer())
    recurrenceRule=db.Column(db.String())
    color=db.Column(db.String())
    attendees=db.Column(db.String())
    backgroundColor=db.Column(db.String())
    dragBackgroundColor=db.Column(db.String())
    borderColor=db.Column(db.String())
    customStyle=db.Column(db.String())
    raw=db.Column(db.String()) # anything
    reccuranceId=db.Column(db.String()) # reccurance instance

class Group(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(100))


























InfoTags = Table(
    "InfoTag",
    db.Column("infoId", db.ForeignKey("info.id"), primary_key=True),
    db.Column("tagId", db.ForeignKey("tag.id"), primary_key=True),
)
InfoFeatures = Table(
    "InfoFeature",
    # Base.metadata,
    db.Column("infoId", db.ForeignKey("info.id"), primary_key=True),
    db.Column("featureId", db.ForeignKey("feature.id"), primary_key=True),
)
InfoCategories = Table(
    "InfoCategory",
    # Base.metadata,
    db.Column("infoId", db.ForeignKey("info.id"), primary_key=True),
    db.Column("categoryId", db.ForeignKey("category.id"), primary_key=True),
)





class DurationInfoEntity(db.Model):
    id = db.Column(db.String(), primary_key=True)
    duration = db.Column(db.Integer())




class RoutineInfos(db.Model):
    infoId = db.Column(db.String(), db.ForeignKey("info.id"),primary_key=True)
    infoUserId = db.Column(db.String() ,db.ForeignKey("info.userId"), primary_key=True)
    
    attributeId = db.Column(db.String(), db.ForeignKey("attribute.id"),primary_key=True)
    attributeValue = db.Column(db.String(1000),nullable=False)
    
    
    attribute = db.relationship("Attribute", foreign_keys=[attributeId])
    info = db.relationship('Info', foreign_keys=[infoId])
    infoUser = db.relationship('Info', foreign_keys=[infoUserId])








# relations:
# user:

#many to many
class UserSettings(db.Model):
    userId = db.Column(db.String(), db.ForeignKey("user.id"),primary_key=True)
    settingId = db.Column(db.String() ,db.ForeignKey("setting.id"),primary_key=True)
    settingValue = db.Column(db.String())
    
    user = db.relationship("User",foreign_keys=[userId])
    setting = db.relationship('Setting',foreign_keys=[settingId])

    def __repr__(self) -> str:
        return f'<Property {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, key=None,data_type=None,value=None):
        super.update()
        if key: self.key = key
        if data_type: self.data_type = data_type
        if value: self.value = value
        db.session.commit()


# #many to many
# class UserStat(db.Model):
#     pass

# #one to many
# class UserStatistic(db.Model):
#     pass





 # probably dellete

# # one to many
# class UserBackups(db.Model):
#     pass

# #one to many
# class UserInfos(db.Model):
#     pass

# #one to many
# class UserGraphs(db.Model):
#     pass

# #one to many
# class UserEvents(db.Model):
#     pass

# #one to many
# class UserRoutines(db.Model):
#     pass

# #one to many
# class UserCalendars(db.Model):
#     pass


# #one to many
# class UserTags(db.Model):
#     pass

# #one to many
# class UserCategories(db.Model):
#     pass

# #one to many
# class UserReminders(db.Model):
#     pass
    
# #one to many
# class UserNotifications(db.Model):
#     pass




#graph

#many to many
class EdgeWeights(db.Model):
    edgeId = db.Column(db.String(), db.ForeignKey("edge.id"),primary_key=True)
    edgeUserId = db.Column(db.String() ,db.ForeignKey("edge.userId"), primary_key=True)
    edgeGraphId = db.Column(db.String() ,db.ForeignKey("edge.graphId"), primary_key=True)
    
    weightId = db.Column(db.String(), db.ForeignKey("attribute.id"),primary_key=True)
    weightAttribute = db.Column(db.String(1000),nullable=False)
    weightAttributeValue = db.Column(db.String(1000),nullable=False)
    
    
    weight = db.relationship("Weight", foreign_keys=[weightId])
    edge = db.relationship('Info', foreign_keys=[edgeId])
    edgeUser = db.relationship('Edge', foreign_keys=[edgeUserId])
    edgeGraph = db.relationship('Edge', foreign_keys=[edgeGraphId])



#info

# many to many
class InfoAttribute(db.Model):
    infoId = db.Column(db.String(), db.ForeignKey("info.id"),primary_key=True)
    infoUserId = db.Column(db.String() ,db.ForeignKey("info.userId"), primary_key=True)
    
    attributeId = db.Column(db.String(), db.ForeignKey("attribute.id"),primary_key=True)
    
    attributeValue = db.Column(db.String(1000),nullable=False)
    
    
    attribute = db.relationship("Attribute", foreign_keys=[attributeId])
    info = db.relationship('Info', foreign_keys=[infoId])
    infoUser = db.relationship('Info', foreign_keys=[infoUserId])


    def __repr__(self) -> str:
        return f'<Info Attr {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, key=None,data_type=None,value=None):
        if key: self.key = key
        if data_type: self.data_type = data_type
        if value: self.value = value
        db.session.commit()

# many to many
class InfoTag(db.Model):
    id = db.Column(db.String(), primary_key=True)
    infoId = db.Column(db.String(), db.ForeignKey("info.id"),primary_key=True)
    infoUserId = db.Column(db.String() ,db.ForeignKey("info.userId"), primary_key=True)
    tagId = db.Column(db.String(), db.ForeignKey("tag.id"),primary_key=True)

    
    tag = db.relationship("Tag", foreign_keys=[tagId])
    info = db.relationship('Info', foreign_keys=[infoId])
    infoUser = db.relationship('Info', foreign_keys=[infoUserId])


    def __repr__(self) -> str:
        return f'<Property {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, key=None,data_type=None,value=None):
        if key: self.key = key
        if data_type: self.data_type = data_type
        if value: self.value = value
        db.session.commit()


# many to many
class InfoCategory(db.Model):
    id = db.Column(db.String(), primary_key=True)
    infoId = db.Column(db.String(), db.ForeignKey("info.id"),primary_key=True)
    infoUserId = db.Column(db.String() ,db.ForeignKey("info.userId"), primary_key=True)
    categoryId = db.Column(db.String(), db.ForeignKey("category.id"),primary_key=True)

    
    category = db.relationship("Category", foreign_keys=[categoryId])
    info = db.relationship('Info', foreign_keys=[infoId])
    infoUser = db.relationship('Info', foreign_keys=[infoUserId])


    def __repr__(self) -> str:
        return f'<Property {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, key=None,data_type=None,value=None):
        if key: self.key = key
        if data_type: self.data_type = data_type
        if value: self.value = value
        db.session.commit()

# class InfoState(db.Model):
#     pass

class InfoFeatures(db.Model):
    id = db.Column(db.String(), primary_key=True)
    infoId = db.Column(db.String(), db.ForeignKey("info.id"),primary_key=True)
    infoUserId = db.Column(db.String() ,db.ForeignKey("info.userId"), primary_key=True)
    featureId = db.Column(db.String(), db.ForeignKey("feature.id"),primary_key=True)

    
    feature = db.relationship("Feature", foreign_keys=[featureId])
    info = db.relationship('Info', foreign_keys=[infoId])
    infoUser = db.relationship('Info', foreign_keys=[infoUserId])


    def __repr__(self) -> str:
        return f'<Property {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, key=None,data_type=None,value=None):
        if key: self.key = key
        if data_type: self.data_type = data_type
        if value: self.value = value
        db.session.commit()



# calendar

class CalendarEvents(db.Model):
    id = db.Column(db.String(), primary_key=True)
    calendarId = db.Column(db.String(), db.ForeignKey("calendar.id"),primary_key=True)
    calendarUserId = db.Column(db.String() ,db.ForeignKey("calendar.userId"), primary_key=True)
    eventId = db.Column(db.String(), db.ForeignKey("feature.id"),primary_key=True)

    
    event = db.relationship("Event", foreign_keys=[eventId])
    calendar = db.relationship('Info', foreign_keys=[calendarId])
    calendarUser = db.relationship('Info', foreign_keys=[calendarUserId])


    def __repr__(self) -> str:
        return f'<Property {self.key}>'
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, key=None,data_type=None,value=None):
        if key: self.key = key
        if data_type: self.data_type = data_type
        if value: self.value = value
        db.session.commit()


















































































# """




# Table User Settings:
#     user_id: int
#     setting_id: int
#     setting_value: string(1000)
#     created: datetime
#     last_updated: timestamp
#     created_by: int(4)
#     modified_by: int(4)
#     deleted: boolean
#     disabled: boolean
#     record_version: int(4)
    
# """
# class UserSettings(Base):
#     user_id = db.Column(db.Integer(), db.ForeignKey("user.id"),primary_key=True)
#     setting_id = db.Column(db.Integer() ,db.ForeignKey("setting.id"),primary_key=True)
#     setting_value = db.Column(db.Integer())
    
#     user = db.relationship("User",foreign_keys=[user_id])
#     setting = db.relationship('Setting',foreign_keys=[setting_id])

#     def __repr__(self) -> str:
#         return f'<Property {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, key=None,data_type=None,value=None):
#         super.update()
#         if key: self.key = key
#         if data_type: self.data_type = data_type
#         if value: self.value = value
#         db.session.commit()



# """
# class Setting
#     id: int primary
#     name: string(100)
#     description: string(300)
#     created: datetime
#     last_updated: timestamp
#     created_by: int(4)
#     modified_by: int(4)
#     deleted boolean
#     disabled: boolean
#     record_version: int(4)
    
# """
# class Setting(db.Model):
#     id = db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(100))
#     description = db.Column(db.String(300))
#     created = db.Column(db.DateTime(), default=db.func.now())
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False)
#     disabled = db.Column(db.Boolean(), default=False)
#     record_version=db.Column(db.Integer())
    
#     user = db.relationship('UserSettings' ,back_populates="setting")
#     #     entry = db.relationship("Entry", foreign_keys=[entry_id])
# #     entry_user =  db.relationship("Entry", foreign_keys=[entry_user_id])

# #     entities= db.relationship("Entity", secondary=many_to_many_table,
# #                               backref=db.backref("workspaces"))
    
    
#     def __repr__(self) -> str:
#         return f'<Setting {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, value=None):
#         if value: self.value = value
#         db.session.commit()

#     def _insert(self):
#         pass

# """
# class User:
#     id:int primary key
#     username:string(25)
#     password:string(25)
#     firstname:string(25)
#     lastname:string(25)
#     date_of_birth:datetime(25)
#     email:string(80)
# """
# class User(db.Model):
#     id=db.Column(db.Integer(), primary_key=True,nullable=True)
#     username=db.Column(db.String(25),unique=True,nullable=False, primary_key=True)
#     password=db.Column(db.Text(),nullable=False)
#     firstname=db.Column(db.String(25),nullable=False)
#     lastname=db.Column(db.String(25),nullable=False)
#     date_of_birth=db.Column(db.DateTime(), nullable=False)
#     email=db.Column(db.String(80),unique=True,nullable=False)
    
#     last_login = db.Column(db.DateTime(),default=db.func.now())
#     created = db.Column(db.DateTime(), default=db.func.now())
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
#     deleted = db.Column(db.Boolean(), default=False)
#     disabled = db.Column(db.Boolean(), default=False)
    
#     objects = db.relationship('Object',backref=db.backref('user'))
#     #settings = db.relationship('Setting',secondary=user_settings, backref=db.backref('user'),lazy=True)
#     settings = db.relationship("UserSettings",back_populates="user")
    
#     def __repr__(self) -> str:
#         return f'<User {self.username} >'
    
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, username=None, password=None, firstname=None, lastname=None, date_of_birth=None,email=None, last_login=None):
#         if username: self.username = username
#         if password: self.password = password
#         if firstname: self.firstname = firstname
#         if lastname: self.lastname = lastname
#         if date_of_birth: self.date_of_birth = date_of_birth
#         if email: self.email = email
#         if last_login: self.last_login = last_login
#         db.session.commit()
        

    

# """
# Table User Settings:
#     user_id: int
#     setting_id: int
#     setting_value: string(1000)
#     created: datetime
#     last_updated: timestamp
#     created_by: int(4)
#     modified_by: int(4)
#     deleted: boolean
#     disabled: boolean
#     record_version: int(4)
    
# """
# class ObjectProperties(db.Model):
#     object_id = db.Column(db.Integer(), db.ForeignKey("object.id"),primary_key=True)
#     object_user_id = db.Column(db.Integer() ,db.ForeignKey("object.user_id"), primary_key=True)
    
#     property_id = db.Column(db.Integer(), db.ForeignKey("property.id"),primary_key=True)
#     property_value = db.Column(db.String(1000),nullable=False)
    
#     created = db.Column(db.DateTime(), default=db.func.now(), nullable=False)
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now() , nullable=False)
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False, nullable=False)
#     disabled = db.Column(db.Boolean(), default=False, nullable=False)
#     record_version = db.Column(db.Integer())
    
#     property = db.relationship("Property", foreign_keys=[property_id])
#     object = db.relationship('Object', foreign_keys=[object_id])
#     object_user = db.relationship('Object', foreign_keys=[object_user_id])


#     def __repr__(self) -> str:
#         return f'<Property {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, key=None,data_type=None,value=None):
#         if key: self.key = key
#         if data_type: self.data_type = data_type
#         if value: self.value = value
#         db.session.commit()


# """
# class Object
#     id: int primary
#     user_id: int primary key
#     name: string(45)
#     entry_type: string(12)
#     description: string(180)
#     create_time: datetime
#     update_time: datetime
# """
# class Object(db.Model):
#     id=db.Column(db.Integer(), primary_key=True)
#     user_id = db.Column(db.Integer(), db.ForeignKey("user.id"),nullable=False)
    
#     name=db.Column(db.String(45),nullable=False)
#     description=db.Column(db.String(180),nullable=False)
#     state = db.Column(db.String())
    
#     created = db.Column(db.DateTime(), default=db.func.now())
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False)
#     disabled = db.Column(db.Boolean(), default=False)
#     record_version=db.Column(db.Integer())
    
#     # properties = db.relationship('EntryProperties')
#     # user = db.relationship('User', foreign_keys=[user_id])
    
#     # action = db.relationship('Action', backref=db.backref('entry'),lazy=True)
#     # categories = db.relationship('Category', backref=db.backref('entry'),lazy=True)

#     def __repr__(self) -> str:
#         return f'<Object {self.name}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, name=None, type=None, description=None):
#         if name: self.name = name
#         if type: self.type = type
#         if description: self.description = description
#         db.session.commit()







# """
# Table User Settings:
#     user_id: int
#     setting_id: int
#     setting_value: string(1000)
#     created: datetime
#     last_updated: timestamp
#     created_by: int(4)
#     modified_by: int(4)
#     deleted: boolean
#     disabled: boolean
#     record_version: int(4)
    
# """
# class ObjectTags(db.Model):
#     group_id = db.Column(db.Integer(), primary_key=True)
#     group_name = db.Column(db.String(),nullable=False)
#     object_id = db.Column(db.Integer(), db.ForeignKey("object.id"),primary_key=True)
#     object_user_id = db.Column(db.Integer() ,db.ForeignKey("object.user_id"), primary_key=True)
#     tag_id = db.Column(db.Integer(), db.ForeignKey("tag.id"),primary_key=True)

#     created = db.Column(db.DateTime(), default=db.func.now(), nullable=False)
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now() , nullable=False)
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False, nullable=False)
#     disabled = db.Column(db.Boolean(), default=False, nullable=False)
#     record_version = db.Column(db.Integer())
    
#     tag = db.relationship("Tag", foreign_keys=[tag_id])
#     object = db.relationship('Object', foreign_keys=[object_id])
#     object_user = db.relationship('Object', foreign_keys=[object_user_id])


#     def __repr__(self) -> str:
#         return f'<Property {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, key=None,data_type=None,value=None):
#         if key: self.key = key
#         if data_type: self.data_type = data_type
#         if value: self.value = value
#         db.session.commit()





# """
# class Property
#     id: int primary key
#     entry_id: int primary key
#     entry_user_id: int primary key
#     key: string(45)
#     data_type: string(2)
#     value: string(45)

# """
# class Property(db.Model):
    
#     id=db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(),nullable=False)
#     data_type=db.Column(db.String(2),nullable=False)
#     attribute = db.Column(db.String(30),nullable=False)
    
#     created = db.Column(db.DateTime(), default=db.func.now())
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False)
#     disabled = db.Column(db.Boolean(), default=False)
#     record_version=db.Column(db.Integer())
    
#     # entries = db.relationship('EntryProperties')

#     def __repr__(self) -> str:
#         return f'<Property {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, key=None,data_type=None,value=None):
#         if key: self.key = key
#         if data_type: self.data_type = data_type
#         if value: self.value = value
#         db.session.commit()




# """
# class Property
#     id: int primary key
#     entry_id: int primary key
#     entry_user_id: int primary key
#     key: string(45)
#     data_type: string(2)
#     value: string(45)

# """
# class Attribute(db.Model):
    
#     id=db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(),nullable=False)
#     data_type=db.Column(db.String(2),nullable=False)
#     validation_rules = db.Column(db.String(10),nullable=False)
#     measure_units = db.Column(db.String(10),nullable=False)
    
#     created = db.Column(db.DateTime(), default=db.func.now())
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False)
#     disabled = db.Column(db.Boolean(), default=False)
#     record_version=db.Column(db.Integer())
    
#     # entries = db.relationship('EntryProperties')

#     def __repr__(self) -> str:
#         return f'<Property {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, key=None,data_type=None,value=None):
#         if key: self.key = key
#         if data_type: self.data_type = data_type
#         if value: self.value = value
#         db.session.commit()



# """
# class Tag
#     id: int primary key
#     entry_id: int primary key
#     entry_user_id: int primary key
#     key: string(45)
#     data_type: string(2)
#     value: string(45)

# """
# class Tag(db.Model):
    
#     id=db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(),nullable=False)
#     value=db.Column(db.String(2),nullable=False)
#     created = db.Column(db.DateTime(), default=db.func.now())
#     last_updated = db.Column(db.TIMESTAMP, default=db.func.now(), onupdate=db.func.now())
#     created_by = db.Column(db.Integer())
#     modified_by = db.Column(db.Integer())
#     deleted = db.Column(db.Boolean(), default=False)
#     disabled = db.Column(db.Boolean(), default=False)
#     record_version=db.Column(db.Integer())
    
#     # entries = db.relationship('EntryProperties')

#     def __repr__(self) -> str:
#         return f'<Property {self.key}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, name=None,value=None):
#         if name: self.data_type = name
#         if value: self.value = value
#         db.session.commit()




# # """
# # class Archive
# #     user_id: int primary key
# # """
# # class Archive(db.Model):
# #     user_id = db.Column(db.Integer(), db.ForeignKey("user.id"),primary_key=True,nullable=False)
    
# #     def __repr__(self) -> str:
# #         return f'<Archive {self.user_id}>'
        
# #     def save(self):
# #         db.session.add(self)
# #         db.session.commit()
    
# #     def delete(self):
# #         db.session.delete(self)
# #         db.session.commit()
    
# #     def update(self, name=None):
# #         if name: self.name = name
# #         db.session.commit()




# # """
# # class TimeStamps
# #     create_time: Timestamp
# #     update_time: Timestamp
# #     entry_id:int primary key
# #     entry_user_id: int primary key
# # """
# # class TimeStamps(db.Model):
# #     create_time=db.Column(db.DateTime(),nullable=False)
# #     update_time=db.Column(db.DateTime(),nullable=False)
    
# #     entry_id = db.Column(db.Integer(), db.ForeignKey("entry.id"),primary_key=True,nullable=False)
# #     entry_user_id = db.Column(db.Integer(), db.ForeignKey("entry.user_id"),primary_key=True, nullable=False)
    
# #     def __repr__(self) -> str:
# #         return f'<TimeStamps >'
        
# #     def save(self):
# #         db.session.add(self)
# #         db.session.commit()
    
# #     def delete(self):
# #         db.session.delete(self)
# #         db.session.commit()
    
# #     def update(self, update_time=None):
# #         if update_time: self.update_time = update_time
# #         db.session.commit()
# # """
# # class Action
# #     id: int primary key
# #     entry_id: int primary key
# #     entry_user_id: int primary key
# #     parent_id: int
# #     action_type: string(12)
# #     action_state: string(12)
# #     value: string
# # """
# # class Action(db.Model):
# #     id=db.Column(db.Integer(), primary_key=True)
# #     entry_id = db.Column(db.Integer(), db.ForeignKey("entry.id"),nullable=False)
# #     entry_user_id = db.Column(db.Integer(), db.ForeignKey("entry.user_id"), nullable=False)  
# #     parent_id=db.Column(db.Integer())
# #     action_type=db.Column(db.String(12),nullable=False)
# #     action_state=db.Column(db.String(12),nullable=False)
# #     value = db.Column(db.String(45))
# #     entry = db.relationship("Entry", foreign_keys=[entry_id])
# #     entry_user =  db.relationship("Entry", foreign_keys=[entry_user_id])
    
# #     def __repr__(self) -> str:
# #         return f'<Action {self.name}>'
        
# #     def save(self):
# #         db.session.add(self)
# #         db.session.commit()
    
# #     def delete(self):
# #         db.session.delete(self)
# #         db.session.commit()
    
# #     def update(self, parent_id=None, action_type=None, action_state=None, value=None):
# #         if parent_id: self.parent_id = parent_id
# #         if action_type: self.action_type = action_type
# #         if action_state: self.action_state = action_state
# #         if value: self.value = value
# #         db.session.commit()





# # """
# # class WorkSpace:
# #     id:int primary_key
# #     user_id:int foreign key
# #     name:str (text)
# #     entities:list[Entity]
# # """
# # class Workspace(db.Model):
# #     id=db.Column(db.Integer(), primary_key=True)
# #     user_id = db.Column(db.Integer(), db.ForeignKey("user.id"))
# #     name= db.Column(db.String(),nullable=False)
# #     entities= db.relationship("Entity", secondary=workspace_entities,
# #                               backref=db.backref("workspaces"))
# #     def __repr__(self) -> str:
# #         return f'<Workspace {self.name}>'
        
# #     def save(self):
# #         db.session.add(self)
# #         db.session.commit()
    
# #     def delete(self):
# #         db.session.delete(self)
# #         db.session.commit()
    
# #     def update(self, name=None):
# #         if name: self.name = name
# #         db.session.commit()



# # """
# # class Entity:
# #     id:int primary_key
# #     user_id:int foreign key
# #     name:str (text)
# #     description:str 
# #     creation_datetime: datetime
# # """
# # class Entity(db.Model):
# #     id=db.Column(db.Integer(), primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
# #     name = db.Column(db.String(),nullable=False)
# #     description = db.Column(db.String(),nullable=False)
# #     creation_datetime=db.Column(db.DateTime(),nullable=False)
    
# #     def __repr__(self) -> str:
# #         return f'<Entity name{self.name} desc{self.description}>'
        
# #     def save(self):
# #         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, name=None,description=None):
#         if name: self.name = name
#         if description: self.description = description
#         db.session.commit()    


# """
# class Category
#     id: int primary key
#     entry_id: int primary key
#     entry_user_id: int primary key
#     parent_id: int
#     name: string(45)
#     path: string(45)

# """
# class Category(db.Model):
#     id=db.Column(db.Integer(), primary_key=True)
#     entry_id = db.Column(db.Integer(), db.ForeignKey("entry.id"),nullable=False)
#     entry_user_id = db.Column(db.Integer(), db.ForeignKey("entry.user_id"), nullable=False)
#     parent_id=db.Column(db.Integer())
#     name=db.Column(db.String(45),nullable=False)
#     path=db.Column(db.String(45),unique=True,nullable=False)
    
#     entry = db.relationship("Entry", foreign_keys=[entry_id])
#     entry_user =  db.relationship("Entry", foreign_keys=[entry_user_id])
    
#     def __repr__(self) -> str:
#         return f'<Category {self.name}>'
        
#     def save(self):
#         db.session.add(self)
#         db.session.commit()
    
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()
    
#     def update(self, parent_id=None,name=None,path=None):
#         if parent_id: self.parent_id = parent_id
#         if name: self.name = name
#         if path: self.path = path
#         db.session.commit()



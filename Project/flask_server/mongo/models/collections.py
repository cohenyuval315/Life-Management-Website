from bson import SON
import jsonschema

class SchemaMeta(type):
    def __new__(cls, name, bases,namespaces,**kw):
        result = type.__new__(cls,name,bases,dict(namespaces))
        jsonschema.Draft4Validator.check_schema(result.SCHEMA)
        result.__doc__ = result.SCHEMA['description']
        result.COLLECTION = result.SCHEMA.get('x-collection')
        result.VERSION = result.SCHEMA.get('x-version')
        result._validator = jsonschema.Draft4Validator(result.SCHEMA)
        return result


class Model(SON,metaclass=SchemaMeta):
    SCHEMA ={
        'title':'Model',
        'description':"""
            Abstract superclass for bson.SON objects defined by a schema
        """,
        'x-version':'1',
        'x-collection':'model_1'
    }
    def __init__(self,*args,**kw):
        super.__init__(*args,**kw)
        self._validator.validate(self)
    def __repr__(self):
        return "{class_}({kw!r})".format(
            class_ = type(self).__name__,
            kw = self.to_dict())
        
      
      
      
metadata={
    
}
      
      
collections = {
    
    "Users":{
        ""
    },
    
    "Tasks":{

        "model":{
            
            "must":{
                
            },
            "optional":{
                
            },
            
            
            "_id":"ObjectId",
            "userId":"string",
            "parentId":"string", # so its can live in categories
            
            "title":"string",
            "description":"string", 
            "note":"string", # markdown 
            "rank":"number",
            "masterRank":"number",
            
            "dueDate":"date",
            
            "completedAt":"date",
            "isCompleted":"boolean",
            
            "durationWorked":"number",
            "times":"list[number]", # times tracking Array of Date.now() when time tracking started (odd indexes) and stopped (even indexes).  Updated when time tracking stops and when the task is marked done (or when manually edited by user).
            
            "priority":"number",
            "mentalDiff":"number",
            "physicalDiff":"number",
            "emotionalDiff":"number",
            
            "isDreadful":"boolean",
            "isPinned":"boolean",
            "scheduleDate":"boolean",
            
            "startDate":"date",
            "endDate":"date",


            
            
            "isRecuringChild":"boolean", # default false
            "recurringParentTaskId":"number", # default null
            
            
            "subTasksIds":"list[string]",
            
            "subTasks":{
                    "type":["object","boolean"],
                    "model":{
                        "_id":"ObjectId",
                        "title":"string",
                        "isCompleted":"boolean",
                        "rank":"number",
                        "timeEstimate":"number",
                        "prerequisiteSubTasksIds":"list[strings]",
                    },
                },
            
            "group":"string", # backburnger ,etc..
            "tagsIds":"list[strings]",
            "deletedAt":"date",
            "createdAt":"date",
            "updatedAt":"date",
            "workedOnAt":"date",

            "comments":{
                "_id":"ObjectId",
                "reviewDate":"date",
                "description":"string",
            },
            
            "timeEstimate":"number",
            
            
            "calendarId":"string",

            
             # objective
            "objectiveId":"string", # inherited also from parents
            "objectivePhaseId":"string",        
            "objectiveRank":"number",

    
            "timeBlockSectionId":"string",
            "prerequisiteTasksIds":"list[strings]",
            
            "reminders":{
                "model":{
                    "taskTime":"string",
                    "reminderTime":"string",
                    "snoozeDuraton":"number",
                    "maxSnoozeCount":"number",
                    "autoSnooze":"boolean"
                }
            },
            
            "reward":{
                "rewardId":"string",
                "rewardPoints":"number",
                "XP":"number",
                
            },
            
            "view:":{
            # later   
            },
            
    }
    },
    
    "MarkdownNotes":{
        "_id":"ObjectId",
        "isLocal":"boolean",
        "filepath":"string",
        "userId":"string",
        "isPinned":"boolean",
        "title":"string",
        "note": "string",
        "tagsIds":"list[string]",
        "parentId":"string", 
        "status":["contruction","warning","ready","refactor"],
    },

    "Tags":{
          "tag":{
            "_id":"ObjectId",
            "userId":"string",
            "title":"string",
            "groupId":"string", # label group
            "createdAt":"string",
            "icon":"string",
            "isAction":"boolean", # If true, then this is an action label. Removing the label creates a task.
            "isHidden":"boolean",
            "view":"later"
          },
          "tagGroup":{
            "_id":"ObjectId",
            "userId":"string",
            "title":"string",
            "rank":"number",
            "createdAt":"date",
            "isExclusive":"boolean", # If true, then a task/project can only have one label from this group at a time
            "view":"later" # (color , background,...)
          }        
        
    },
    
    "Categories":{
        "documents":{
            "view":{
              #later
            },
            "Category":{
                "_id":"ObjectId",
                "userId":"string",
                "title":"string",
                "note":"string",  
                "updatedAt":"date",
                "createdAt":"date",
                "parentId":"string", # or "unassigned" / 
                "rank":"number", # within parent
                "dayRank":"number", # within DayPage
                "icon":"string",
                "view":{
                    "color":"string"
                }
                
            },
            "Project":{
                "_id":"ObjectId",
                "userId":"string",
                "title":"string",
                "snippetId":"string", # or null 
                "note":"string",
                "updatedAt":"date",
                "createdAt":"date",
                "workedOnAt":"date",
                "scheduleDate":"date", # only projects
                "priority":"number",
                "tagIds":"list[string]",
                "dueDate":"date", # project
                "timeEstimate":"number",                
                "parentId":"string", # or "unass"
                "isCompleted":"boolean",
                "icon":"string",
                "startDate":"date",
                "endDate":"date",
                "prerequisiteIds":"list[strings]",
                "taskId":"string", # with subtasks inside probably
                "comments":"list[strings]",
                
            }
        }, 
    },
    
    "EventsItems":{
        "documents":{
                "Event":{
                    "_id":"ObjectId",
                    "userId":"string",
                    "title":"string",
                    "description": "string",
                    "isAllDay":"boolean",
                    "parentId":"string", # so its can live in categories
                    "startDate":"date",
                    "endDate":"date",
                    "isVisible":"boolean",
                    "isCompleted":"boolean",
                    "view":{
                        "color":"string",
                        "backgroundColor":"string",
                        "borderColor":"string",
                        "dragBackgroundColor":"string",
                    },
                    "isReadOnly":"boolean",
                    "calendarId":"string",
                    "note":"string",
                    "goingDuration":"number",
                    "comingDuration":"number",
                    "isPinned":"boolean",
                    "recurranceId":"string",
                    "recurringParentEventId":"string",
                    "recurranceRule":"string",
                    "category":["time","milestone","task","allday"], # for toast ui calendar
                    "exceptions":"list[date]",
                    
                },
                "TimeBlock":{
                  "_id"  :"ObjectId",
                  "userId":"string",
                  "title":"string",
                  "date":"date",
                  "time":"date",
                  "duration":"number", # in minutes
                  "isSection":"boolean", # false == not in day view
                  "calendarId":"string",
                  "recurrance":"string",
                  "note":"string",
                  "exeptions":"string",
                },
                
                "Calendar":{
                    "_id":"ObjectId",
                    "userId":"string",
                    "title":"string",
                    "isPrivate":"boolean",
                    "password":"string",
                    "isVisible":"boolean",
                    "tagsIds":"list[string]",
                    "view":{
                        "color":"string",
                        "backgroundColor":"string",
                        "borderColor":"string",
                        "dragBackgroundColor":"string",
                    },
                    "rank":"number",
                    "itemType":["task","event","timeBlock"],
                    
                }
            }
        },
    
    "Objectives":{
        "_id":"ObjectId",
        "userId":"string",
        "title":"string",
        "note":"string",
        "isVisibleDayView":"boolean",
        "parentId":"string",
        "priority":"number",
        "tagsIds":"list[string]",
        "importance":"number",
        "mentalDiff":"number",
        "physicalDiff":"number",
        "emotionalDiff":"number",
        "montivations":"list[string]",
        "challenges":{
            "type":"list[object]",
            "model":{
                "_id":"ObjectId",
                "challenge":"string",
                "action":"string",
            }
        },
        "proress":"boolean", # calculate 
        "isCommited":"boolean",
        "expectedTasks":"number",
        "expectedDuration":"number",
        "expectedRoutines":"number",
        "checkIn":"boolean",
        "checkIns":"list[number]",
        "lastCheckInDate":"date",
        "checkInWeeks":"number",
        "checkInStartDate":"date",
        "checkInQuestions":"list[string]",
        "group":"string",
        "status":[""],
        "dueDate":"",
        "hasEnd":"",
        "sections":{
                "type":"list[object]",
                "model":{
                    "_id":"ObjectId",
                    "title":"string",
                    "note":"string",
                }
            },
        },
    
    "Routines":{
        "_id":"ObjectId",
        "userId":"string",
        "title":"string",
        "description": "string",
        "note":"string",
        "parentId":"string",
        "tagsIds":"list[string]",
        "tasksIds":"list[string]",

        "calendarId":"",

        "isPinned":"boolean",
        "isCompleted":"boolean",
        
        "startDate":"date",
        "endDate":"date",
        "startTime":"date",
        "endTime":"date",
        
        "period":["day","week","month","quarter","year"],
        "target":"number", # for period
        "isPositive":"boolean",
        
        "timeEstimate":"number",
        "priority":"number",
        "mentalDifficulty ":"number",
        "physicalDifficulty ":"number",
        "emotionalDifficulty ":"number",        


        "recordType":["boolean","number"],
        "askOn":"list[number]", # days array
        "timeToAppear":"date",
        "showAfterSuccess":"boolean",
        "showAfterRecord":"boolean",
        "history":"list[(time1,val1,)]",
        "lastSlackDate":"string",
        "measureUnits": ["kms","liters","calories"],
        "showInCalendar":"boolean",
        "showInCalendarTime":"string",
        "view":{
            "color":"string",    
        }
        
        
    },
    
    
    
    
    "SmartLists":{
        "filters":{
            "type":"object",
            "model":{
                "_id":"ObjectId",
                "title":"string",
                "itemType":["task","event","..."],
                "userId":"string",
                "booleanExpression":"string",
                "rank":"number",
            }
        }
    },
    
    "SavedItems":{
      "document":{
          "SavedItem":{
              "_id":"ObjectId",
              "userId":"string",
              "itemType":["task","taskGroup","project"],
              "title": "string",
              "rank":"number",
              "tasks":"list[object]",
              "defaultParentId":"string",
            },
          
          "tag":{
            "_id":"ObjectId",
            "userId":"string",
            "title":"string",
            "groupId":"string", # label group
            "createdAt":"string",
            "icon":"string",
            "isAction":"boolean", # If true, then this is an action label. Removing the label creates a task.
            "isHidden":"boolean",
            "view":"later"
          },
          "tagGroup":{
            "_id":"ObjectId",
            "userId":"string",
            "title":"string",
            "rank":"number",
            "createdAt":"date",
            "isExclusive":"boolean", # If true, then a task/project can only have one label from this group at a time
            "view":"later" # (color , background,...)
          }
      }
    },
    
    "ProfileItems":{
        "userId":"ObjectId",
        "username":"string",
        "password": "string",
        "firstname":"string",
        "lastname":"string",
        "dateOfBirth":"date",
        "email":"string",
        "xp":"number",
        "reminders":{ # all reminders
            "model":{
                
            }
        }
    },
    
    "DayItems":{
        
    },
    
    "tracker":{
        "title":"name",
        "type":"number", # or = "rating"  || "number"
        "startValue":"number",
        "targetValue":"number",
        "isCumulative":"boolean",
        "measureUnits":"string",
        "minRating":"number",
        "maxRating":"number",
        "icon":"string",
        "dueDate":"date",
        "history":"list[(time,val)]",
        "startTime":"date",  # prompted
        "endTime":"date",
        "showAs":["graph","progressbar"], # proess && type =number
        "askType":"string",# "n per week", "monthly",...
    }
}
non_mongo_collections={
    "neo4j":"graphs"
}
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        
# class User(Model):
#     SCHEMA = SON(
#         title='',
#         description='',
#         type='object',
#         properties=SON(
            
#         )
#     )
#     pass

# class Event(Model):
#     SCHEMA = SON(
#         title='',
#         description='',
#         type='object',
#         properties=SON(
            
#         )
#     )
#     pass

# class Calendar(Model):
#     SCHEMA = SON(
#         title='',
#         description='',
#         type='object',
#         properties=SON(
            
#         )
#     )
#     pass

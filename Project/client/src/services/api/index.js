import {getCategories,updateCategories} from './categories'
import {getObjects,updateObject,createObject,deleteObject} from './objects'
import {getEvents, updateEvents} from './events'


import { getMetaData } from './metadata'

import { getUserCategories,createUserCategory,deleteUserCategory,updateUserCategory,getUserCategoriesByFeature,getUserCategoriesByFeatureGroup ,getUserCategoriesGroupsByFeature} from './categories'
import {getUserGroups,deleteUserGroup,updateUserGroup,createUserGroup} from './groups'
import { getUserTags,createUserTag,deleteUserTag } from './tags'
import { getUserRoutines,createUserRoutine,deleteUserRoutine,updateUserRoutine } from './routines'
import { getUserGraphs,createUserGraph,deleteUserGraph,updateUserGraph } from './graphs'
import { getUserEvents,createUserEvent,deleteUserEvent,updateUserEvent} from './events'
import { getUserNotifications,deleteUserNotification,createUserNotification } from './notifications'
import { getUserObjects,createUserObject,deleteUserObject,updateUserObject ,getUserObjectsByFeature, getUserObjectsBy,getUserObjectsByTag} from './objects'
import { getUserReminders,deleteUserReminder,updateUserReminder,createUserReminder } from './reminders'
import {saveCurrentUserData,deleteUserBackup,getUserBackupByDatetime,getUserBackups,getUserData,loadUserBackup,DATETIME_BACKUP_FORMAT} from './backups'
import { createUserCalendar,deleteUserCalendar,getUserCalendars,updateUserCalendar} from './calendars'
import {createUserProperty,deleteUserProperty,getUserProperties,updateUserProperty} from './properties'


export const StorageName = 'REACT_TOKEN_AUTH_KEY'


export function refreshToken(){
    return apiRequest(true,'/auth/refresh','POST',false,false);
    // const token = localStorage.getItem(StorageName)
    // const refresh = JSON.parse(token).refresh_token
    // const requestOptions = {
    //         method: 'POST',
    //         headers:{
    //                 'content-type':'application/json',
    //                 'Authorization': `Bearer  ${refresh}`
    //         },
    //     }
    // fetch('/auth/refresh',requestOptions).then(response => response.json()).then(data=>{console.log(data)})}
}

export function apiRequest(isAuthRequired,url,method,isBody,body){
    const token = localStorage.getItem(StorageName)
    const requestOptions = {
            method: method,
            headers:{
                    'Content-Type':'application/json',
                    // 'Authorization':`Bearer ${JSON.parse(token).access_token}`,
            },
        }
        if(isAuthRequired){
            requestOptions.headers.Authorization = `Bearer ${JSON.parse(token).access_token}`
        }
        if (isBody){
            requestOptions.body = JSON.stringify(body)
        }

    return fetch(url,requestOptions)
        
}

export function saveUserData(){
    return apiRequest(true,"/auth/save", "GET", false,false).then((r=>r.json()))
}

export {
getCategories,
updateCategories,
getObjects,
updateObject,
createObject,
deleteObject,
getMetaData,
getEvents,
updateEvents,
}


export {
getUserCategories,
createUserCategory,
deleteUserCategory,
updateUserCategory,
getUserTags,
createUserTag,
deleteUserTag,
getUserRoutines,
createUserRoutine,
deleteUserRoutine,
updateUserRoutine,
getUserGraphs,
createUserGraph,
deleteUserGraph,
updateUserGraph,
getUserEvents,
createUserEvent,
deleteUserEvent,
updateUserEvent,
getUserReminders,
deleteUserReminder,
updateUserReminder,
createUserReminder,
getUserNotifications,
deleteUserNotification,
createUserNotification,
getUserObjects,
createUserObject,
deleteUserObject,
updateUserObject,
getUserCategoriesByFeature,
getUserObjectsByFeature,
getUserCategoriesByFeatureGroup,
getUserObjectsBy,
getUserObjectsByTag,
getUserCategoriesGroupsByFeature,
saveCurrentUserData,
deleteUserBackup,
getUserBackupByDatetime,
getUserBackups,
getUserData,
loadUserBackup,
createUserCalendar,
deleteUserCalendar,
getUserCalendars,
updateUserCalendar,
createUserProperty,
deleteUserProperty,
getUserProperties,
updateUserProperty,
getUserGroups,
deleteUserGroup,
updateUserGroup,
createUserGroup,
DATETIME_BACKUP_FORMAT
}
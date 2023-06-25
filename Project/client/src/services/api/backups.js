import { apiRequest } from "./index"

export const DATETIME_BACKUP_FORMAT = "%m.%d.%Y %H:%M:%S"


export function getUserData(){ 
    return apiRequest(true,'/api/v1/auth/save','GET',false,false).then(data=>data.json())  
}

export function getUserBackups(){
    return apiRequest(true,'/api/v1/auth/saves','GET',false,false).then(data=>data.json())   
}

export function saveCurrentUserData(){
    return apiRequest(true,`/api/v1/auth/save`,'POST',false,false).then(data=>data.json()) 
}

export function deleteUserBackup(datetime){
    return apiRequest(true,`/api/v1/auth/load/${datetime}`,'DELETE',false,false).then(data=>data.json())    
}

export function getUserBackupByDatetime(datetime){
    return apiRequest(true,`/api/v1/auth/load/${datetime}`,'PUT',false,false).then(data=>data.json()) 
}

export function loadUserBackup(datetime){
    return apiRequest(true,`/api/v1/auth/load/${datetime}`,'PUT',false,false).then(data=>data.json()) 
}
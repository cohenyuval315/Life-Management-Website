import { apiRequest } from "./index"

export function getUserGroups(){ 
    return apiRequest(true,'/api/v1/group/groups','GET',false,false).then(data=>data.json()) 
}

export function createUserGroup(group){
    return apiRequest(true,'/api/v1/group/groups','POST',true,{"group":group}).then(data=>data.json())    
}

export function deleteUserGroup(group){
    return apiRequest(true,`/api/v1/group/group/${group.id}`,'DELETE',false,false).then(data=>data.json())   
}

export function updateUserGroup(group){
    return apiRequest(true,`/api/v1/group/group/${group.id}`,'PUT',true,{"group":group}).then(data=>data.json()) 
}

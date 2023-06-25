import { apiRequest } from "./index"

export function getUserProperties(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/property/properties','GET',false,false).then(data=>data.json())  
}

export function createUserProperty(property){
    return apiRequest(true,'/api/v1/property/properties','POST',true,{"property":property}).then(data=>data.json())   
}

export function deleteUserProperty(property){
    return apiRequest(true,`/api/v1/property/property/${property.id}`,'DELETE',false,false).then(data=>data.json())    
}

export function updateUserProperty(property){
    return apiRequest(true,`/api/v1/property/property/${property.id}`,'PUT',true,{"property":property}).then(data=>data.json()) 
}
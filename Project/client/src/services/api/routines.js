import { apiRequest } from "./index"


export function getUserRoutines(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/routine/routines','GET',false,false).then(data=>data.json())  
}

export function createUserRoutine(routine){
    return apiRequest(true,'/api/v1/routine/routines','POST',true,{"routine":routine}).then(data=>data.json())   
}

export function deleteUserRoutine(routine){
    return apiRequest(true,`/api/v1/routine/routine/${routine.id}`,'DELETE',false,false).then(data=>data.json())    
}

export function updateUserRoutine(routine){
    return apiRequest(true,`/api/v1/routine/routine/${routine.id}`,'PUT',true,{"routine":routine}).then(data=>data.json()) 
}
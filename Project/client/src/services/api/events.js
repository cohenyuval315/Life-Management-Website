import { apiRequest } from "./index"


export function getEvents(){ // changable to async need to test in schedule first
    return apiRequest(true,'/event/events','GET',false,false).then(data=>data.json()).then(data=>data.events)    

}

export function updateEvents(data){
    return apiRequest(true,'/event/events','PUT',true,{"events":data}).then(r=>r.json());//.then(data=>console.log(data)).catch(err=>console.log(err));

}



export function getUserEvents(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/event/events','GET',false,false).then(data=>data.json())
}

export function createUserEvent(event){
    return apiRequest(true,'/api/v1/event/events','POST',true,{"event":event}).then(data=>data.json())
}

export function deleteUserEvent(event){
    return apiRequest(true,`/api/v1/event/event/${event.id}`,'DELETE',false,false).then(data=>data.json())
}

export function updateUserEvent(event){
    return apiRequest(true,`/api/v1/event/event/${event.id}`,'PUT',true,{"event":event}).then(data=>data.json()) 
}

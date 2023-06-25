import { apiRequest } from "./index"


export function getUserCalendars(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/calendar/calendars','GET',false,false).then(data=>data.json())
}

export function createUserCalendar(calendar){
    return apiRequest(true,'/api/v1/calendar/calendars','POST',true,{"calendar":calendar}).then(data=>data.json())
}

export function deleteUserCalendar(calendar){
    return apiRequest(true,`/api/v1/calendar/calendar/${calendar.id}`,'DELETE',false,false).then(data=>data.json())
}

export function updateUserCalendar(calendar){
    return apiRequest(true,`/api/v1/calendar/calendar/${calendar.id}`,'PUT',true,{"calendar":calendar}).then(data=>data.json()) 
}
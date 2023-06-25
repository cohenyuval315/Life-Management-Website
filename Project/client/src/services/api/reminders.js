
import { apiRequest } from "./index"

export function getUserReminders(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/reminder/reminders','GET',false,false).then(data=>data.json())  
}

export function createUserReminder(reminder){
    return apiRequest(true,'/api/v1/reminder/reminders','POST',true,{"reminder":reminder}).then(data=>data.json())   
}

export function deleteUserReminder(reminder){
    return apiRequest(true,`/api/v1/reminder/reminder/${reminder.id}`,'DELETE',false,false).then(data=>data.json())    
}

export function updateUserReminder(reminder){
    return apiRequest(true,`/api/v1/reminder/reminder/${reminder.id}`,'PUT',true,{"reminder":reminder}).then(data=>data.json()) 
}
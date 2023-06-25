import { apiRequest } from "./index"

export function getUserNotifications(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/notification/notifications','GET',false,false).then(data=>data.json())  
}

export function createUserNotification(notification){
    return apiRequest(true,'/api/v1/notification/notifications','POST',true,{"notification":notification}).then(data=>data.json())   
}

export function deleteUserNotification(notification){
    return apiRequest(true,`/api/v1/notification/notifications/${notification.id}`,'DELETE',false,false).then(data=>data.json())    
}


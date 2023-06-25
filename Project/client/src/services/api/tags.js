import { apiRequest } from "./index"


export function getUserTags(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/tag/tags','GET',false,false).then(data=>data.json())  
}

export function createUserTag(tag){
    return apiRequest(true,'/api/v1/tag/tags','POST',true,{"tag":tag}).then(data=>data.json())   
}

export function deleteUserTag(tag){
    return apiRequest(true,`/api/v1/tag/tag/${tag.id}`,'DELETE',false,false).then(data=>data.json())    
}




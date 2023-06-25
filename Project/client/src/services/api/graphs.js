
import { apiRequest } from "./index"


export function getUserGraphs(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/graph/graphs','GET',false,false).then(data=>data.json())  
}

export function createUserGraph(graph){
    return apiRequest(true,'/api/v1/graph/graphs','POST',true,{"graph":graph}).then(data=>data.json())   
}

export function deleteUserGraph(graph){
    return apiRequest(true,`/api/v1/graph/graphs/${graph.id}`,'DELETE',false,false).then(data=>data.json())    
}

export function updateUserGraph(graph){
    return apiRequest(true,`/api/v1/graph/graph/${graph.id}`,'PUT',true,{"graph":graph}).then(data=>data.json()) 
}
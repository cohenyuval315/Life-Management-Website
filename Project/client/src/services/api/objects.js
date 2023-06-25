import { apiRequest } from "./index"


export function getObjects(){
    return apiRequest(true,'object/objects','GET',false,false).then(data=>data.json())
}
export function createObject(obj){
    return apiRequest(true,'object/objects','POST',true,{"object":obj})
}
export function updateObject(new_obj){
    return apiRequest(true,'object/object','PUT',true,{"object":new_obj})
}
export function deleteObject(object_id){
    return apiRequest(true,'object/object','DELETE',true,{"objectId":object_id})
}




export function getUserObjects(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/object/objects','GET',false,false).then(data=>data.json())  
}

export function createUserObject(object){
    return apiRequest(true,'/api/v1/object/objects','POST',true,{"object":object}).then(data=>data.json())   
}

export function deleteUserObject(object){
    return apiRequest(true,`/api/v1/object/objects/${object.id}`,'DELETE',false,false).then(data=>data.json())    
}

export function updateUserObject(object){
    return apiRequest(true,`/api/v1/object/object/${object.id}`,'PUT',true,{"object":object}).then(data=>data.json()) 
}


export function getUserObjectsByFeature(feature){
    // return apiRequest(true,`/api/v1/object/objects/feature=${feature}`,'GET',false,false).then(data=>data.json())
    return getUserObjects().then(data=>{return [...data.filter((obj)=>[...obj.features.map((feature)=>feature.name)].includes(feature))]})
}

export function getUserObjectsByTag(tag){
    return getUserObjects().then(data=>{return [...data.filter((obj)=>[...obj.features.map((tag)=>tag.name)].includes(tag))]})
}

export function getUserObjectsBy(arrName,value){
    return getUserObjects().then(data=>{return [...data.filter((obj)=>[...obj[arrName].map((item)=>item.name)].includes(value))]})
}



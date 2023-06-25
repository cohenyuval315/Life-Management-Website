import { apiRequest } from "./index"


export function getCategories(){ // changable to async need to test in schedule first
    return apiRequest(true,'/category/categories','GET',false,false).then(data=>data.json()).then(data=>data.categories)    

}

export function updateCategories(data){
    return apiRequest(true,'/category/categories','PUT',true,{"categories":data}).then(r=>r.json()).then(data=>console.log(data)).catch(err=>console.log(err));
}


export function getUserCategories(){ // changable to async need to test in schedule first
    return apiRequest(true,'/api/v1/category/categories','GET',false,false).then(data=>data.json()) 
}

export function createUserCategory(category){
    return apiRequest(true,'/api/v1/category/categories','POST',true,{"category":category}).then(data=>data.json())    
}

export function deleteUserCategory(category){
    return apiRequest(true,`/api/v1/category/category/${category.id}`,'DELETE',false,false).then(data=>data.json())   
}


export function updateUserCategory(category){
    return apiRequest(true,`/api/v1/category/category/${category.id}`,'PUT',true,{"category":category}).then(data=>data.json()) 
}


export function getUserCategoriesByFeature(feature){
    // return apiRequest(true,`/api/v1/category/categories/feature=${feature}`,'GET',false,false).then(data=>data.json()) 
    return getUserCategories().then(data=>{return [...data.filter((category)=>category.feature === feature)]})
}

export function getUserCategoriesByFeatureGroup(feature,group){
    // return apiRequest(true,`/api/v1/category/categories/feature=${feature}/group/${group}`,'GET',false,false).then(data=>data.json()) 
    return getUserCategories().then(data=>{return [...[...data.filter((category)=>category.feature === feature)].filter((category)=>category.group === group)]})
}

export function getUserCategoriesGroupsByFeature(feature){
    // return apiRequest(true,`/api/v1/category/categories/feature=${feature}/group/${group}`,'GET',false,false).then(data=>data.json()) 
    return getUserCategories().then(data=>{
        return [...[...new Set([...data.filter((category)=>category.feature === feature).map((category)=>category.group)])]]
    })
}


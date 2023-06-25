export  function toLabelValueItemJson(obj){

    if(obj === undefined){
        return null
    }
    if(obj === null){
        return null
    }

    if (isArray(obj)){
        return toLabelValueItemJsonArray(obj)
    }
    if(isObject(obj)){
        return {label:obj.name,value:obj.id,item:obj}
    }
    if (typeof obj === "string" || typeof obj === "number"){
        return {label:obj, value:obj, item:obj}
    }
}

export function isExistItemInLabelValueItemArr(arr, key, value){
    return [...arr.filter((item)=>item.item !== null && item.item !== undefined).filter((item)=>item.item[key] === value)].length > 0
}

export function getItemFromKey(obj,key,value){
    if(obj === undefined){
        return null
    }
    if(obj === null){
        return null
    }
    if(isArray(obj)){
        return getItemFromArrByKeyValue(obj,key,value)
    }
}

export function getItemFromArrByKeyValue(arr,key,value){

    const item  =  [...arr.filter((item)=>item.item !== null && item.item !== undefined).filter((item)=>item[key] === value)]
    if (item.length === 1){
        return item[0].item
    }
    if (item.length > 1){
        return item
    }
    return null
}

export function isExistItem(arr,key,value){
    return [...arr.map((item)=>item[key])].includes(value)
}

function toLabelValueItemJsonArray(arr){
    if (arr.length === 0){
        return []
    }
    if (typeof arr[0] === "string"){
        return [...arr.map((item)=>{
            return {label:item,value:item,item:item}
        }
    )]
    }
    const newArr =  [...arr.map((item)=>{
        return {label:item.name,value:item.id,item:item}
        }
    )]
    return newArr
}

export function arraysEqual(arr1, arr2)
    {
        let N = arr1.length;
        let M = arr2.length;
 
        // If lengths of array are not equal means
        // array are not equal
        if (N != M)
            return false;
 
        // Sort both arrays
        arr1.sort();
        arr2.sort();
 
        // Linearly compare elements
        for (let i = 0; i < N; i++)
            if (arr1[i] != arr2[i])
                return false;
 
        // If all elements were same.
        return true;
}

export function isArray(object){
    return Object.prototype.toString.call(object) === '[object Array]';
}

export function isObject(object){
    return Object.prototype.toString.call(object) === '[object Object]';
}

export function validateInteger( strValue ) {
    var objRegExp = /(^-?\d\d*$)/;  
    return objRegExp.test(strValue);
}

export function getObjectFromId(userObjects,objectId){
    const obj = [...userObjects.map((item)=>item.item).filter((obj)=>obj.id === objectId)]
    if (obj.length === 1){
        return obj[0]
    }
    return null
}

function filterObjectsByTags(objs,tags){
    const tagsIds = [...tags.map((tag)=>tag.id)]
    const filteredObjs =  [...objs.filter((obj)=>{
        const objTagsIds = [...obj.tags.map((tag)=>tag.id)]
        const tagslength = tagsIds.length
        return tagsIds.filter((tagId)=>objTagsIds.includes(tagId)).filter((bool)=>bool === true).length === tagslength
    })]
    return filteredObjs
}


function nestedLoop(obj){
    const res = {};
    function recurse(obj, current) {
        for (const key in obj) {
            let value = obj[key];
            if(value != undefined) {
                if (value && typeof value === 'object') {
                    recurse(value, key);
                } else {
                    // Do your stuff here to var value
                    res[key] = value;
                }
            }
        }
    }
    recurse(obj);
    return res;
}
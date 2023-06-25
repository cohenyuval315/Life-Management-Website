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

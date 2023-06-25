export function validateNumberAbove(above,value){
    if(value < above){
        return false
    }
    return true
}

export function validateNumberUnder(below,value){
    if(value > below){
        return false
    }
    return true
}

export function validateLengthAbove(above,value){
    if(value.length < above){
        return false
    }
    return true
}

export function validateLengthUnder(below,value){
    if(value.length > below){
            return false
    }
    return true
}

export function validateSubJsonFormat(value,jsonFormat){
    console.log(value,jsonFormat)
    const keys = Object.keys(value)
    const format = Object.keys(jsonFormat)
    if(format.filter((key)=>keys.includes(key)).length !== format.length){
        return false
    }
    return true
}

export function validateJsonFormat(value,jsonFormat){

    const val = Object.keys(value)
    const format = Object.keys(jsonFormat)
    console.log(val,format)
    return arraysEqual(val,format)
}

export function validateNotNull(value){
    if(value === null){
        return false
    }
    return true
}

export function validateNotEmpty(value){
    if(value === ""){
        return false
    }
    return true
}

export function validateRegexFormat(regex,value){
}

export function validateUnique(){
}

export function validateDateFormat(){
}

export function validateEnumValue(){
}

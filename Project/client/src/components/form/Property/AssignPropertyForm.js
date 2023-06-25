import React, {useEffect, useState } from 'react'
import { getUserProperties,getMetaData } from '../../../services/api/index'
import { isObject, toLabelValueItemJson } from '../../../utils/helpers'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import ReactJson from 'react-json-view'
import StyledDateTimePicker from '../../ui/DateTimePicker/StyledDateTimePicker'
import { validateInteger ,arraysEqual} from '../../../utils/helpers'
import StyledButton from '../../ui/Button/StyledButton'





const AssignPropertyForm = (props) => {
    const {properties, onChange, isNoValue,propertiesOptions}= props

    const [allProperties,setAllProperties] = useState([])
    const [selectedProperties,setSelectedProperties] = useState([])
    const [selectedProperty,setSelectedProperty] = useState()

    const [value,setValue] = useState()
    const [stringValue, setStringValue] = useState("");
    const [intValue, setIntValue] = useState("");
    const [numberValue, setNumberValue] = useState("");
    const [dateValue,setDateValue] = useState();
    const [jsonValue,setJsonValue] = useState({});

    useEffect(() => {
        if(properties !== undefined && properties !== null){
            setSelectedProperties(toLabelValueItemJson(properties))
        }
    }, [])

    useEffect(() => {
        if (propertiesOptions !== null && propertiesOptions !== undefined){
            setAllProperties(toLabelValueItemJson(propertiesOptions))
        }

    }, [propertiesOptions])
    

    useEffect(() => {
        if (propertiesOptions !== null && propertiesOptions !== undefined){
            setAllProperties(toLabelValueItemJson(propertiesOptions))
        }else{
            getMetaData().then(data=>{
                getUserProperties().then(props=>{
                    setAllProperties(toLabelValueItemJson([...data.properties,...props]))
                    return data
                })
            })
        }
    }, [])


    function getCurrentProperty(){
        
        let prop = selectedProperty?.item
        if(prop === undefined || prop === null){
            return null
        }
        if(value === undefined || value === null){
            prop.value = selectedProperty?.item?.default 
        }else{
            prop.value = value
        }
        return prop
    }

    function handleAddProperty(){
        let prop = getCurrentProperty()
        if(prop === null){
            console.log("prop is null")
            return
        }
        const view = prop.view
        const rules = view.validationRules

        if(isPropertyExist(prop.name)){
            console.log("prop exist already")
            return 
        }

        if(isNoValue === true){
            prop['value'] = null
        }else{
            if(!validateProperty(prop,rules)){
                console.log("failed to validate prop")
                return
            }
        }

        if(window.confirm("add prop?")){
            const props = [...selectedProperties,toLabelValueItemJson(prop)]
            setSelectedProperties(props)
            const readyProps = props.map((item=>item.item))
            onChange(readyProps)
        }
        
    }

    function isPropertyExist(name){
        return [...selectedProperties.map((item)=>item.item.name)].includes(name)
    }

    function validateProperty(currentProperty,validationRules){
        let val = currentProperty.value
        console.log("prop val = ", val)
        const valid = validationRules.map((rule)=>{
            console.log("rule=", rule, "value=",rule.value,"default=",currentProperty.default )

            let validateValue = currentProperty.default !== null && currentProperty !== undefined ? currentProperty.default : rule.value
            if(rule.name==="jsonFormat"){
                return validateJsonFormat(val,validateValue)
            }
            if(rule.name==="subJsonFormat"){
                return validateSubJsonFormat(val,validateValue)
            }
            if(rule.name==="allowNull"){
                return true
            }
            if(rule.name==="allowEmpty"){
                return true
            }
            if(rule.name==="numberUnder"){
                return validateNumberUnder(validateValue,val)
            }   
            if(rule.name==="numberAbove"){
                return validateNumberAbove(validateValue,val)
            }   
            if(rule.name==="regexFormat"){
                return true
            }  
            if(rule.name==="lengthUnder"){
                return validateLengthUnder(validateValue,val)
            }
            if(rule.name==="lengthAbove"){
                return validateLengthAbove(validateValue,val)
            }    
            if(rule.name==="unique"){
                return true
            }  
            if(rule.name==="dateFormat"){
                return true
            }  
            if(rule.name==="enumValue"){
                return true
            }     
        }).filter((bool)=>bool === false)
        if(valid.length > 0){
            return false
        }
        return true
    }

    function validateNumberAbove(above,value){
        if(value < above){
            return false
        }
        return true
    }

    function validateNumberUnder(below,value){
        if(value > below){
            return false
        }
        return true
    }

    function validateLengthAbove(above,value){
        if(value.length < above){
            return false
        }
        return true
    }

    function validateLengthUnder(below,value){
        if(value.length > below){
                return false
        }
        return true
    }

    function validateSubJsonFormat(value,jsonFormat){
        console.log(value,jsonFormat)
        const keys = Object.keys(value)
        const format = Object.keys(jsonFormat)
        if(format.filter((key)=>keys.includes(key)).length !== format.length){
            return false
        }
        return true
    }

    function validateJsonFormat(value,jsonFormat){

        const val = Object.keys(value)
        const format = Object.keys(jsonFormat)
        console.log(val,format)
        return arraysEqual(val,format)
    }

    function validateAllowNull(value){
        if(value === null){
            return false
        }
        return true
    }

    function validateAllowEmpty(value){
        if(value === ""){
            return false
        }
        return true
    }

    function validateRegexFormat(regex,value){
    }

    function validateUnique(){
    }

    function validateDateFormat(){
    }

    function validateEnumValue(){
    }

    useEffect(() => {
        if(selectedProperty !== null && selectedProperty !== undefined){
            
            const prop = selectedProperty.item
            console.log("pr=",prop)
            const rules = prop.view.validationRules

            if(prop.dataType.name === "string" || prop.dataType.name ==="text"){
                setStringValue(prop.default)
                if(isObject(prop.default)){
                    setStringValue("")
                }
                
            }

            if(prop.dataType.name === "number" || prop.dataType.name ==="decimal"){
                setNumberValue(prop.default)
            }
            if(prop.dataType.name === "int"){
                setIntValue(prop.default)
            }
            if(prop.dataType.name === "json"){
                setJsonValue(prop.default)
            }
            if(prop.dataType.name === "date" || prop.dataType.name ==="datetime"){
                setDateValue(prop.default)
            }

            if(prop.dataType.name === "bool" || prop.dataType.name ==="binary"){
            }
                setValue(prop.default)
        }
      
    }, [selectedProperty])
    

    return (
        <div>
            <h3>assigning props:</h3>
            <StyledSelect isMulti handleChange={handleSelectedPropertiesOnChange} label={""} values={selectedProperties} options={[]} />
            <StyledSelect handleChange={handleSelectedPropertyOnChange} label={""} values={selectedProperty} options={allProperties} />
            {(isNoValue !== true && (
                <div>
                {(selectedProperty !== null && selectedProperty !== undefined)&&(
                    <div> 
                        <div className='propValue'>
                            {(selectedProperty.item.dataType.name === "json")&&(
                                
                                <div>
                                    <div>
                                        enforce non nested keys as default value: values dont matter
                                    </div>
                                    <ReactJson
                                        src={jsonValue}
                                        theme="monokai"
                                        onEdit={onEdit}
                                        onAdd={onAdd}
                                        onDelete={onDelete}
                                        sortKeys={true}
                                        displayDataTypes={false}
                                        displayObjectSize={false}
                                        indentWidth={4}
                                        collapseStringsAfterLength={20}
                                        style={{fontSize:"18px"}}
                                    />
                                </div>
                            )}

                            {(selectedProperty.item.dataType.name === "string" || selectedProperty.item.dataType.name === "text" )&&(
                                <StyledTextField label={"paragraph"} multiline={true} value={stringValue} onChange={handleStringValueOnChange} />
                            )}

                            {(selectedProperty.item.dataType.name === "int")&&(
                                <StyledTextField label={"int"} value={intValue} handleChange={handleIntValueOnChange}/>
                            )}
                            {(selectedProperty.item.dataType.name === "decimal" || selectedProperty.item.dataType.name === "number" )&&(
                                <StyledTextField label={"number"} value={numberValue} handleChange={handleNumberValueOnChange} />
                            )}
                            {(selectedProperty.item.dataType.name === "date" || selectedProperty.item.dataType.name === "datetime" )&&(
                                <StyledDateTimePicker onChange={handleDateValueOnChange} value={dateValue} label={"date"} />
                            )}
                        </div>
                    </div>
                    
                )}
                </div>
            ))}
            <StyledButton handleOnClick={handleAddProperty} name={"add"} />

        </div>
    )

    function handleSelectedPropertiesOnChange(e){
        setSelectedProperties(e)
        onChange(e.map((item)=>item.item))
    }

    function handleSelectedPropertyOnChange(e){
        setSelectedProperty(e)
    }

    function onEdit(obj) {
        const prop = selectedProperty.item
        const rules = prop.view.validationRules
        const subformat = [...rules.filter((rule)=>rule.name ==="subJsonFormat")]
        const format = [...rules.filter((rule)=>rule.name ==="jsonFormat")]
        if(subformat.length > 0 && prop.dataType.name === "json"&& isObject(prop.default)){
            if (validateSubJsonFormat(obj.updated_src,prop.default) === false){
                console.log("not sub json format")
                return false
            }
        }
        if(format.length > 0 && prop.dataType.name === "json" && isObject(prop.default)){
            if (validateJsonFormat(obj.updated_src,prop.default) === false){
                console.log("not json format ")
                return false
            }
        
        }
        setJsonValue(obj.updated_src)
        setValue(obj.updated_src)
    }

    function onAdd(obj) {
        const prop = selectedProperty.item
        const rules = prop.view.validationRules
        const subformat = [...rules.filter((rule)=>rule.name ==="subJsonFormat")]
        const format = [...rules.filter((rule)=>rule.name ==="jsonFormat")]
        console.log(format,subformat)
        if(subformat.length > 0 && prop.dataType.name === "json"&& isObject(prop.default)){
            if (validateSubJsonFormat(obj.updated_src,prop.default) === false){
                console.log("not sub json format")
                return false
            }
        }
        if(format.length > 0 && prop.dataType.name === "json" && isObject(prop.default)){
            if (validateJsonFormat(obj.updated_src,prop.default) === false){
                console.log("not json format ")
                return false
            }
        
        }
        setJsonValue(obj.updated_src)
        setValue(obj.updated_src)
    }

    function onDelete(obj) {
        const prop = selectedProperty.item
        const rules = prop.view.validationRules
        const subformat = [...rules.filter((rule)=>rule.name ==="subJsonFormat")]
        const format = [...rules.filter((rule)=>rule.name ==="jsonFormat")]
        
        if(subformat.length > 0 && prop.dataType.name === "json"&& isObject(prop.default)){
            if (validateSubJsonFormat(obj.updated_src,prop.default) === false){
                console.log("not sub json format")
                return false
            }
        }
        if(format.length > 0 && prop.dataType.name === "json" && isObject(prop.default)){
            if (validateJsonFormat(obj.updated_src,prop.default) === false){
                console.log("not json format ")
                return false
            }
        
        }
        setJsonValue(obj.updated_src)
        setValue(obj.updated_src)
    }

    function handleIntValueOnChange(e){
        setValue(e.target.value)
        setIntValue(e.target.value)
        if (!validateInteger(e.target.value)){
            setValue("")
            setIntValue("")
        }
    }

    function handleNumberValueOnChange(e){
        setValue(e.target.value)
        setNumberValue(e.target.value)
    }

    function handleDateValueOnChange(e){
        setDateValue(e)
        setValue(e)
    }

    function handleStringValueOnChange(e){
        setValue(e.target.value)
        setStringValue(e.target.value)
    }
}

export default AssignPropertyForm

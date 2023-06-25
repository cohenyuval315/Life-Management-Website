import React,{useState,useEffect} from 'react'
import { isArray, isObject, toLabelValueItemJson, validateInteger } from '../../../utils/helpers'
import StyledButton from '../../ui/Button/StyledButton'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import ReactJson from 'react-json-view'
import { createUserProperty, deleteUserProperty, getMetaData, getUserProperties,updateUserProperty } from '../../../services/api/index'
import './PropertyForm.css'
import StyledDateTimePicker from '../../ui/DateTimePicker/StyledDateTimePicker'

const PropertyForm = () => {

    const [allProperties,setAllProperties] = useState()
    const [selectedProperty,setSelectedProperty] = useState()
    const [metaDataTypes,setMetaDataTypes] = useState()
    const [metaViews,setMetaViews] = useState()
    const [name, setName] = useState("")
    const [viewOptions,setViewOptions] = useState()
    const [dataTypeOptions,setDataTypeOptions] = useState()
    const [selectedDataType,setSelectedDataType] = useState() 
    const [selectedView,setSelectedView] = useState()
    const [defaultValue,setDefaultValue] = useState()
    const [stringValue, setStringValue] = useState("");
    const [intValue, setIntValue] = useState("");
    const [numberValue, setNumberValue] = useState("");
    const [dateValue,setDateValue] = useState();
    const [jsonValue,setJsonValue] = useState({});

    function fetchProperties(){
        getUserProperties().then(props=>{
            const newProp = toLabelValueItemJson("new")
            const readyProps = toLabelValueItemJson([...props])
            setAllProperties([newProp,...readyProps])
        })
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    useEffect(() => {
        getMetaData().then(data=>{
            setMetaDataTypes(data.dataTypes)
            setDataTypeOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(data.dataTypes)])
            setMetaViews(data.views)
            setViewOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(data.views)])
            return data
        })
    }, [])

    useEffect(() => {
        setDefaultValue(stringValue)
    }, [stringValue])

    useEffect(() => {
        setDefaultValue(intValue)
    }, [intValue])

    useEffect(() => {
        setDefaultValue(numberValue)
    }, [numberValue])

    useEffect(() => {
        setDefaultValue(dateValue)
    }, [dateValue])

    useEffect(() => {
        setDefaultValue(jsonValue)
    }, [jsonValue])

    useEffect(() => {
        if (selectedProperty !== null && selectedProperty !== undefined && selectedProperty.label !== "new"){
            console.log(selectedProperty)
            setName(selectedProperty.item.name)
            const val = selectedProperty.item.default
            setDefaultValue(val)
            setSelectedView(toLabelValueItemJson(selectedProperty.item.view))
            const type = selectedProperty.item.dataType
            setSelectedDataType(toLabelValueItemJson(type))
            if(type.name === "string" || type.name ==="text"){
                setStringValue(val)
            }
            if(type.name === "int"){
                setIntValue(val)
            }
            if(type.name === "number"){
                setNumberValue(val)
            }
            if(type.name === "date" || type.name ==="datetime"){
                setDateValue(val)
            }
            if(type.name === "json"){
                setJsonValue(val)
            }
            
        }

    }, [selectedProperty])


    function getCurrentProperty(){
        const prop = {
            name:name,
            view:selectedView?.item,
            dataType:selectedDataType?.item,
            default:defaultValue,
            value:null
        }
        if (selectedProperty !== null && selectedProperty !== undefined && selectedProperty.label !== "new"){
            prop["id"] = selectedProperty.item.id
        }
        return prop
    }

    function validateProperty(currentProperty){
        if(currentProperty === null){
            console.log("prop is null")
            return false
        }
        if(currentProperty === undefined){
            console.log("prop is undefined")
            return false
        }
        if(currentProperty.default === null){
            console.log("prop value is null")
            return false
        }
        if(currentProperty.default === undefined){
            console.log("prop value is undefined")
            return false
        }
       if(currentProperty.name === null){
            console.log("prop cant be null")
            return false
        }
        if(currentProperty.name === "unset"){
            console.log("prop cant be called new")
            return false
        }
        if(currentProperty.name === ""){
            console.log("prop cant be called nothing")
            return false
        }
        if(currentProperty.name.length > 15){
            console.log("prop name  too long")
            return false
        }
        if (currentProperty.dataType === null){
            console.log("prop data type cant be nothing")
            return false
        }
        if (currentProperty.dataType === undefined){
            console.log("prop data type cant be nothing")
            return false
        }
        if (currentProperty.dataType === "unset"){
            console.log("prop data type cant be unset")
            return false
        }
        if (currentProperty.view === "unset"){
            console.log("prop data type cant be unset")
            return false
        }
        if (currentProperty.view === null){
            console.log("prop view cant be nothing")
            return false
        }
        if (currentProperty.view === undefined){
            console.log("prop view cant be nothing")
            return false
        }
        if (currentProperty.attribute === null){
            console.log("attribute cant be nothing")
            return false
        }
        return true
    }

    function isPropertyExist(name){
        return [...allProperties.map((item)=>item.item.name)].includes(name)
    }

    function handleSubmit(){
        const prop = getCurrentProperty()
        if(validateProperty(prop)){
            if(isPropertyExist(prop)){
                console.log("prop name exists already")
                return
            }
            if(selectedProperty !== undefined && selectedProperty !== null && selectedProperty.label !== "new" ){
                if(window.confirm("update?")){
                    updateUserProperty(prop)
                    console.log("updated prop!:",prop)
                    fetchProperties()
                }
            }else{
                if(window.confirm("create?")){
                    createUserProperty(prop)
                    console.log("created new prop!:",prop)
                    fetchProperties()
                }
            }
            
        }else{
            console.log("invalid prop")
        }
      
    }

    function handleDeleteProperty(){
        const prop = selectedProperty.item
        if(window.confirm("delete?")){
            deleteUserProperty(prop)
            console.log("deleted  prop!:",prop)
            fetchProperties()
        }

    }

    useEffect(() => {
        if(selectedView !== null && selectedView !== undefined && metaDataTypes !== null && metaViews !== metaDataTypes){
            if(selectedView.label !== "unset" && selectedProperty !== undefined && selectedProperty !==null && selectedProperty.label ==="new"){
                const viewDataTypes = [...selectedView.item.dataTypes]
                setName(selectedView.item.name)
                setDataTypeOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(viewDataTypes)])
 

            }else{
               
                setViewOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(metaViews)])
                
                setDataTypeOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(metaDataTypes)])

            }
            
        }

    }, [selectedView])
    
    useEffect(() => {
        if(selectedDataType !== null && selectedDataType !== undefined && metaViews !== null && metaViews !== undefined){
            if(selectedDataType.label !== "unset" && selectedProperty !== undefined && selectedProperty !==null && selectedProperty.label ==="new"){
                const dataTypeId = selectedDataType.item.id
                const viewsByDataType = [...metaViews.filter((view)=>[...view.dataTypes.map((type)=>type.id)].includes(dataTypeId))]
                setViewOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(viewsByDataType)])
            }else{
                setDataTypeOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(metaDataTypes)])
                setViewOptions([toLabelValueItemJson("unset"),...toLabelValueItemJson(metaViews)])
            }
        }
        
    }, [selectedDataType])


  return (
    <div className='propForm'>
        <StyledSelect values={selectedProperty} handleChange={handleSelectedPropertyOnChange} options={allProperties} placeholder={"data type"} />
        <StyledTextField value={name} handleChange={handlePropertyNameOnChange} variant='outlined' placeholder={"name"}/>
        <StyledSelect values={selectedDataType} handleChange={handleSelectedDataTypeOnChange} options={dataTypeOptions} placeholder={"data type"} />
        <StyledSelect values={selectedView} handleChange={handleSelectedViewOnChange} options={viewOptions} placeholder={"view"} />

        <div>
            <div>
                validation rules of view :
            </div>
            {(selectedView !== null && selectedView !== undefined && selectedView.label !== "unset") && (
                <div>
                    {selectedView.item.validationRules.map((rule)=>{
                        return (
                        <div key={rule.name}>
                            {(isObject(rule.value)?(
                                <div>   
                                    <div>
                                         {rule.name} Rule
                                    </div>
                                    json fields:
                                    {Object.keys(rule.value).map((key,index)=>{  
                                        return (
                                            <div>
                                                field: {key} : {[...Object.values(rule.value)][index]}
                                            </div>
                                        )
                                        })}
                                </div>):(<div>{rule.name}:{rule.value}</div>))}
                        </div>)
                    })}
                </div>
            )}
        </div>


        <div>
            <div>
                Default Value:
            </div>
        {(selectedDataType !== null && selectedDataType !== undefined && selectedDataType.label !== "unset")&&(
            <div> 
                <div className='propValue'>
                    {(selectedDataType.item.name === "json")&&(
                        
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

                    {(selectedDataType.item.name === "string" || selectedDataType.item.name === "text" )&&(
                        <StyledTextField label={"paragraph"} multiline={true} value={stringValue} onChange={handleStringValueOnChange} />
                    )}

                    {(selectedDataType.item.name === "int")&&(
                        <StyledTextField label={"number"} value={intValue} handleChange={handleIntValueOnChange} rule={"number"} maxLength={12} />
                    )}
                    {(selectedDataType.item.name === "decimal" || selectedDataType.item.name === "number" )&&(
                        <StyledTextField label={"number"} value={numberValue} handleChange={handleNumberValueOnChange} rule={"number"} maxLength={12} />
                    )}
                    {(selectedDataType.item.name === "date" || selectedDataType.item.name === "datetime" )&&(
                        <StyledDateTimePicker onChange={handleDateValueOnChange} value={dateValue} label={"date"} />
                    )}
                </div>
            </div>
            
        )}
        </div>
        {(selectedProperty !== null && selectedProperty !== undefined && selectedProperty.label !== "new")?(
            <div>
                <StyledButton name={"edit prop"}  handleOnClick={handleSubmit}/>
                <StyledButton name={"delete prop"}  handleOnClick={handleDeleteProperty}/>
            </div>
        ):(
            <StyledButton name={"create prop"}  handleOnClick={handleSubmit}/>
        )}
        

    </div>
  )

    function handleSelectedPropertyOnChange(e){
        setSelectedProperty(e)
    }

    function onEdit(obj) {
        setJsonValue(obj.updated_src)
        setDefaultValue(obj.updated_src)
    }

    function onAdd(obj) {
        setJsonValue(obj.updated_src)
        setDefaultValue(obj.updated_src)
    }

    function onDelete(obj) {
        setJsonValue(obj.updated_src)
        setDefaultValue(obj.updated_src)
    }

    function handleIntValueOnChange(e){
        setDefaultValue(e.target.value)
        setIntValue(e.target.value)
        if (!validateInteger(e.target.value)){
            setDefaultValue("")
            setIntValue("")
        }
    }

    function handleNumberValueOnChange(e){
        setDefaultValue(e.target.value)
        setNumberValue(e.target.value)
    }

    function handleDateValueOnChange(e){
        setDateValue(e)
        setDefaultValue(e)
    }

    function handleStringValueOnChange(e){
        setDefaultValue(e.target.value)
        setStringValue(e.target.value)
    }

    function handleSelectedViewOnChange(e){
        setSelectedView(e)
    }

    function handleSelectedDataTypeOnChange(e){
        setSelectedDataType(e)
    }

    function handlePropertyNameOnChange(e){
        setName(e.target.value)
    }

}

export default PropertyForm
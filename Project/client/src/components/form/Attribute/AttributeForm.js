import React,{useState,useEffect} from 'react'
import { getMetaData } from '../../../services/api/index'
import { toLabelValueItemJson, validateInteger } from '../../../utils/helpers'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import RadioList from '../../ui/RadioList/index'
import './AttributeForm.css'

/** 
attrTypes:

entity:
    name

 
Attr:
    id = 1
    name  ===  integer
    dataType  === int
    views = ["stars","",...]

Attr:
    id = 2
    name  ===  string
    dataType  === string
    views = ["text","",...]

Attr:
    id = 3
    name  ===  json 
    dataType  === json
    views = ["tree","folder",...]
    validation rules : [defaultFormat, ...]


------------
attr:
    id
    name
    datatype
    view
    validationRules




--------------
default_property:
    id  
    name= priority
    attrId = 1 
    default=""
    validation rules : [length > 0 , string only , no numbers]
    value= ""
    view= stars

property:


--------------------
prop :
    tips:
    attr json:
    view : tree
    valid rules = defualt formta:


property:
    id  
    name= tips
    attrId = 3
    default={...}
    validation rules : [length > 0 , string only , no numbers]
    value= ""
    view= stars





value:
    id
    attrId = 1 
    value= ""
    dataType


SparseAttr:
    id
    name  ===  ?
    datatype  === int
    value = ?
    validation rules : length > 0 , only numbers ,  
    default = 0
    view = stars
attr:
    id
    name  ===  ?
    datatype  === string
    value = ?
    validation rules : length > 0 , string only , no numbers
    default = "tip1"
    view = stars
attr:
    id
    name  ===  ?
    datatype  === int
    value = ?
    validation rules : length > 0 , only numbers ,  
    default = 0
    view = stars
*/
const AttributeForm = ({call,attrsOptions,onChange,attrs,filter}) => {   

    const [attributesOptions,setAttributesOptions] = useState() // attrs options
    const [attributes,setAttributes] = useState() // attrs
    const [selectedAttributes,setSelectedAttributes] = useState() // with values
    const [selectedAttr,setSelectAttr] = useState() // selected attr to edit value
    const [selectedDataTypeRadio,setSelectedDataTypeRadio] = useState() // type of value
    //
    // validation metadata
    
    // attr options , attrs / fetch / filter
    // selected attrs from complete attrs= list attrsOptions or attribute u provide,
    // select attr
    // edit value depending on data type, auto save
    // validate that all got value,
    // template value attrs
    //
//https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model#Use_in_databases
// metadata through pivoting
// business logic is in the metadata
//It is easy for an insufficiently knowledgeable user to corrupt
// pivoting tables - pivot table
// Filters- filter to all table ,filter is used to apply a filter to an entire table.
// Columns- labels to filter, Column labels are used to apply a filter to one or more columns that have to be shown in the pivot table
// Rows-Row labels are used to apply a filter to one or more rows that have to be shown in the pivot table
// Values-This usually takes a field that has numerical values that can be used for different types of calculations
    // return values of all attrs
    // 
    // default value
    const [value,setValue] = useState();

    function getAttrsDataTypes(){
        const uniqueDataTypes =  [...new Set([...attributesOptions.map((item)=>item.item).map((item.dataType))])]
        return uniqueDataTypes
    }

    function onEdit(obj) {
        setValue(obj.updated_src)
    }

    function onAdd(obj) {
        setValue(obj.updated_src)
    }

    function onDelete(obj) {
        setValue(obj.updated_src)
    }

    function fetchAttributes(){
        getMetaData().then(data=>{
            const attrs = data['attributes']
            setAttributesOptions([toLabelValueItemJson("new"),...toLabelValueItemJson(attrs)])
        })
    }

    useEffect(() => {
        if(attrs !== null && attrs !== undefined){
            setAttributes(attrs)
        }else{
            setAttributes([])
        }
    

    }, [])
    

    useEffect(() => {
      if(attrsOptions === undefined || attrsOptions === null){
        fetchAttributes()
        
      }else{
        setAttributesOptions(attrsOptions)
      }
    }, [])

    function handleSelectedAttributesOnChange(e){
        setSelectedAttributes(e)
    }

    function handleSelectedAttrOnChange(e){
        setSelectAttr(e)
    }

    function handleRadioOnChange(e){
        setSelectedDataTypeRadio(e)
    }

    function getCurrentAttr(){
        const attr = {
            attr:selectedAttr.item,
            value:value
        }
        return attr
    }

  return (
    <div>
        <StyledSelect isMulti values={selectedAttributes} handleChange={handleSelectedAttributesOnChange} label={"attrs:"} options={attributesOptions} />
        <StyledSelect values={selectedAttr} handleChange={handleSelectedAttrOnChange} label={"attrs:"} options={selectedAttributes} />
        {(selectedAttr !== null && selectedAttr !== undefined &&(
            <div>
                <div>
                    selected attribute: {(selectedAttr?.label)}
                </div>
                <div>
                    attribute name: {(selectedAttr?.item.name)}
                </div>
                <div>
                    attribute data type: {(selectedAttr?.item.description)}
                </div>
                <div>
                    attribute data type: {(selectedAttr?.item.dataType)}
                </div>
                <div>
                    attribute data type: {(selectedAttr?.item.dataType)}
                </div>
            </div>
        ))}

        {/* <div>isReadOnly<input value={"isReadOnly"} name={"isReadOnly"} type="checkbox" checked={isReadOnly} onChange={handleIsReadOnlyOnChange}/></div> */}
        <RadioList handleChange={handleRadioOnChange} radioOptions={getAttrsDataTypes()} selectedOption={selectedDataTypeRadio} />
        {(selectedDataTypeRadio === selectedAttr.dataType === "json")&&(
            <div>
                <ReactJson
                    src={value}
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
        
        {(selectedDataTypeRadio === selectedAttr.dataType === "string")&&(  
            <div>
                <StyledTextField value={value} handleChange={handleValueOnChange} label={"str"} multiline />
            </div>
        )}

        {(selectedDataTypeRadio === selectedAttr.dataType === "int")&&(  
            <div>
                <StyledTextField value={value} handleChange={handleIntValueOnChange} label={"int"} />
            </div>
        )}


        {(getCurrentAttr().value)}
    </div>
  )
}

function handleValueOnChange(e){
    setValue(e.target.value)
}

function handleIntValueOnChange(e){
    if(validateInteger(value)){
        setValue(e.target.value)
    }else{
        setValue("")
    }
    
}
export default AttributeForm
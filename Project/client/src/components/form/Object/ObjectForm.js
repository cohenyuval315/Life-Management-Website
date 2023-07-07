import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { getMetaData, getUserProperties} from '../../../services/api/index'
import { getUserTags,getUserCategories,createUserObject,updateUserObject,getUserGroups} from '../../../services/api/index'
import {v4 as uuidv4} from 'uuid';
import {toLabelValueItemJson, isExistItemInLabelValueItemArr} from '../../../utils/helpers'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from "../../ui/InputField/TextField/StyledTextField";
import StyledButton from "../../ui/Button/StyledButton";
import './ObjectForm.css'
import PropertyForm from "../Property/index";
import { fontSize } from "@mui/system";
import AssignPropertyForm from "../Property/AssignPropertyForm";

const useStyles = makeStyles({

    formLayout:{

        padding:"25px",
        display:"block",
        height:"700px",
        overflowY:"scroll",
        height:"800px",
        width:"1000px",
        backgroundColor:"#B9B49E",
        fontFamily:"cursive",
        fontSize:"18px"
    },

    formHeader:{
        fontSize:"25px",
        alignItems:"center",
    },

    formFooter:{
    },

    reactJson:{
        minHeight:"200px"
    },

    formAttributeData:{
    },

    objectInputData:{
        
    },

    propertyInputData:{
    },
});





const ObjectForm = ({object}) => {

  const classes = useStyles();

  const [metaData, setMetaData] = useState(null)
  const [metaStates, setMetaStates] = useState([])
  const [metaFeatures, setMetaFeatures] = useState([])

  const [userTags,setUserTags] = useState([])
  const [userCategories,setUserCategories] = useState([])
  const [userGroups,setUserGroups] = useState([])

  const [objectName, setObjectName] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [objectState, setObjectState] = useState({label: "", value: ""});
  const [objectTags, setObjectTags] = useState([]); 
  const [objectCategories, setObjectCategories] = useState([]); 
  const [objectFeatures, setObjectFeatures] = useState([]);
  const [objectProperties,setObjectProperties]=useState([])
  const [objectGroups,setObjectGroups]=useState([])



    useEffect(() => {
        getMetaData().then(data=>{
            setMetaData(data)
            setMetaFeatures(toLabelValueItemJson(data.features))
            setMetaStates(toLabelValueItemJson(data.states))
        })
    }, [])

    useEffect(()=>{
    
        if(object !== undefined && object!==null){
            setObjectName(object.name)
            setObjectDescription(object.description)
            setObjectState(toLabelValueItemJson(object.state))
            setObjectTags(toLabelValueItemJson(object.tags))
            setObjectCategories(toLabelValueItemJson(object.categories))
            setObjectFeatures(toLabelValueItemJson(object.features))
            setObjectProperties(object.properties)
            setObjectGroups(object.groups)
        }
    },[])

    useEffect(() => {
        getUserTags().then(data=>{
            setUserTags(toLabelValueItemJson(data))
        })
        getUserCategories().then(data=>{
            setUserCategories(toLabelValueItemJson(data))
        })
        getUserGroups().then(data=>{
            setUserGroups(toLabelValueItemJson(data))
        })

    }, [])


    function handleCreateObject() {
        const obj = getCurrentObject()
        if(validateObject(obj)&&window.confirm("create?")){
            createUserObject(obj)
            console.log("created obj!")
            return
        }
        console.log("failed to create obj!");
    }

    function handleUpdateObject() {
        const obj = getCurrentObject()
        console.log(obj)
        if(validateObject(obj)&&window.confirm("to update?")){
            updateUserObject(obj)
            
        }else{
            console.log("failed");
        }
    } 

    function getCurrentObject(){
        const obj = {
            name: objectName,
            description: objectDescription,
            features: [...objectFeatures.map((feature)=>feature.item.id)],
            state: objectState.item.id,
            tags: [...objectTags.map((tag)=>tag.item.id)],
            properties: objectProperties.map((prop)=>{return {propertyId:prop.id, value:prop.value}}),
            categories:[...objectCategories.map((category)=>category.item.id)],
            groups:[...objectGroups.map((group)=>group.item.id)]
        };
        if(object !== undefined && object !== null){
            obj['id'] = object.id
        }
        console.log("obj=",obj)
        return obj
    }

    function validateObject(obj){
        if (obj.name === ""){
            console.log("obj name cannot be empty")
            return false
        }
        if (obj.name.length < 3){
            console.log("obj name too short")
            return false
        }
        if (obj.name.length > 30){
            console.log("obj name too long")
            return false
        }

        if (obj.description === ""){
            console.log("obj description cannot be empty")
            return false
        }

        if(obj.state === null){
            console.log("obj state cannot be empty")
            return false
        }
        if(obj.state === undefined){
            console.log("obj state cannot be empty")
            return false
        }
        return true
    }


  return (
    <div className={classes.formLayout}>
        {(metaData!== null)&&(
            <div>
                <div className={classes.formHeader}>
                    {object?"edit":"NEW OBJECT"}
                </div>  
                <div className="FormBody" style={{padding:"15px", border:"1px solid black"}}>

                    <div className={classes.objectInputData}>
                        <StyledTextField label={"name"} value={objectName} handleChange={handleObjectNameOnChange} placeholder={"name"} variant="outlined"/>
                        <StyledTextField label={"description"} value={objectDescription} handleChange={handleObjectDescriptionOnChange} placeholder={"description"} variant="outlined" multiline/>
                        <StyledSelect label={"states"} value={objectState} options={metaStates} handleChange={handleObjectStateOnChange}/>
                        <StyledSelect label={"tags"} value={objectTags} options={userTags} handleChange={handleObjectTagsOnChange} isMulti closeMenuOnSelect={false} />

                        <StyledSelect label={"categories"} value={objectCategories} options={userCategories}  handleChange={handleObjectCategoriesOnChange} closeMenuOnSelect={false} isMulti />
                        <StyledSelect label={"groups"} value={objectGroups} options={userGroups}  handleChange={handleObjectGroupsOnChange} closeMenuOnSelect={false} isMulti />

                        <StyledSelect label={"features"} value={objectFeatures} options={metaFeatures} handleChange={handleObjectFeaturesOnChange}  closeMenuOnSelect={false} isMulti />
                        {/* <StyledSelect label={"properties"} value={objectProperties} options={propertiesOptions} handleChange={handleObjectPropertiesOnChange} closeMenuOnSelect={false} isMulti  /> */}
                    </div>

                    <div style={{paddingTop:"20px"}}>
                        <AssignPropertyForm  onChange={handleObjectPropertiesOnChange} properties={objectProperties}/>
                    </div>

                </div>

                <div className={classes.formFooter}>
                {(object?(
                    <StyledButton name={"edit object"} handleOnClick={handleUpdateObject}/>
                        ):(
                    <StyledButton name={"create object"} handleOnClick={handleCreateObject} />
                ))}
                </div>


            </div>
        )}
    </div>
  )


    function handleObjectGroupsOnChange(e){
        setObjectGroups(e)
    }

    function handleObjectNameOnChange(e) {
        setObjectName(e.target.value);
    }

    function handleObjectDescriptionOnChange(e) {
        setObjectDescription(e.target.value);
    }

    function handleObjectStateOnChange(e) {
        setObjectState(e);
    }

    function handleObjectTagsOnChange(e) {
        setObjectTags(e);
    }

    function handleObjectFeaturesOnChange(e) {
        setObjectFeatures(e);
    }

    function handleObjectCategoriesOnChange(e){
        setObjectCategories(e)
    }

    function handleObjectPropertiesOnChange(e){
        setObjectProperties(e)
    }

}




export default ObjectForm
import { Button, TextField } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import Select from 'react-select'
import { getObjectFromId, isExistItemInLabelValueItemArr, toLabelValueItemJson,validateInteger } from '../../../utils/helpers';
import {createUserRoutine, getUserObjects, getUserTags } from '../../../services/api/index';
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import StyledButton from '../../ui/Button/StyledButton';
import AssignPropertyForm from '../Property/AssignPropertyForm';
import DurationObjectForm from '../DurationObject';

const RoutineForm = ({routine}) => {

    const [userObjects,setUserObjects] = useState([])
    const [userTags,setUserTags] = useState([])

    const [routineTags,setRoutineTags] = useState([])
    const [routineName,setRoutineName] = useState("")
    const [routineDescription,setRoutineDescription] = useState("")
    const [routineDurationObjects,setRoutineDurationObjects] = useState([])
    const [routineProperties,setRoutineProperties] = useState([])


    function getCurrentRoutine(){
        const routine = {
            name:routineName,
            description:routineDescription,            
            tagsIds:[...routineTags.map((item)=>item.item.id)],
            propertiesIds:[...routineProperties.map((prop)=>prop.id)],
            durationObjects:routineDurationObjects,
        }
        return routine
    }

    function validateRoutine(currentRoutine){
        if(currentRoutine.name === null){
            console.log("routine:fail:name:null")
            return false
        }
        if(currentRoutine.name === undefined){
            console.log("routine:fail:name:undefined")
            return false
        }
        if(currentRoutine.name.length < 3){
            console.log("routine:fail:name: too short length<3")
            return false
        }
        if(currentRoutine.name.length > 30){
            console.log("routine:fail:name: too long length>30")
            return false
        }
        if(currentRoutine.description === null){
            console.log("routine:fail:description:null")
            return false
        }
        if(currentRoutine.description === undefined){
            console.log("routine:fail:description:undefined")
            return false
        }
        if(currentRoutine.description.length > 30){
            console.log("routine:fail:description: too long length>30")
            return false
        }
        if(currentRoutine.description.length < 5){
            console.log("routine:fail:description: too short length < 5")
            return false
        }

        if(currentRoutine.durationObjects === null){
            console.log("routine:fail:description:null")
            return false
        }
        if(currentRoutine.durationObjects === undefined){
            console.log("routine:fail:description:undefined")
            return false
        }
        if(currentRoutine.durationObjects.length < 3){
            console.log("routine:fail:durationObjects: too short length < 3")
            return false
        }

        return true
    }


    useEffect(() => {
        getUserObjects().then(data=>{
            setUserObjects(toLabelValueItemJson(data))
        })
        getUserTags().then(data=>{
            setUserTags(toLabelValueItemJson(data))
        })

    }, [])


    useEffect(() => {
        if(routine !== null && routine !== undefined){
            setRoutineName(routine.name)
            setRoutineDescription(routine.description)
            setRoutineTags(toLabelValueItemJson(routine.tags))
            setRoutineProperties(routine.properties)
            setRoutineDurationObjects(routine.durationObjects)
        }else{
            // setRoutineName("")
            // setRoutineDescription("")
            // setRoutineTags(null)
            // setRoutineProperties(null)
            // setRoutineDurationObjects(null)
        }
    }, [routine])


    function handleUpdateRoutine(){
        const currentRoutine = getCurrentRoutine()
        if(validateRoutine(currentRoutine)){
            if(!window.confirm("update?")){
                return
            }
            console.log("updated routine!")
        }
    }

    function handleCreateRoutine(){
        const currentRoutine = getCurrentRoutine()
        if(validateRoutine(currentRoutine)){
            if(!window.confirm("create?")){
                return
            }
            console.log("curRoutine",currentRoutine)
            createUserRoutine(currentRoutine)
            console.log("created routine!")
        }

    }

    function handleDeleteRoutine(){
        const currentRoutine = getCurrentRoutine()
        if(validateRoutine(currentRoutine)){
            if(!window.confirm("delete?")){
                return
            }
            console.log("deleted routine!")
        }
    }



    const durationObjectsProps = {
        durationObjects:routineDurationObjects,
        onChange:handleRoutineDurationObjectsOnChange,
        routineProperties:routineProperties,
        routineTags:routineTags,
    }

    
  return (

    <div>
        <StyledTextField value={routineName} handleChange={handleRoutineNameOnChange} label={"name"} />
        <StyledTextField value={routineDescription} handleChange={handleRoutineDescriptionOnChange}  label={"description"} placeholder={"description"} variant="outlined" multiline/>
        <div>
        <StyledSelect label={"routine object tags"} options={userTags} values={routineTags} handleChange={handleRoutineTagsOnChange} isMulti/>

        props:
        <AssignPropertyForm onChange={handleRoutinePropertiesOnChange} properties={routineProperties} isNoValue={true}  />
        </div>



        -------------------------------------------------------------------------
        <DurationObjectForm {...durationObjectsProps}/>

       

        <div className='submit'>
            {(routine!== undefined && routine !== null)?(
                <div>
                    <StyledButton name={"update"} handleOnClick={handleUpdateRoutine}/>
                    <StyledButton name={"delete"} handleOnClick={handleDeleteRoutine}/>
                </div>
            ):(
                <StyledButton name={"create"} handleOnClick={handleCreateRoutine}/>
            )}
        </div>

    </div>
  )

    function handleRoutinePropertiesOnChange(e){
        setRoutineProperties(e)
    }


    function handleRoutineTagsOnChange(e){
        setRoutineTags(e)
    }

    function handleRoutineDurationObjectsOnChange(e){
        setRoutineDurationObjects(e)
    }

    function handleRoutineNameOnChange(e){
        setRoutineName(e.target.value)
    }

    function handleRoutineDescriptionOnChange(e){
        setRoutineDescription(e.target.value)
    }

}


export default RoutineForm
import { Button, TextField } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import Select from 'react-select'
import {v4 as uuidv4} from 'uuid';
import {getObjects, getRoutines, getUserObjects, updateRoutines } from '../../services/api/index';
import ObjectLayout from '../ui/ObjectLayout/ObjectLayout';
import EventForm from './EventForm';
import StyledSelect from '../ui/Select/StyledSelect'
import StyledTextField from '../ui/TextField/StyledTextField'



const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "blue",
      color:"white",

    };
  },
  multiValueLabel: (styles, { data }) => {
    return {
      ...styles,
      color:"white",
      wordBreak:"break-all"

        
    };
  },

  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 5,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
        ...provided, 
            opacity, 
        transition ,
        backgroundColor:"white"
    };
  },
  container: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
        ...provided, 
            opacity, 
        transition ,
        backgroundColor:"white"
    };
  },
}

const RoutineForm = ({routine}) => {

    const [userObjects,setUserObjects]= useState()
    const [userObjectsSelectOptions,setUserObjectSelectOptions] = useState(null)
    const [routineEvent,setRoutineEvent]= useState(null)
    const [routineDurationObjects,setRoutineDurationObjects] = useState([])
    const [selectedRoutineDurationObjects,setSelectedRoutineDurationObjects]= useState([])
    const [durationText,setDurationText] = useState("")
    const [selectedObject,setSelectedObject]= useState(null)
    const [preObjects,setPreObjects] = useState(null)
    /* 
        {
            object:objectId,
            routineEvent:routineEvent,
            durationObjects:[
                {
                    id:id
                    parentIds(pre in duration objects)/[] activity of vertex DAG
                    object:objectId,
                    duration:duration
                }
            ]
        }
     */

    useEffect(() => {
        getUserObjects().then(data=>{
            setUserObjects(data)
            const objects = [...data.map((obj)=>{return {label:obj.name,value:obj.id}})]
            setUserObjectSelectOptions(objects)
        })
        

      return () => {
        
      }
    }, [])


    useEffect(() => {

      if(routine !== undefined){
            setRoutineDurationObjects(routine.durationObjects)
        }
      return () => {
        
      }
    }, [])


    function handleSelectedRoutineDurationObjectsOnChange(e){
        setSelectedRoutineDurationObjects(e)
    }

    function handleOnDurationTextOnChange(e){
        setDurationText(e.target.value)
        if(!validateInteger(e.target.value)){
            console.log("please choose integer")
            setDurationText("")
            return
        }
    }

    function isExistInSelectedRoutineObjects(objId){
        return [...selectedRoutineDurationObjects.filter((obj)=>obj.dObj.objectId === objId)].length > 0
    }

    function handleAddDurationObject(e){
        if(durationText.length === 0){
            console.log("no duration")
            return
        }
        if(!validateInteger(durationText)){
            console.log("please choose integer")
            return
        }
        if(selectedObject === undefined || selectedObject === null){
            console.log("please choose object")
            return
        }

        if (isExistInSelectedRoutineObjects(selectedObject.value)){
            console.log("obj already exists in routine")
            return
        }

        

        const durationObject = {
            id:uuidv4().toString(),
            duration:durationText,
            objectId:selectedObject.value,
            parentIds:[]
        }   




        if (preObjects !== null && preObjects.length > 0){
            durationObject["parentIds"]=[...preObjects.map((obj)=>obj.dObj.objectId)]
        }

        const testIfNoCircular = [...selectedRoutineDurationObjects.map((item)=>item.dObj),durationObject]
        //todo

        setRoutineDurationObjects((prev)=>[...prev,durationObject])
        setSelectedRoutineDurationObjects((prev)=>[...prev,{label:`OBJ:${selectedObject.label} ,DUR:${durationText} ,PRE: ${durationObject.parentIds.length > 0?durationObject.parentIds.map((objId)=>getObjectFromId(objId).name).join(","):"none"}`,value:durationObject.id,dObj:durationObject}])
        setPreObjects([])

    }

    function getObjectFromId(objId){
        const obj = userObjects.filter((obj)=>obj.id === objId)[0]
        if (obj !== undefined && obj !== null){
            return obj
        }
        return null
    }

    function handleSelectedObjectOnchange(e){
        setSelectedObject(e)
    }

    function getCurrentRoutine(){
        const dObjects = [...selectedRoutineDurationObjects.map((item)=>item.dObj)]
        const routine = {
            event:routineEvent,
            durationObjects:dObjects,
        }
        return routine
    }

    function handleSubmit(){
        const routine = getCurrentRoutine()
        console.log(routine)
        if(!validateRoutine(routine)){
            console.log("bad input")
        }else{
            console.log("NICE!")
            getRoutines().then(data=>{
                console.log(data)
                return data
            }).then(data=>{
                console.log(updateRoutines)
                updateRoutines([...data,routine])
            })
            
        }


    }

    function validateRoutine(routine){
        if(routine.event.title.length < 3){
            console.log("title too short")
            return false
        }
        return true
    }

    function getDurationObjectFromId(dObjectId){
        return routineDurationObjects.filter((dObj)=>dObj.id === dObjectId)[0]
    }

    function sortByDate(){

    }

    function handlePreObjectsOnChange(e){
        // e.filter((item)=>item.value=== selectedObject.value){
        // }
        setPreObjects(e)
    }






    function createNewEvent(){
    }


    function isExistGroup(){
    }

    function getResourceFromId(resourceId){
    }

    function handleUserRoutineOnChange(){
    }

    function validateInteger( strValue ) {
    /************************************************
    DESCRIPTION: Validates that a string contains only
        valid integer number.

    PARAMETERS:
      strValue - String to be tested for validity

    RETURNS:
      True if valid, otherwise false.
    **************************************************/
      var objRegExp  = /(^-?\d\d*$)/;  

      //check for integer characters
      return objRegExp.test(strValue);
    }

    function handleRoutineEventOnChange(routineEvent){
        setRoutineEvent((prev)=>routineEvent)
    }

  return (
    <div style={{backgroundColor:"gray" , overflowY:"auto", maxHeight:"800px"}}>
        <div style={{fontSize:"25px"}}>Routine</div>

        <div className='routineEvent' style={{border:"1px solid black"}}>
            routine Event:
            <EventForm isRoutine={true} setRoutineEvent={handleRoutineEventOnChange}/>
        </div>
        <div style={{height:"20px"}}>
        </div>

        <div className='chosenObjects for routine'>
            <StyledSelect label={"objects:"} isMulti values={selectedRoutineDurationObjects} handleChange={handleSelectedRoutineDurationObjectsOnChange} placeholder={"current routine Objects-add below"}/>
        </div>

        <div style={{height:"20px"}}>
        </div>

        <div className='duration_object_with_preq' style={{border:"1px solid black", padding:"10px"}}>
                <div>
                        object:
                        <Select styles={customSelectStyles} value={selectedObject} options={userObjectsSelectOptions} onChange={handleSelectedObjectOnchange} placeholder={"object"}/>
                </div>
                <div>
                    duration in minutes:
                    <TextField  value={durationText} onChange={handleOnDurationTextOnChange} variant="filled" style={{backgroundColor:"gray", color:"black"}}/>
                </div>
                <div>
                    {/* {routineDurationObjects !== null && routineDurationObjects !== undefined && routineDurationObjects.length > 0 && (  )} */}
                    <div>
                    prereq objects within those:
                    <Select styles={customSelectStyles} isMulti value={preObjects} options={selectedRoutineDurationObjects} onChange={handlePreObjectsOnChange} placeholder={"pre-objects"}/>
                    </div>
                  
                </div>

            <Button style={{backgroundColor:"black", color:"red"}} onClick={handleAddDurationObject}>Add object</Button>
        </div>



        {selectedRoutineDurationObjects !== null && selectedRoutineDurationObjects.map((dObj)=>{
            return(
            <div className='selectedObjectLayout' style={{overflowY:"scroll"}}>
                <div>
                    duration:{dObj.dObj.duration}
                </div>   
                <div>
                    prereq:
                        {/* {dObj.dObj.parentIds.map((dObj)=>{
                            return (<div key={`${dObj.id}parent`}>{getObjectFromId(dObj.objectId).name}</div>)
                        })} */}
                </div>
                <div>
                        <ObjectLayout object={getObjectFromId(dObj.dObj.objectId)}/>
                </div>
                {/* <div className='Prereq'>
                    {dObj.parentIds.map((objId)=>getObjFromId(objId)).map((obj)=>{
                        //obj list modal with edit maybe
                    })}
                </div> */}
            </div>)
        })}

        <div className='routineOrderShowCase'>


        </div>


        <div className='submit'>
        <Button onClick={handleSubmit}>submit</Button>
        </div>
    </div>
  )
}


const CreateRoutinewithDate=({})=>{
}


const EventLayoutForm = ({routineEvent,setRoutineEvent}) => {
    const [eventTitle,setEventTitle] = useState()
    const [duration,setDuration] = useState()
    const [bgColor,setBgColor] = useState(null)

    const [objectId,setObjectId] = useState()
    const [userObjectsSelectOptions,setUserObjectSelectOptions] = useState(null)

    useEffect(() => {
        getObjects().then(data=>{
            const objects = [...data.map((obj)=>{return {label:obj.name,value:obj.id}})]
            setUserObjectSelectOptions(objects)
        })
    return () => {
        
    }
    }, [])

  return (
    <div>RoutineForm</div>
  )
};



export default RoutineForm
import React,{useState,useEffect} from 'react'
import { v4 as uuidv4} from 'uuid'
import './DurationObjectForm.css'
import { arraysEqual, toLabelValueItemJson, validateInteger } from '../../../utils/helpers'
import StyledButton from '../../ui/Button/StyledButton'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import AssignPropertyForm from '../Property/AssignPropertyForm'
import { getUserObjects } from '../../../services/api/index'
import {isCyclic,adjacencyListMapToEdges,edgesToAdjacencyListMap,reverseEdges,toAdjacencyListMap,topologicalSort,tsort} from '../../../utils/graphs'
import LevelsView from './LevelsView/LevelsView'
import DObj from './DObj/DObj'

const DurationObjectForm = (props) => {

    // const {durationObject, handleChange,handleAdd, properties,parentsOptions, objects} = props
    const {durationObjects, onChange, routineProperties, routineTags} = props

    const [propertiesOptions,setPropertiesOptions]  = useState([])
    const [userObjects,setUserObjects]= useState([])

    const [durationObjectsOptions,setDurationObjectsOptions]= useState([])
    const [objectsOptions,setObjectsOptions] = useState([])
    const [durationObjectParentsOptions,setDurationObjectParentsOptions] = useState([])

    const [selectedObject,setSelectedObject]= useState(null)
    const [duration,setDuration] = useState("")
    const [durationObjectProperties,setDurationObjectProperties] = useState([])
    const [durationObjectParents,setDurationObjectParents] = useState([])
    const [selectedDurationObjects,setSelectedDurationObjects] = useState([])

    const [sortedDobjects,setSortedDObjects] = useState([])

    // useEffect(() => {
    //     const currentDurationObject = getCurrentDurationObject()
    //     if(validateDurationObject(currentDurationObject)){
    //         handleChange(currentDurationObject)
    //         console.log("current d obj =",currentDurationObject)
    //     }else{
    //         console.log("duration obj currently not valid")
    //     }
        
    // }, [selectedObject,duration])

    // useEffect(() => {
    //     if(durationObject!== null && durationObject!== undefined){
    //         console.log(userObjects)
    //         const userObjectsList = userObjects.map((item)=>item.item)
    //         const obj = [...userObjectsList.filter((obj)=>obj.id === durationObject.objectId)][0]
    //         setSelectedObject(toLabelValueItemJson(obj))
    //         const parents = [...durationObject.parentIds.map((parentId)=>{
    //                             return [...userObjectsList.filter((obj)=>obj.id === parentId)][0]
    //                         })]
    //         console.log(parents)
    //         setObjectParents(toLabelValueItemJson(parents))
            

    //         setDuration(durationObject.duration)
    //     }
        
    //   return () => {
        
    //   }
    // }, [durationObject])


    // useEffect(() => {

        
    //   return () => {
    //   }
    // }, [routineTags])

    // function getCurrentDurationObject(){

    //     const currentDurationObject = {
    //         id:uuidv4().toString(),
    //         objectId:null,
    //         duration:duration,
    //         properties: durationObjectProperties,
    //         parentIds:[]
    //     } 
    //     let parentLength = 0
        
    //     if (objectParents !== null && objectParents !== undefined && objectParents.length > 0){
    //         const ids = [...objectParents.map((item)=>item.item).map((obj)=>obj.id)]
    //         currentDurationObject['parentIds'] = ids    
    //         parentLength = ids.length

    //     }

    //     if(selectedObject !== null && selectedObject !== undefined && selectedObject.item !== undefined){
    //         currentDurationObject['objectId'] = selectedObject.item.id
    //         const p = currentDurationObject['parentIds']
            
    //         currentDurationObject['name'] = `${selectedObject.item.name}`
    //     }

    //     if(durationObject!== null && durationObject !== undefined){
    //         currentDurationObject['id'] = durationObject.id
    //         currentDurationObject['name'] =`${durationObject.name}` 
    //     }
    //     return currentDurationObject
    // }

    // function validateDurationObject(curDurationObject){
    //     if(curDurationObject === null){
    //         console.log("duration obj cannot be null")
    //         return false
    //     }
    //     if(curDurationObject === undefined){
    //         console.log("duration obj cannot be undefined")
    //         return false
    //     }
    //     if(curDurationObject.objectId === null){
    //         console.log("duration obj , obj cannot be null")
    //         return false
    //     }
    //     if(curDurationObject.objectId === undefined){
    //         console.log("duration obj , obj cannot be undefined")
    //         return false
    //     }
    //     if(curDurationObject.duration === ""){
    //         console.log("duration obj , duration cannot be empty")
    //         return false
    //     }
        
    //     if(arraysEqual(curDurationObject.properties,properties)){
    //         console.log("duration obj , duration cannot be empty")
    //         return false
    //     }
    //     return true
    // }

    // function handleAddOnCall(e){
    //     const currentDurationObject = getCurrentDurationObject()
    //     if(validateDurationObject(currentDurationObject)){
    //         handleAdd(currentDurationObject)    
    //         console.log("updated/created duration obj!") 
    //         setSelectedObject(null)
    //         setDuration("")
    //         setObjectParents(null)
    //         return
    //     }
    //     console.log("invalid duration object") 

    // }
    useEffect(() => {
       fetchObjects()
    }, [])

    useEffect(() => {
        setDurationObjectParentsOptions(selectedDurationObjects)
        if(selectedDurationObjects !== null && selectedDurationObjects !== undefined && selectedDurationObjects.length > 0){
            setSortedDObjects(getTopologicalSort(selectedDurationObjects.map((item)=>item.item)))
        }

    }, [selectedDurationObjects])

    // useEffect(() => {
    //     if(durationObjects !== null && durationObjects !== undefined && durationObjects.length > 0){
    //         const options = [toLabelValueItemJson("new"),...toLabelValueItemJson(durationObjects)]
    //         setDurationObjectsOptions(options)
    //     }else{
    //         const options = [toLabelValueItemJson("new")]
    //         setDurationObjectsOptions(options)
    //         // setSelectedDurationObject(toLabelValueItemJson("new"))
    //     }
        

    // }, [durationObjects])

    // useEffect(() => {
    //     if(selectedDurationObject !== null && selectedDurationObject !== undefined && selectedDurationObject.label !== "new"){
    //         console.log("dDSADSADSu")
            
    //         const dObj = selectedDurationObject.item
    //         console.log("du",dObj)
    //         const parentIds = [...dObj.parentsIds]
 
    //         // const parentsDObjects = [...parentIds.map((parentId)=>[...selectedDurationObjects.filter((item)=>item.item.id === parentId)][0])]
    //         //  toLabelValueItemJson(parentsDObjects)

    //         const dobjParents = [...durationObjectsOptions.filter((item)=>parentIds.includes(item.item.id))]
    //         console.log("daparent",dobjParents)
    //         setSelectedObject(toLabelValueItemJson(dObj.object))
    //         setDuration(dObj.duration)
    //         setDurationObjectParents(dobjParents)
    //         setDurationObjectProperties(dObj.properties)
    //     }else{
    //         setSelectedObject(null)
    //         setDuration("")
    //         setDurationObjectParents(null)
    //         setDurationObjectProperties(null)
    //     }
    // }, [selectedDurationObject])
    useEffect(() => {
        setDuration("")
        setDurationObjectParents([])
        setSelectedDurationObjects([])
        setSelectedObject(null)
        setDurationObjectProperties(null)
        setSortedDObjects([])

    }, [routineTags,routineProperties])

    useEffect(() => {
        if(userObjects !== null && userObjects !== undefined && routineTags !== null && routineTags !== undefined){
            setObjectsOptions(toLabelValueItemJson(filterObjects(userObjects,routineTags.map((item)=>item.item))))
        }
    }, [routineTags])

    useEffect(() => {
        if(routineProperties !== null && routineProperties !== undefined && routineProperties.length > 0){
            setDurationObjectProperties(routineProperties)
        }
    }, [routineProperties])

    function fetchObjects(){
        getUserObjects().then(data=>{
            setUserObjects(data)
            if(routineTags !== null && routineTags !== undefined && routineTags.length > 0){
                setObjectsOptions(toLabelValueItemJson(filterObjects(data,routineTags.map((item)=>item.item))))
            }else{
                setObjectsOptions(toLabelValueItemJson(data))
            }
            
        })
    }

    function filterObjects(objs,tags){
        const tagsIds = [...tags.map((tag)=>tag.id)]
        const filteredObjs =  [...objs.filter((obj)=>{
            const objTagsIds = [...obj.tags.map((tag)=>tag.id)]
            const tagslength = tagsIds.length
            return tagsIds.filter((tagId)=>objTagsIds.includes(tagId)).length === tagslength
        })]
        return filteredObjs
    }




    function getCurrentDurationObject(){
        const dObj={
            id:`duration${selectedObject?.item.id}`,
            name:`duration:${selectedObject?.item.name}`,
            state:{},
            config:{},
            objectId:selectedObject?.item.id,
            duration:duration,
            properties:[...durationObjectProperties?durationObjectProperties.map((prop)=>{return { propertyId:prop.id ,value:prop.value}}):[]],
            parentsIds:[...durationObjectParents?durationObjectParents.map((item)=>item.item.id):[]],
        }
        // if(selectedDurationObject !== null && selectedDurationObject !== undefined && selectedDurationObject.label !== "new"){
        //     dObj['id'] = selectedDurationObject.item.id
        // }
        return dObj
    }

    function handleCreateDurationObject(){
        const currentDObj = getCurrentDurationObject()
        if(validateDurationObject(currentDObj)){
            if(window.confirm("create?")){
                setDurationObjectParentsOptions([...durationObjectParentsOptions,toLabelValueItemJson(currentDObj)])
                onChange([...durationObjects,currentDObj])
                console.log("test",selectedDurationObjects)
                setSelectedDurationObjects([...selectedDurationObjects,toLabelValueItemJson(currentDObj)])
            }
            
            
            
        }else{
            console.log("dObj:create:fail to validate")
        }
        
    }

    function handleUpdateDurationObject(){
        const currentDObj = getCurrentDurationObject()
        if(validateDurationObject(currentDObj)){
            const newDObjs = [...durationObjectParentsOptions.map((item)=>item).map((dObj)=>{
                if(dObj.id === currentDObj.id){
                    return currentDObj
                }
                return dObj
            })]
            setDurationObjectParentsOptions(toLabelValueItemJson(newDObjs))
            onChange(newDObjs)
        }else{
            console.log("dObj:update:fail to validate")
        }
    }

    function validateDurationObject(currentDObj){
        console.log("currentDobj",currentDObj)
        
        if(currentDObj.name === null){
            console.log("dobj:name:null")
            return false
        }
        if(currentDObj === null){
            console.log("dobj:null")
            return false
        }
        if(currentDObj === undefined){
            console.log("dobj:undefined")
            return false
        }
        if(currentDObj.objectId === null){
            console.log("dobj:objID :null")
            return false
        }
        if(currentDObj.objectId === undefined){
            console.log("dobj:objID:undefined")
            return false
        }
        if(currentDObj.parentsIds === null){
            console.log("dobj:parentsIds:null")
            return false
        }
        if(currentDObj.parentsIds === undefined){
            console.log("dobj:parentsIds:undefined")
            return false
        }
        if(currentDObj.properties === null){
            console.log("dobj:props:null")
            return false
        }
        if(currentDObj.properties === undefined){
            console.log("dobj:props:undefined")
            return false
        }
        if(currentDObj.properties.length < routineProperties.length){
            console.log("dobj: not filled all properties")
            return false
        }
        if(currentDObj.duration === undefined){
            console.log("dobj:duration:undefined")
            return false
        }
        if(currentDObj.duration === null){
            console.log("dobj:duration:null")
            return false
        }
        if(currentDObj.duration === ""){
            console.log("dobj:duration:empty")
            return false
        }
        if(parseInt(currentDObj.duration) < 1){
            console.log("dobj:duration:under 1 min")
            return false
        }
        if(parseInt(currentDObj.duration) > 30){
            console.log("dobj:duration:too long  , d = 30 minutes")
            return false
        }
        const objectIds = [...selectedDurationObjects.map((item)=>item.item.objectId)]
        if (objectIds.includes(currentDObj.objectId)){
            console.log("dobj:obj:exists already")
            return false
        }

        const propsValues = currentDObj.properties.map((prop)=>prop.value)

        if(propsValues.includes(null)){
            console.log("dobj: some prop null")
            return false
        }
        if(propsValues.includes(undefined)){
            console.log("dobj: some prop undefined")
            return false
        }

        
        if(currentDObj.parentsIds.includes(currentDObj.id)){
            console.log("cannot choose self")
            return
        }

        let durationObjectsMap = []
        if(selectedDurationObjects.length > 0 && selectedDurationObjects.map((item)=>item.item.id).includes(currentDObj.id)){
            const arr = selectedDurationObjects.map((item)=>item.item.id === currentDObj.id ? currentDObj : item.item)
            durationObjectsMap = getTopologicalSort(arr)
        }else{
            durationObjectsMap = getTopologicalSort([...selectedDurationObjects.map((item)=>item.item),currentDObj])
        } 
        const cycle = isCyclic(durationObjectsMap)
        if(cycle === true){
            console.log("dObj:fail:dObj causes Cycle")
            return false    
        }
        return true
    }




    // function handleUpdateDurationObject(currentDurationObject){
    //     const durationObjects = routineDurationObjects.map((item)=>item.item)
    //     const durationObjectsWithoutOldDurationObj = [...durationObjects.filter((dObj)=>dObj.id !== currentDurationObject.id)]

    //     const newDurationObjects = [...durationObjectsWithoutOldDurationObj,currentDurationObject]
    //     const durationObjectsMap = getCurrentDurationObjectGraph(newDurationObjects)
    //     const n = isCyclic(durationObjectsMap)
    //     console.log(n,"IS THE ANSWER")
    //     if(n === true){
    //         console.log("FAIL - updated duration object cause cycle")
    //     }
    //     if(n === false){
    //         setRoutineDurationObjects(toLabelValueItemJson(newDurationObjects))
    //         setSelectedRoutineDurationObjects([...selectedRoutineDurationObjects.map((item)=>item.item).filter((dobj)=>dobj.id !== currentDurationObject.id)])
    //         setSelectedDurationObject(toLabelValueItemJson("new"))
    //         console.log("succsefuly updated duration obj")
    //     }

    
    // }

    function getTopologicalSort(durationObjects){
        let data = reverseEdges(adjacencyListMapToEdges(toAdjacencyListMap(durationObjects,"id","parentsIds")))
        console.log("d",durationObjects)
        const sortedData = tsort(data)
        const normalSortedData = sortedData.map((item)=>{
            if(item.id === '-1'){
                return item
            }else{
                const dobj =  [...durationObjects.filter((dobj)=>dobj.id === item.id)][0] 
                dobj['level'] = item.level
                return dobj
            }
        })
        return normalSortedData
    }

    // function handleCreateDurationObject(currentDurationObject){
    //     const durationObjects = routineDurationObjects.map((item)=>item.item)
    //     if([...durationObjects.map((dObj)=>dObj.name)].includes(currentDurationObject.name)){
    //         console.log("cannot add same object")
    //         return
    //     }
    //     const newDurationObjects = [...durationObjects,currentDurationObject]
    //     const durationObjectsMap = getCurrentDurationObjectGraph(newDurationObjects)
    //     console.log("TEST ASNWER", durationObjectsMap,"")

    //     const n = isCyclic(durationObjectsMap)

    //     console.log(n,"IS THE ANSWER")
    //     if(n === false){
    //         console.log("duraiton routine",routineDurationObjects)
    //         setRoutineDurationObjects([...routineDurationObjects,toLabelValueItemJson(currentDurationObject)])
    //     }
    // }

    function printTop(){
        if(selectedDurationObjects.length > 0 && selectedDurationObjects !== null && selectedDurationObjects !== undefined){
            const reversedAdjacencyList = getTopologicalSort(selectedDurationObjects.map((item)=>item.item))
            console.log(reversedAdjacencyList)
            return reversedAdjacencyList
            
        }else{
            console.log("fail requirment for topology print")
        }
        return null
   
    }

  return (
    <div>
        <h3>duration object:</h3>
        <StyledSelect isMulti label={"duration Objects"} values={selectedDurationObjects} options={[]} handleChange={handleSelectedDurationObjectsOnChange} placeholder={"selected duration obj"}/>
        {/* <StyledSelect label={"select duration obj:"} values={selectedDurationObject} options={durationObjectsOptions} handleChange={handleSelectedDurationObjectOnChange} placeholder={"selected duration obj"}/> */}
        <StyledSelect label={"object:"} values={selectedObject} options={objectsOptions} handleChange={handleSelectedObjectOnChange} placeholder={"object"}/>
        <StyledTextField label={"duration in minutes"}  value={duration} handleChange={handleOnDurationOnChange} variant="filled"/>
        <StyledSelect label={"parents objects"} isMulti values={durationObjectParents} options={durationObjectParentsOptions} handleChange={handleDurationObjectParentsOnChange} placeholder={"object"}/>
        routine:
        duration prop prop :
        <StyledButton name={"create duration obj"} handleOnClick={handleCreateDurationObject}/>
  
        {(routineProperties.length > 0 ? ( 
        <AssignPropertyForm onChange={handleDurationObjectPropertiesOnChange} properties={durationObjectProperties} propertiesOptions={routineProperties} />
        ):null)}
        <div>
        lvl view:
        <LevelsView data={sortedDobjects} component={DObj} />
            
        </div>
        <StyledButton name={"test print top"} handleOnClick={printTop}/>

    </div>
  )

    // function handleSelectedDurationObjectOnChange(e){
    //     setSelectedDurationObject(e)
    // }

    function handleSelectedObjectOnChange(e){
        setSelectedObject(e)
    }


    function handleOnDurationOnChange(e){
        setDuration(e.target.value)
        if(!validateInteger(e.target.value)){
            console.log("please choose integer")
            setDuration("")
            return
        }
    }

    function handleDurationObjectPropertiesOnChange(e){
        setDurationObjectProperties(e)
    }

    function handleSelectedDurationObjectsOnChange(e){
        setSelectedDurationObjects(e)
    }

    function handleDurationObjectParentsOnChange(e){
        setDurationObjectParents(e)
    }


}
export default DurationObjectForm
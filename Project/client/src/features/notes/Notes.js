import React,{useState,useEffect} from 'react'
import ObjectModal from '../../components/Object/Modal/index'
import { ClassicObject } from '../../components/Object/ObjectLayout/index'
import StyledModal from '../../components/ui/Modal/StyledModal'
import StyledSelect from '../../components/ui/Select/StyledSelect'
import {getUserObjects, getUserObjectsByFeature,getUserGroups,updateUserGroup,createUserGroup } from '../../services/api/index'
import { toLabelValueItemJson } from '../../utils/helpers'
import './Notes.css'
import GroupForm from '../../components/form/Group/index'

const notesDefaultCategories = ["queue","test","urgent","later","continuesTasks"]

const Notes = () => {
    const [userObjects,setUserObjects]=useState([])
    const [userGroups,setUserGroups] = useState([])
    const [groupObjects,setGroupObjects] = useState([])
    const [selectedGroup,setSelectedGroup] = useState(null)
    

    function fetchObjects(){
        getUserObjects().then(data=>{
            setUserObjects(data)
        })
    }

    function fetchGroups(){
        getUserGroups().then(data=>{
            setUserGroups(toLabelValueItemJson(data))
        })
    }
    useEffect(() => {
        fetchGroups()
        fetchObjects()
    }, [])


    function handleSelectedGroupOnChange(e){
        setSelectedGroup(e)
    }

    function filterObjectsByGroup(groupName){
        return [...userObjects.filter((obj)=>[...obj.groups.map((group)=>group.name)].includes(groupName))]
    }

    useEffect(() => {
        if(selectedGroup!== null && selectedGroup !== undefined){
            setGroupObjects(filterObjectsByGroup(selectedGroup.item.name))
        }
    }, [selectedGroup])
    
    
  return (
    <div style={{backgroundColor:"gray",overflowY:"scroll", padding:"20px", height:"500px", width:"auto", border:"1px solid black"}}>
        <div>
            new obj:<ObjectModal />
        </div>
        <div>
            new group:
            <StyledModal>
                <GroupForm/>
            </StyledModal>
        </div>
        <StyledSelect handleChange={handleSelectedGroupOnChange}  label={"group"} values={selectedGroup} options={userGroups}/>
        <div>
            <div> objs: </div>
            <div>
                {groupObjects.map((item)=>{
                    return (
                        <div key={item.label}>
                            <ClassicObject object={item.item}/>
                        </div>
                    );
                })}
            </div>
        </div>

    </div>

  )
}

export default Notes
import React,{useEffect,useState} from 'react'
import { deleteUserGroup, getUserGroups , updateUserGroup,createUserGroup } from '../../../services/api/index'
import { toLabelValueItemJson } from '../../../utils/helpers'
import StyledButton from '../../ui/Button'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import './GroupForm.css'

const GroupForm = () => {
    const [userGroups,setUserGroups] = useState([])
    const [groupName,setGroupName] = useState("")
    const [selectedGroup,setSelectedGroup] = useState(null)

    function fetchGroups(){
        getUserGroups().then(data=>{
            const userData = toLabelValueItemJson(data)
            const groups = [toLabelValueItemJson("new"),...userData]
            setUserGroups(groups)
        })
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    useEffect(() => {
        if(selectedGroup !== null && selectedGroup !== undefined && selectedGroup.label !== "new"){
            setGroupName(selectedGroup.item.name)
        }else{
            setGroupName("")
        }
    }, [selectedGroup])


    function handleCreateGroup(){
        const currentGroup = getCurrentGroup()
        if(validateGroup(currentGroup)){
            if(isGroupNameExists(currentGroup.name)){
                console.log("group:fail:exists already")
                return
            }
            if(window.confirm("create?")){
                createUserGroup(currentGroup).then(data=>{
                    fetchGroups()
                })
                setSelectedGroup(toLabelValueItemJson(currentGroup))
            }
        }
    }

    function handleDeleteGroup(){
        const currentGroup = getCurrentGroup()
        if(window.confirm("delete?")){
            deleteUserGroup(currentGroup).then(data=>{
                    fetchGroups()
                })
            setSelectedGroup(toLabelValueItemJson("new"))
        }
        
    }

    function handleUpdateGroup(){
        const currentGroup = getCurrentGroup()
        if(validateGroup(currentGroup)){
            if(isGroupNameExists(currentGroup.name)){
                console.log("group:fail:exists name or,same group dont need update")
                return 
            }
            if(window.confirm("update?")){
                updateUserGroup(currentGroup).then(data=>{
                    fetchGroups()
                })
                setSelectedGroup(null)
                
            }
        }

    }

    function getCurrentGroup(){
        let currentGroup = {
            name:groupName,
        }
        if(selectedGroup !== null && selectedGroup !== undefined && selectedGroup.label !== "new"){
            currentGroup['id'] = selectedGroup.item.id
        }
        return currentGroup
    }

    function validateGroup(currentGroup){
        if(currentGroup.name === null){
            console.log("group:fail:name:null")
            return false
        }
        if(currentGroup.name === undefined){
            console.log("group:fail:name:undefined")
            return false
        }
        if(currentGroup.name.length === 0){
            console.log("group:fail:name:length:0")
            return false
        }
        if(currentGroup.name.length > 25){
            console.log("group:fail:name:length > 25")
            return false
        }
        if(currentGroup.name.length < 3){
            console.log("group:fail:name:length: < 3")
            return false
        }

        return true
    }

    function isGroupNameExists(groupName){
        const allGroupNames = [...userGroups.filter((item)=>item.label !== "new").map((item)=>item.item.name)]
        return allGroupNames.includes(groupName)
    }


  return (
    <div>
        <StyledSelect handleChange={handleSelectedGroupOnChange} label={"select group:"} options={userGroups} values={selectedGroup} />

        <StyledTextField  handleChange={handleGroupNameOnChange} value={groupName} label={"name"} />
        {(selectedGroup !== null && selectedGroup !== undefined && selectedGroup.label !== "new") ? (
        <div>
            <StyledButton name={"update"} handleOnClick={handleUpdateGroup} />
            <StyledButton name={"delete"} handleOnClick={handleDeleteGroup} />
        </div>
        ):(
        <div>
            <StyledButton name={"create"} handleOnClick={handleCreateGroup} />
        </div>)}
            
    </div>
  )

    function handleGroupNameOnChange(e){
        setGroupName(e.target.value)
    }

    function handleSelectedGroupOnChange(e){
        setSelectedGroup(e)
    }
}

export default GroupForm
import React, { useState,useEffect } from 'react'
import DataTree from '../../../../components/ui/Tree/DataTree/DataTree'
import StyledTabs from '../../../../components/ui/Tabs/StyledTabs'
import StyledTabPanel from '../../../../components/ui/Tabs/TabPanel/StyledTabPanel'
import {createUserCategory, deleteUserCategory, getUserCategoriesByFeature,getUserCategoriesByFeatureGroup,getUserCategoriesGroupsByFeature} from '../../../../services/api/index'
import './CategoryTree.css'
import {toLabelValueItemJson} from '../../../../utils/helpers';
import StyledButton from '../../../../components/ui/Button/StyledButton'
import StyledTextField from '../../../../components/ui/InputField/TextField/StyledTextField'

const forbiddenNames = ["wiki","scheduler","notes","console","settings","group","graph","flow"]

const CategoryTree = ({isEdit}) => {
    const [categoryName,setCategoryName] = useState("")
    const [groupName,setGroupName] = useState("")
    const [userWikiCategoriesGroups,setUserWikiCategoriesGroups] = useState(null)
    const [selectedCategory,setSelectedCategory] = useState(null)
    const [userGroupCategories, setUserGroupCategories] = useState(null)
    const [selectedGroup,setSelectedGroup] = useState(0)


    function handleCategoryNameOnChange(e){
        setCategoryName(e.target.value)
    }

    function handleGroupNameOnChange(e){
        setGroupName(e.target.value)
    }

    function handleSetSelectedGroup(tab){
        setSelectedGroup(tab)
        fetchGroupCategories(userWikiCategoriesGroups[selectedGroup])
    }

    function handleSetSelectedCategory(categoryId){
        setSelectedCategory(categoryId)
    }

    function validateCategory(category){
        const categoryName = category.name
        if(forbiddenNames.includes(categoryName)){
            console.log("forbidden category name")
            return false
        }
        if(categoryName.length > 15){
            console.log("category name length too long")
            return false
        }
        if(categoryName.length < 3){
            console.log("category name length too short")
            return false
        }
        if([...userGroupCategories.map((category)=>category.group)].includes(categoryName)){
            console.log("category name already exists")
            return false
        }
        return true
    }

    function validateGroup(groupName){
        if(forbiddenNames.includes(groupName)){
            console.log("forbidden group name")
            return false
        }
        if(groupName.length > 15){
            console.log("group name length too long")
            return false
        }
        if(groupName.length < 3){
            console.log("group name length too short")
            return false
        }
        if(userWikiCategoriesGroups.includes(groupName)){
            console.log("group name already exists")
            return false
        }
        return true

    }

    function fetchGroups(){
        getUserCategoriesGroupsByFeature("wiki").then(data=>{
            setUserWikiCategoriesGroups(data)
            fetchGroupCategories(data[0])
            setSelectedGroup(0)
        })
    }

    function fetchGroupCategories(group){
        if(group !== null && group !== undefined){
            getUserCategoriesByFeatureGroup("wiki",group).then(data=>{
                setUserGroupCategories(data)
            })
        }
    }

    useEffect(() => {
        
        fetchGroups()
        
    }, [])

    function handleAddOnClick(id){
        const newCategory = {name:categoryName,parentId:id ,hasChildren:false,group:userWikiCategoriesGroups[selectedGroup],feature:"wiki",objectId:null,groupOnly:null}
        if(validateCategory(newCategory)){
            if(window.confirm("create category")){
                createUserCategory(newCategory)
                fetchGroupCategories(userWikiCategoriesGroups[selectedGroup])
                console.log("created category!")
                return
            }
        }
        console.log("failed to create category")



    }

    function handleRemoveOnClick(id){
        deleteUserCategory({id:id})
        fetchGroupCategories(userWikiCategoriesGroups[selectedGroup])
    }

    function handleAddGroupOnClick(){
        if(validateGroup(groupName)){
            if ( window.confirm("create group?")){
                setUserWikiCategoriesGroups([...userWikiCategoriesGroups,groupName])        
                setSelectedGroup(userWikiCategoriesGroups[selectedGroup])         
                return
            }
        }
        console.log("failed to create group")
        
    }
    
    function getCategoryIdByName(name){
        return [...userGroupCategories.filter((item)=>item.name===name)][0].id
    }

  return (
    <div className='containerDiv'>
        {(userWikiCategoriesGroups !== undefined && userWikiCategoriesGroups !== null && userGroupCategories !== null && userGroupCategories !== undefined)&&(
            <div className='textfields'>
                
                <StyledTextField label={"delete or create category"} placeholder={"new category"} value={categoryName}  handleChange={handleCategoryNameOnChange}/>

                {(isEdit === true && (
                <div>
                    <StyledTextField label={"new group"} placeholder={"new group"} value={groupName}  handleChange={handleGroupNameOnChange}/>
                    <StyledButton name={"add group"} handleOnClick={handleAddGroupOnClick}/>
                    <StyledButton name={"add parent category"} handleOnClick={(e)=>handleAddOnClick(0)}/>
                    <StyledButton name={"remove parent category"} handleOnClick={(e)=>handleRemoveOnClick(getCategoryIdByName(categoryName))}/>
                </div>))}

                <div className='tabs'>
                <StyledTabs  tabsOptions={userWikiCategoriesGroups} handleChange={handleSetSelectedGroup}/>
                <StyledTabPanel value={selectedGroup} >
                    <DataTree isEdit={isEdit} treeData={userGroupCategories} selectedItem={selectedCategory} handleSetSelectedItem={handleSetSelectedCategory} handleAddOnClick={handleAddOnClick} handleRemoveOnClick={handleRemoveOnClick} />):(
                </StyledTabPanel>
                </div>          
            </div>
        )}
    </div>
  )

}

export default CategoryTree
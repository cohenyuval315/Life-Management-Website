import React,{useState,useEffect} from 'react'

import { Button, List, ListItem, Tab, Tabs, TextField } from '@mui/material';

import StyledTextField from '../../../../components/ui/TextField/StyledTextField';
import StyledButton from '../../../../components/ui/Button/StyledButton'
import StyledTabs from '../../../../components/ui/Tabs/StyledTabs'
import StyledTabPanel from '../../../../components/ui/TabPanel/StyledTabPanel'
import StyledSelect from '../../../../components/ui/Select/StyledSelect'

import { ClassicObject } from '../../../../components/Object/ObjectLayout/index';



import {getUserCategoriesByFeature,getUserCategoriesGroupsByFeature,getUserObjectsByFeature, updateUserObject} from '../../../../services/api/index'
import {createUserCategory,deleteUserCategory,updateUserCategory} from '../../../../services/api/index';
import './Wiki.css'

import DataTree from '../../../../components/ui/DataTree/DataTree';
import { toLabelValueItemJson } from '../../../../utils/helpers';

const forbiddenNames = ["wiki","scheduler","notes","console","settings","group","graph","flow"]

const Wiki = () => {
    const [categoryName,setCategoryName] = useState("")
    const [groupName,setGroupName] = useState("") 

    const [selectedCategory,setSelectedCategory] = useState(null);

    const [selectedObject,setSelectedObject] = useState(toLabelValueItemJson("none"));

    const [categories,setCategories] = useState([]);
    const [categoriesGroups,setCategoriesGroups] = useState([]);


    const [userObjects,setUserObjects] = useState([]);
  
    const [selectedGroup,setSelectedGroup] = useState(0)

     const [isEdit,setIsEdit]= useState(false)

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
          if(([...categories.filter((category)=>category.name === categoryName)].length > 0)){
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
        if(categoriesGroups.includes(groupName)){
            console.log("group name already exists")
            return false
        }
        return true

    }

    useEffect(
      () => {
        fetchObjects()

      },[selectedCategory])

    useEffect(
      () => {
        fetchObjects()
        fetchCategories()
        fetchGroups()
        

      },[])

    function fetchObjects(){
        getUserObjectsByFeature("wiki").then(data=>{
          setUserObjects(toLabelValueItemJson(data))
        })
    }

    function fetchCategories(){
        getUserCategoriesByFeature("wiki").then(data=>{
          setCategories(data)
        })
    }

    function fetchGroups(){
        getUserCategoriesGroupsByFeature("wiki").then(data=>{
          setCategoriesGroups(data)
        })
    }

    function getCatgegoryFromId(categoryId){
        console.log(categories,categoryId)
        const categoryFiltered = [...categories.filter((category)=>category.id === categoryId)]
        if(categoryFiltered.length > 0){
          return categoryFiltered[0]
        }
        console.log("cate",categoryFiltered)
        return categoryFiltered 
    }

    function getCategoriesByGroup(){
      return [...categories.filter((category)=>category.group === categoriesGroups[selectedGroup])]
    }

    function handleAddOnClick(id){
        const newCategory = {name:categoryName,parentId:id ,hasChildren:false,group:categoriesGroups[selectedGroup],feature:"wiki",objectId:null,groupOnly:null}
        if(validateCategory(newCategory)){
            if(window.confirm("create category")){
                if(id !== 0){
                  const parentCategory = getCatgegoryFromId(id)   
                  parentCategory["hasChildren"] = true
                  updateUserCategory(parentCategory)
                }
                createUserCategory(newCategory)
                fetchCategories()
                console.log("created category!")
                return
            }
        }
        console.log("failed to create category")


    }

    function handleRemoveOnClick(id){
        if(window.confirm("delete category?")){
          deleteUserCategory({id:id})
          const children = [...categories.filter((category)=>category.parentId === id)]
          children.map((child)=>deleteUserCategory({id:child.id}))
          fetchCategories()
        }
    }

    function handleAddGroupOnClick(){
        if(validateGroup(groupName)){
            if (window.confirm("create group?")){
                setCategoriesGroups([...categoriesGroups,groupName])           
                return
            }
        }
        console.log("failed to create group")
    }
    
    function addCategoryToObj(object){
        if(selectedCategory === null){
            return
        }
        if(!window.confirm("add category to obj?")){
            return
        }
        const obj = object.item
        const category = getCatgegoryFromId(selectedCategory.id)
        const objCategories = obj.categories 

        if ([...objCategories.filter((category)=>category.id == selectedCategory.id)].length === 0){
            obj.categories = [...objCategories,category]
            updateUserObject(obj)
            return
        }
        console.log("failed to add category to obj")

    }

    function deleteGroup(groupName){
      setCategoriesGroups([...categoriesGroups.filter((group)=>group!==groupName)])
      const toDeleteCategories =  [...categories.filter((category)=>category.group === groupName)]
      toDeleteCategories.map((category)=>deleteUserCategory(category))
      fetchGroups()
      fetchCategories()
    }

    function isCategoryObject(obj){
        return [...obj.categories.filter((category)=>category.id === selectedCategory.id)].length > 0 
    }

    function getCategoryObjects(){

        return [...userObjects.map((obj)=>obj.item).filter((obj)=>[...obj.categories.map((category)=>category.name)].includes(selectedCategory.name))]
    }
    return (

      <div style={{display:"inline-flex", padding:"10px"}}>
              <div style={{padding:"20px",paddingRight:"100px"}}>
                <StyledButton name={isEdit===false?"edit":"close"} handleOnClick={handleIsEditOnChange} />
                <StyledTabs tabsOptions={categoriesGroups} handleChange={handleSetSelectedGroupOnChange}/>
                <StyledTabPanel value={selectedGroup} index={selectedGroup}>
                    <DataTree treeData={getCategoriesByGroup()} selectedItem={selectedCategory} handleSetSelectedItem={handleSetSelectedCategoryOnChange} isEdit={isEdit} handleAddOnClick={handleAddOnClick} handleRemoveOnClick={handleRemoveOnClick} />
                </StyledTabPanel>
                {(isEdit === true && (
                <div>
                <StyledTextField label={"delete or create category"} placeholder={"new category"} value={categoryName}  handleChange={handleCategoryNameOnChange}/>
                <StyledTextField value={groupName} handleChange={handleGroupNameOnChange} placeholder={"group"} />
                <StyledButton name={"add group"} handleOnClick={handleAddGroupOnClick}/>
                <StyledButton name={"add parent category"} handleOnClick={(e)=>handleAddOnClick(0)}/>
                </div>))}
              </div>
              {(selectedCategory!==null)&&(userObjects !== null)&&(
                
                  <div style={{ padding:"20px", height:"700px",width:"500px",overflowY:"scroll"}}>
                      {getCategoryObjects().map((obj)=>{
                          return (
                            <div style={{ padding:"20px"}}>
                              <ClassicObject object={obj} styles={{backgroundColor:"#B9B49E",color:"#34282C",padding:"10px",border:"5px solid black" }} />
                            </div>
                          )
                      })}
                  </div>
              )}
            <div>

                {(selectedCategory!==null)&&(userObjects !== null)&&(
                  <div style={{overflowY:"auto", height:"500px", border: "1px solid black"}}>
                    <List>
                        {userObjects.map((obj)=>obj.item).map((obj)=>{
                          if (isCategoryObject(obj)){
                            return (
                              <div key={` object ${obj.name}`}>
                                  <ListItem>
                                      {obj.name}
                                  </ListItem>
                              </div>)
                          }
                            return null
                        })}
                    </List>
                  </div>
                )}

                {(userObjects!==null && userObjects !== undefined )&&(selectedCategory!==null && selectedCategory !== undefined)&&(
                <div style={{border: "1px solid",padding:"20px"}}>
                  <StyledSelect values={selectedObject}  handleChange={handleSetSelectObject} options={userObjects} /> 
                  <StyledButton handleOnClick={(e)=>addCategoryToObj(selectedObject)} name={"add to category"}/>
                </div>
                )}

            </div>


      </div>
    )

    function handleIsEditOnChange(){
        setIsEdit(!isEdit)
    }
    function handleSetSelectObject(e){
      setSelectedObject(e)
    }

    function handleSetSelectedGroupOnChange(newTab){
      setSelectedGroup(newTab)
    }

    function handleCategoryNameOnChange(e){
        setCategoryName(e.target.value)
    }

    function handleGroupNameOnChange(e){
        setGroupName(e.target.value)
    }

    function handleSetSelectedCategoryOnChange(id){
        setSelectedCategory(id)
    }

}




export default Wiki

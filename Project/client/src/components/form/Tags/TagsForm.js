import React,{useState,useEffect} from 'react'
import StyledSelect from '../../ui/Select/StyledSelect'
import StyledTextField from '../../ui/TextField/StyledTextField'
import StyledButton from '../../ui/Button/StyledButton'
import { getUserTags ,createUserTag, deleteUserTag} from '../../../services/api/index';
import { toLabelValueItemJson } from '../../../utils/helpers';
import { isExistItemInLabelValueItemArr } from '../../../utils/helpers'
import './TagsForm.css'

const TagsForm = () => {

    const [userTags,setUserTags] = useState([])
    const [tag,setTag] = useState({label:"new",value:"new",item:null})
    const [newTag,setNewTag] = useState("")

    const fetchData = async () => {
      getUserTags().then(data=>{
          setUserTags([{label:"new",value:"new",item:null},...toLabelValueItemJson(data)])
          })
    }

    useEffect(
      () => {
        fetchData()
      },[])

    
    function handleCreateTagOnClick(){
        if (validateTag(newTag)&&window.confirm("create tag ?")){
            const toCreateTag = {
                name:newTag,
            }
            createUserTag(toCreateTag)
            fetchData()
            console.log("created tag!")
            return
        }
        console.log("failed to create tag")
    }

    function handleDeleteTagOnClick(){

        if (!isExistTag(tag.label)){
            console.log("tag doesnt exists")
            return
        }
        if(!window.confirm("delete tag ?")){
          console.log("tag not deleted")
          return
        }
        deleteUserTag(tag.item)
        console.log("tag deleted!")
        setTag({label:"new", value:"new", item:null})
        fetchData()
      
    }


    function validateTag(tagName){
      if(tagName === null){
        console.log("tag is null")
        return false
      }
      if(tagName === undefined){
        console.log("tag is undefined")
        return false
      }
      if(tagName.length < 3){
        console.log("tag too short")
        return false
      }
      if(tagName.length > 49){
        console.log("tag too long")
        return false
      }
      if (isExistTag(tagName)){
          console.log("tag already exists")
          return false
      }

      return true
    }


    function isExistTag(tagName){
      if (isExistItemInLabelValueItemArr(userTags,"name",tagName)){
          return true
      }
      return false
    }


    return (
      <div>
          {(userTags !== undefined && userTags !== null)&&(
          <div>
              <StyledSelect values={tag} options={userTags} handleChange={handleTagSelectOnChange}/>
              <div>
                  <StyledTextField value={newTag} handleChange={handleTagTextOnChange} placeholder={"new tag"} variant="outlined"/>
              </div>
              {(tag.label === "new")?(
                <StyledButton name={"create"} handleOnClick={handleCreateTagOnClick}/>
              ):(
                <StyledButton name={"delete"} handleOnClick={handleDeleteTagOnClick}/>
              )}
              
          </div>
          )}
      </div>
    )

    function handleTagSelectOnChange(e){
        setTag(e)
    }

    function handleTagTextOnChange(e){
        setNewTag(e.target.value)
    }

}

export default TagsForm
import React,{useState} from 'react'
import StyledButton from '../../../../../components/ui/Button/StyledButton'
import StyledTextField from '../../../../../components/ui/TextField/StyledTextField'
import './CategoryForm.css'

const CategoryForm = () => {
  const [name,setName] = useState()

  function handleNameOnChange(e){
    setName(e.target.value)
  }

  function handleCreate(){
  }

  return (
    <div> 
      <StyledTextField label={"name"}  value={"name"} handleChange={handleNameOnChange}/>
      <StyledButton handleOnClick={handleCreate} name={"create"} />
    </div>
  )
}

export default CategoryForm
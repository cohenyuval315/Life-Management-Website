import { TextField } from '@material-ui/core'
import React from 'react'
import './StyledTextField.css'


const StyledTextField = ({label,value,handleChange, ...props}) => {

  function validateInteger(){
    
  }

  return (
    <div className='fieldContainer'>
      {(label !== undefined && label !== null) && (
      <div className='fieldLabel'>
        {label}
      </div>
      )}
      <div className='fieldValue'>
        <TextField value={value} onChange={handleChange} {...props}  /> 
      </div>
    </div>
  )
}

export default StyledTextField
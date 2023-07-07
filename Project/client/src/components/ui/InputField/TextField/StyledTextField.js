import { TextField } from '@mui/material'
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
        <TextField  color="secondary" value={value} onChange={handleChange} {...props}   inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }} /> 
      </div>
    </div>
  )
}

export default StyledTextField
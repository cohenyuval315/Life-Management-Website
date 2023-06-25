import { Button } from '@material-ui/core'
import React from 'react'
import './StyledButton.css'

const defaultStyles = {
    backgroundColor:"black",
    color:"white"
}

const StyledButton = ({handleOnClick,name,styles,...props}) => {
  return (
    <div className='buttonContainer' >
      <Button style={{...defaultStyles,...styles}} className='styleButton' onClick={handleOnClick} {...props}>{name}</Button>
    </div>
  )
}

export default StyledButton
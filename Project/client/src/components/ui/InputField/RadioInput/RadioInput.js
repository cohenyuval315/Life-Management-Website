import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const RadioInput = ({isSelected,value,handleChange}) => {

    function handleRadioOnChange(e){
        handleChange(e)
    }

  return (
        <div className=''>
            <input checked={isSelected} value={value} onChange={handleRadioOnChange} id={uuidv4().toString()} type="radio"/>
        </div>
  )
}

export default RadioInput
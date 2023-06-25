import React from 'react'
import { useState } from 'react'
import { Icons } from '../../../assets/index.js'


const MenuDropDown = () => {
    const [isOpen,setIsOpen] = useState(false)
  return (
    <div className="dropdown">
    <button className="" onClick={()=>setIsOpen(!isOpen)}>
         {Icons.Bars}
    </button>
        {isOpen&&(
            <div className="dropdown-content">
                <div className='dropdown-content-item'>ye1</div>
                <div className='dropdown-content-item'>ye2</div>
                <div className='dropdown-content-item'>ye3</div>
            </div>
        )}
    </div>
  )
}

export default MenuDropDown
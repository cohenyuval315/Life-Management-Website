import React, { useEffect, useState } from 'react'
import {TwitterPicker} from 'react-color'
import './ColorSelect.css'

const colorOptions = [ 
    "#fbecc6","#fee1e8","#ffffdb","#dbe6db","#f0ecec","#bec6eb","#f3dbbe","#cddeef","#ffc9cc","#fcf2f3","#f3b0c3","#ecd5e3",
    "#f7f9f8","#b5cbcc","#d5defd","#ba68c8","#f47373","#d9e3f0","#ff8a65","#d4c4fb","#a1887f","#f44336","#3f51b5",
    "#9900EF","#F78DA7","#EB144C","#ABB8C3","#0693E3","#8ED1FC","#00D084","#7BDCB5","#FCB900","#FF6900","#e91e63","#006b76"

]



const ColorSelect = ({label ,value, onChange}) => {

    const [open, setOpen] = useState(false)
    const [color,setColor] = useState(value)

    function handleColorChange(color,event){
        console.log(color.hex)
        onChange((prev) =>color.hex)
        setOpen((prev)=>false)
        setColor(prev=>color.hex)
    }

    function handleOpen(){
        setOpen((prev)=>true)
        
    }

    useEffect(() => {
        onChange(color)

      return () => {
        
      }
    }, [color])
    
    useEffect(() => {
        setColor(value)
    }, [value])
    

  return (
    <div>            
        {(label !== undefined && label !== null) && (
            <div>
                {label}
            </div>
        )}
        <div>
            <div style={{backgroundColor:color, width:"20px", height:"20px"}} onClick={handleOpen}></div>
        </div>
        {(open === true) && (
            <div>
            <TwitterPicker 
                color={color}
                colors={colorOptions}
                onChange={handleColorChange}
                
            />
            </div>
        )}
    </div>
  )
}



export default ColorSelect
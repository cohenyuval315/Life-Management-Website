import React, { useState } from 'react'
import RadioInput from '../../ui/RadioInput/RadioInput'


const RRuleStepOne = ({stepOneState, handleStepOneStateChange,handlePageForward,setOpen, radioOptions}) => {


    function handleRadioOnChange(name){
       handleStepOneStateChange(name)
        if (name === "custom"){
            handlePageForward()
        }else{
            setOpen(false)
        }
    }


  return (
    <div style={{display:"block"}}>
        {radioOptions.map((name,index)=>{
            if (index === radioOptions.length - 1){
                return (
                    <div style={{display:"flex"}}>
                        <RadioInput value={name} isSelected={stepOneState===name} handleChange={(e)=>handleRadioOnChange(name)} />
                        {name}
                    </div>
                )
            }
            return (
                <div style={{display:"flex"}}>

                    <RadioInput value={name} isSelected={stepOneState===name}  handleChange={(e)=>handleRadioOnChange(name)} />
                    {name}
                    
                </div>
            )
        })}
{/* 
        <RadioInput value={"weekly"} isSelected={state==="weekly"} handleChange={handleRadioOnChange} />
        <RadioInput value={"monthly"} isSelected={state==="monthly"} handleChange={handleRadioOnChange} />
        <RadioInput value={"yearly"} isSelected={state==="yearly"} handleChange={handleRadioOnChange} />
        <RadioInput value={"custom"} isSelected={state==="custom"} handleChange={handleRadioOnChange} onClick={(e)=>handlePageForwardOnClick()} /> */}
    </div>
  )
}

export default RRuleStepOne
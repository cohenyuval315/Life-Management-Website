import React,{useState, useEffect} from 'react'
import { validateInteger } from '../../../../../utils/helpers'
import StyledSelect from '../../../../../components/ui/Select/StyledSelect'
import StyledTextField from '../../../../../components/ui/TextField/StyledTextField'
import { v4 as uuidv4 } from 'uuid'
import './Reminder.css'

const times = [{label:"minutes",value:"minutes"},{label:"hours",value:"hours"},{label:"days",value:"days"}, {label:"weeks",value:"weeks"}]


const TimeLeftReminder = ({handleChange}) => {
    const [count,setCount]= useState(10)
    const [selectedTimeType,setSelectedTimeType] = useState({label:"minutes",value:"minutes"})

    function handleSelectedTimeTypeOnChange(e){
        setSelectedTimeType(e)
    }

    function handleCountOnChange(e){
        if(!validateInteger(e.target.value)){
            setCount("")
            console.log("integer only")
            return
        }
        setCount(e.target.value)
    }

    function validateReminder(reminder){
        if(reminder === null){
            return false
        }
        if(reminder === undefined){
            return false
        }
        if(reminder.timeType === undefined){
            return false
        }
        if(reminder.timeType === null){
            return false
        }
        if(reminder.count === undefined){
            return false
        }
        if(reminder.count === null){
            return false
        }
        if(reminder.id === undefined){
            return false
        }
        if(reminder.id === null){
            return false
        }
        const count = reminder.count

        if (count < 0){
            return false
        }

        if(reminder.timeType === "minutes"){
            if (count > 40320){
                return false
            }
        }   
        if(reminder.timeType === "hours"){
            if (count > 672){
                return false
            }
        }
        if(reminder.timeType === "days"){
            if (count > 28){
                return false
            }
        }
        if(reminder.timeType === "weeks"){
            if (count > 4){
                return false
            }
        }

       return true
    }

    function getNewReminder(){
        const newReminder = {
            "id":uuidv4().toString(),
            "count":count,
            "timeType":selectedTimeType.value
        }
        return newReminder
    }


    useEffect(() => {
        const reminder = getNewReminder()
        if (validateReminder(reminder)){
            handleChange(reminder)
        }

      return () => {
       
      }
    }, [count,selectedTimeType])
        

  return (
    <div className='reminderContainer'>
        <div className='reminderLabel'>
            reminder:
        </div>
        <div className='reminderForm'>
            <div className='timeLeftTextField'>
                <StyledTextField value={count} handleChange={handleCountOnChange} />
            </div>
            <div className='timeLeftSelect'>
                <StyledSelect values={selectedTimeType} options={times} handleChange={handleSelectedTimeTypeOnChange} />
            </div>
        </div>
    </div>
  )
}

export default TimeLeftReminder
import React,{useState,useEffect} from 'react'
import StyledDateTimePicker from '../../../../../components/ui/DateTimePicker/StyledDateTimePicker'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import './Reminder.css'

const DateTimeReminder = ({handleChange}) => {

    const [dateTime,setDateTime] = useState(moment())

    function handleDateTimeOnChange(e){
        setDateTime(e)
    }

    function getNewReminder(){
      const newReminder = {
            "id":uuidv4().toString(),
            "dateTime":dateTime
      }
      return newReminder
    }

    function validateReminder(reminder){
        if(reminder === null){
            return false
        }
        if(reminder === undefined){
            return false
        }
        if(reminder.id === undefined){
            return false
        }
        if(reminder.id === null){
            return false
        }
        if(reminder.dateTime === undefined){
            return false
        }
        if(reminder.dateTime === null){
            return false
        }
        if(moment(reminder.dateTime).isBefore(moment())){
            console.log("notfication future only")
            return false
        }
        return true
    }

    useEffect(() => {
      const reminder = getNewReminder()
      if ( validateReminder(reminder)){
          handleChange(reminder)
      }
          
      return () => {
        
      }
    }, [dateTime,setDateTime])
    
  
  return (
    <div className='reminderContainer'>
        <div className='reminderLabel'>
            reminder date
        </div>
        <div className='reminderForm'>
            <StyledDateTimePicker value={dateTime} onChange={handleDateTimeOnChange} />
        </div>
    </div>
  )
}

export default DateTimeReminder
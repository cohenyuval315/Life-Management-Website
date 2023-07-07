import moment from 'moment'
import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import StyledButton from '../../../../../components/ui/Button/StyledButton'
import DateTimeReminder from './DateTimeReminder'
import TimeLeftReminder from './TimeLeftReminder'
import { Icons } from '../../../../../assets'

import './Reminder.css'
import { createUserReminder } from '../../../../../services/api'

const ReminderForm = ({onChange,value}) => {
    const [reminders,setReminders] = useState([])

    const [timeLeftReminder,setTimeLeftReminder] = useState(null)
    const [dateTimeReminder,setDateTimeReminder]  = useState({id:uuidv4().toString(),dateTime:moment()})

    useEffect(() => {
        onChange(reminders)

    return () => {
        
    }
    }, [reminders])


    function validateReminder(reminder){
        if(reminders.filter((n)=>n.id === reminder.id).length > 0){
            return false
        }

        if(reminder === undefined){
            return false
        }
        if(reminder === null){
            return false
        }
        return true
    }

    function AddTimeLeftReminder(){
        const testDuplicates = reminders.filter((reminder)=>reminder.timeType!== undefined).filter((reminder)=>reminder.count === timeLeftReminder.count && reminder.timeType === timeLeftReminder.timeType)
        if (testDuplicates.length > 0){
            return
        }
        if (validateReminder(timeLeftReminder)){
            setReminders([...reminders,timeLeftReminder])
        }
        
    }
    function AddDateTimeReminder(){
        const testDuplicates = reminders.filter((reminder)=>reminder.dateType !== undefined).filter((reminder)=>reminder.dateTime === dateTimeReminder.dateTime)
        if (testDuplicates.length > 0){
            return
        }
        if (dateTimeReminder.dateTime === undefined || dateTimeReminder.dateTime === null){
            return
        }
        if (validateReminder(dateTimeReminder)){
            setReminders([...reminders,dateTimeReminder])
        }
        console.log(dateTimeReminder.dateTime)
    }
    function removeItem(id){
        setReminders([...reminders.filter((reminder)=>reminder.id !== id)])
    }
    
    
    const TimeLeftReminderItem = ({reminder}) => {
    
        return (
            <div className='reminderItem'>
                {reminder.count} {reminder.timeType} before
            </div>
        )
    }
    const DateTimeReminderItem = ({reminder}) => {
           const data = reminder.dateTime
        
      return (
            <div className='reminderItem'>

                {data.toString()}
            </div>
      )
    }
    function handleTimeLeftReminderOnChange(e){
        setTimeLeftReminder(e)
    }
    function handleDateTimeReminderOnChange(e){
        setDateTimeReminder(e)
    }

  return (
    <div className='reminderListContainer'>
        <div className='reminderLabel'>
            reminders:
        </div>
        <div className='reminderHeader'>   
            <div className='timeLeftReminderForm'>
                <StyledButton name={"add by time left"} handleOnClick={AddTimeLeftReminder} styles={{ height:"50px",width:"100px",fontSize:"10px", padding:"5px"}}/> 
                <TimeLeftReminder handleChange={handleTimeLeftReminderOnChange} />
            </div>
            <div className='dateTimeReminderForm'>
                <StyledButton name={"add by date"} handleOnClick={AddDateTimeReminder} styles={{ height:"50px",width:"100px",fontSize:"10px", padding:"5px"}}/> 
                <DateTimeReminder handleChange={handleDateTimeReminderOnChange} />
            </div>
        </div>

        <div className='reminderListContent'>
            {reminders.map((reminder)=>{
                return (
                    <div className='reminderRow'>
                        {Icons.Add}
                        <div className='reminderData'>
                            {(reminder.timeType !== undefined && reminder.timeType !== null) && (<TimeLeftReminderItem reminder={reminder}/>)}
                            {(reminder.dateTime !== undefined && reminder.dateTime !== null) && (<DateTimeReminderItem reminder={reminder}/>)}
                        </div>
                        <div className='reminderRemove'>
                            <StyledButton name={"remove"} handleOnClick={(e)=>removeItem(reminder.id)} styles={{ height:"20px",width:"70px",fontSize:"10px", padding:"5px"}}/> 
                        </div>
                    </div>
                )
            })}
        </div>


    </div>
  )
}

export default ReminderForm
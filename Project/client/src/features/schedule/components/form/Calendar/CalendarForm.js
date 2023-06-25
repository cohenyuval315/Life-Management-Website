import { Divider } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import StyledButton from '../../../../../components/ui/Button/StyledButton'
import ColorSelect from '../../../../../components/ui/ColorSelect/ColorSelect'
import StyledSelect from '../../../../../components/ui/Select/StyledSelect'
import StyledTextField from '../../../../../components/ui/TextField/StyledTextField'
import { createUserCalendar, deleteUserCalendar, deleteUserEvent, getUserCalendars, getUserEvents, updateUserCalendar } from '../../../../../services/api/index'
import { toLabelValueItemJson } from '../../../../../utils/helpers'
import './CalendarForm.css'


const CalendarForm = ({apiCalls}) => {


  // calendar props 
  const [loading,setLoading] = useState(false)
  const [calendars,setCalendars] = useState([])

  const [selectedCalendar,setSelectedCalendar] = useState(toLabelValueItemJson("none"))

  const [name,setName] = useState()
  const [color,setColor] = useState()
  const [borderColor,setBorderColor] = useState()
  const [backgroundColor,setBackgroundColor] = useState()
  const [dragBackgroundColor,setDragBackgroundColor] = useState()
  const [isPrivate,setIsPrivate] = useState()
  const [password,setPassword] = useState()

    function fetchCalendars(){
        setLoading(true)
        getUserCalendars().then(data=>{
            const selectCalendars = toLabelValueItemJson(data)
            setCalendars(selectCalendars)
        })
        setLoading(false)
    }

    useEffect(() => {
       fetchCalendars()
    }, [])

    useEffect(() => {
            if(selectedCalendar.label === "none"){
                setName("")
                setColor("#FFFFFF")
                setBorderColor("#FFFFFF")   
                setBackgroundColor("#FFFFFF")
                setDragBackgroundColor("#FFFFFF")
                setIsPrivate(false)
                setPassword("")
            }else{
                const calendar = selectedCalendar.item
                setName(calendar.name)
                setColor(calendar.color)
                setBorderColor(calendar.borderColor)   
                setBackgroundColor(calendar.backgroundColor)
                setDragBackgroundColor(calendar.dragBackgroundColor)
                setIsPrivate(calendar.isPrivate || false)
                setPassword(calendar.password || "")
            }
        
    }, [selectedCalendar])

  function handleNameOnChange(e){
    setName(e.target.value)
  }
  function handleColorOnChange(e){
      setColor(e)
  }
  function handleBorderColorOnChange(e){
      setBorderColor(e)
  }
  function handleBackgroundColorOnChange(e){
      setBackgroundColor(e)
  }
  function handleDragBackgroundColorOnChange(e){
      setDragBackgroundColor(e)
  }
  function handleIsPrivateOnChange(e){
      setIsPrivate(!isPrivate)
  }
  function handlePasswordOnChange(e){
      setPassword(e.target.value)
  }

  function handleSubmit(){
      
      const calendar = getCurrentCalendar()
      if(validateCalendar(calendar)){

        if(selectedCalendar.label === "none"){
            handleCreateCalendar(calendar)
            console.log("created calendar!")
        }else{
            handleUpdateCalendar(calendar)
            console.log("updated calendar!")
        }

      }

  }

    function handleDeleteCalendar(){
        if(window.confirm("sure to delete calendar and all its events?")){
            deleteUserCalendar(selectedCalendar)
            getUserEvents().then(data=>{
                [...data.filter((event)=>event.calendarId === selectedCalendar.id)].map((event)=>{
                    deleteUserEvent(event)
                })
            })
            apiCalls()
        }
    }

    function handleCreateCalendar(calendar){
        if(window.confirm("create new calendar?")){
            createUserCalendar(calendar)
            apiCalls()
        }   

    }

    function handleUpdateCalendar(calendar){
        if(window.confirm("update  calendar?")){
            updateUserCalendar(calendar)
            apiCalls()
        }
    }


  function validateCalendar(calendar){
      if(calendar.name.length < 3){
          console.log("calendar: invalid name-short")
          return false
      }
      if(calendar.color === undefined || calendar.color === null || typeof calendar.color !== "string"){
          console.log("calendar:color:invalid")
          return false
      }
      if(calendar.borderColor === undefined || calendar.borderColor === null || typeof calendar.borderColor !== "string"){
          console.log("calendar:borderColor:invalid")
          return false
      }
      if(calendar.backgroundColor === undefined || calendar.backgroundColor === null || typeof calendar.backgroundColor !== "string"){
          console.log("calendar:backgroundColor:invalid")
          return false
      }
      if(calendar.dragBackgroundColor === undefined || calendar.dragBackgroundColor === null || typeof calendar.dragBackgroundColor !== "string"){
          console.log("calendar:dragBackgroundColor:invalid")
          return false
      }
      if(calendar.isPrivate === undefined || calendar.isPrivate === null){
          console.log("calendar:isPrivate:invalid")
          return false
      }
      if(calendar.isPrivate === true && calendar.password.length < 4){
          console.log("calendar:password:invalid")
          return false
      }
      return true
  }

  function getCurrentCalendar(){
      const calendar = {
          name:name,
          color:color,
          borderColor:borderColor,
          backgroundColor:backgroundColor,
          dragBackgroundColor:dragBackgroundColor,
          isPrivate:isPrivate,
          password:password
      }
      return calendar
  }

    function handleSelectedCalendarOnChange(e){
        setSelectedCalendar(e)
    }




  return (
    
    <div>
        {(loading === false)&&(
        <div>
            <StyledSelect handleChange={handleSelectedCalendarOnChange} label={"calendar"} options={[toLabelValueItemJson("none"),...calendars]} values={selectedCalendar} />


                <Divider style={{height:"5px"}} /> 

            <StyledTextField label={"name"} value={name} handleChange={handleNameOnChange}  variant="outlined"/>
            <ColorSelect label={"color"} value={color} onChange={handleColorOnChange} />
            <ColorSelect label={"border-color"} value={borderColor} onChange={handleBorderColorOnChange} />
            <ColorSelect label={"background-color"} value={backgroundColor} onChange={handleBackgroundColorOnChange} />
            <ColorSelect label={"drag-background-color"} value={dragBackgroundColor} onChange={handleDragBackgroundColorOnChange} />
            <div>isPrivate<input value={"isPrivate"} name={"isPrivate"} type="checkbox" checked={isPrivate} onChange={handleIsPrivateOnChange}/></div>
            {(isPrivate === true)&&(
                <StyledTextField label={"password"} value={password} handleChange={handlePasswordOnChange} />
            )}

            {(selectedCalendar !== undefined && selectedCalendar !== null && selectedCalendar.label !== "none")&&(
            <StyledButton name={"delete"} handleOnClick={handleDeleteCalendar} />
            )}

            <StyledButton name={selectedCalendar.label === "none"?"create":"update"} handleOnClick={handleSubmit} />
       </div>)}
    </div>
  )
}

export default CalendarForm
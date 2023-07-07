import React, { useState,useEffect } from 'react'
import { RRule } from 'rrule'
import moment from 'moment';
import { TZDate } from '@toast-ui/calendar';
import {getUserObjects, getUserCalendars, createUserReminder, getUserReminders} from '../../../../../services/api/index';
import ClassicObject from '../../../../../components/form/Object/ObjectForm';
import './EventForm.css'
import { toLabelValueItemJson , validateInteger } from '../../../../../utils/helpers';
import StyledButton from '../../../../../components/ui/Button/StyledButton';
import StyledSelect from '../../../../../components/ui/Select/StyledSelect';
import StyledTextField from '../../../../../components/ui/InputField/TextField/StyledTextField';

import { makeStyles } from '@mui/styles';
import ColorSelect from '../../../../../components/ui/Select/ColorSelect/ColorSelect';

import StyledDateTimePicker from '../../../../../components/ui/Time/DateTimePicker/StyledDateTimePicker';
import StyledDatePicker from '../../../../../components/ui/Time/DatePicker/StyledDatePicker';
import RRuleFormGenerator from '../RRule/RRuleFormGenerator';
import ReminderForm from '../Reminder/ReminderForm';



const useStyles = makeStyles({
    formTitle:{
        width:"100%",

    },
    resize:{
        fontSize:40
        
    },
    formLayouts:{

        padding:"25px",
        display:"block",
        height:"700px",
        overflowY:"scroll"
    },

    formHeader:{
        fontSize:"25px",
        alignItems:"center"
    },

    formFooter:{
    },

    reactJson:{
        minHeight:"200px"
    },

    formAttributeData:{
    },

    objectInputData:{
    },

    propertyInputData:{
    },
});



const EventForm = ({event,onCreate,onUpdate,handleClose,changes={}}) => {

    console.log("event in form", event)
    const classes = useStyles();
    const [isScheduled,setIsScheduled] = useState()
    // event props
    const [title,setTitle]= useState("")
    const [raw,setRaw]= useState()
    const [body,setBody]= useState("")
    const [isAllday,setIsAllday]= useState(false)
    const [start,setStart]= useState()
    const [end,setEnd]= useState()
    const [goingDuration,setGoingDuration]= useState(0)//minutes
    const [comingDuration,setComingDuration]= useState(0)
    const [location,setLocation]= useState("")
    // const [attendees,setAttendees]= useState()
    const [category,setCategory]= useState()
    const [dueDateClass,setDueDateClass]= useState("") // Classification of work events. (before work, before lunch, before work)
    const [state,setState]= useState()
    const [isPermanent,setIsPermanent] = useState()
    const [recurrenceRule,setRecurrenceRule]= useState("")
    // const [isVisible,setIsVisible]= useState(true)
    // const [isPending,setIsPending]= useState(false)
    // const [isFocused,setIsFocused]= useState()
    // const [raw,setRaw] = useState() // Raw data of the event. it's an arbitrary property for anything.
    const [isReminders,setIsReminders] = useState(false)
    const [isReadOnly,setIsReadOnly]= useState(false)
    const [isPrivate,setIsPrivate]= useState(false)
    const [color,setColor]= useState()
    const [backgroundColor,setBackgroundColor]= useState()
    const [dragBackgroundColor,setDragBackgroundColor]= useState()
    const [borderColor,setBorderColor]= useState()
    const [customStyle,setCustomStyle]= useState() //  {'fontSize': '12px'})
    const [isCompleted,setIsCompleted] = useState()
    const [type , setType] = useState("event")
    const categoryOptions = toLabelValueItemJson(['milestone', 'task', 'time' , 'allday']);
    const stateOptions= toLabelValueItemJson(['busy','free']);
    const [selectedCalendar,setSelectedCalendar] = useState()
    const [userCalendars,setUserCalendars] = useState([])
    const [selectedUserObject, setSelectedUserObject] = useState(toLabelValueItemJson("none"))
    const [userObjects,setUserObjects] = useState([]) 

    // extra custom fields

    // thier own apis
    // const [s,setNotifications] = useState()
    const [reminders,setReminders] = useState()
    const [isRecurring,setIsRecurring] = useState(false)

    console.log("com", isCompleted)
    useEffect(() => {
        setChanges()
    }, [changes])

    useEffect(() => {
        fetchCalendars()
        fetchObjects()
    }, [])
    
    useEffect(() => {
        if (event === undefined || event === null){
            setTitle("")
            setBody("")
            setIsAllday(false)
            setStart(null)
            setEnd(null)
            setGoingDuration(0)
            setComingDuration(0)
            setLocation("")
            setCategory(toLabelValueItemJson("time"))
            setDueDateClass("")
            setRecurrenceRule("")
            setState(toLabelValueItemJson("busy"))
            setIsReadOnly(false)
            setIsPrivate(false)
            setIsCompleted(false) 
            setIsPermanent(false)
            setCustomStyle('')
            setRaw('')
        }else{
            fetchReminders()
            // if(event.calendarId !== null && event.calendarId !== undefined){
            // useless
            //     setSelectedCalendar(toLabelValueItemJson(getCalendarFromId(event.calendarId)))
            // }
            if(event.title !== null && event.title !== undefined){
                setTitle(event.title)
            }


            if(event.body !== null && event.body !== undefined){
                setBody(event.body)
            }

            if(event.isAllday !== null && event.isAllday !== undefined){
                setIsAllday(event.isAllday)
            }
            setIsScheduled(false)
            setStart(null)
            setEnd(null)
            if(event.start !== null && event.start !== undefined){
                setStart(event.start)
                setIsScheduled(true)
            }

            if(event.end !== null && event.end !== undefined){
                setEnd(event.end)
            }

            setChanges()

            if(event.goingDuration !== null && event.goingDuration !== undefined){
                setGoingDuration(event.goingDuration)
            }

            if(event.comingDuration !== null && event.comingDuration !== undefined){
                setComingDuration(event.comingDuration)
            }

            if(event.location !== null && event.location !== undefined){
                setLocation(event.location)
            }

            if(event.category !== null && event.category !== undefined){
                setCategory(toLabelValueItemJson(event.category))
            }

            if(event.dueDateClass !== null && event.dueDateClass !== undefined){
                setDueDateClass(event.dueDateClass)
            }

            if(event.recurrenceRule !== null && event.recurrenceRule !== undefined && event.recurrenceRule !== ''){
                setIsRecurring(true)
                setRecurrenceRule(event.recurrenceRule)
            }

            if(event.state !== null && event.state !== undefined){
                setState(toLabelValueItemJson(event.state))
            }

            if(event.isReadOnly !== null && event.isReadOnly !== undefined){
                setIsReadOnly(event.isReadOnly)
            }

            if(event.isPrivate !== null && event.isPrivate !== undefined){
                setIsPrivate(event.isPrivate)
            }

            if(event.color !== null && event.color !== undefined){
                setColor(event.color)
            }

            if(event.backgroundColor !== null && event.backgroundColor !== undefined){
                setBackgroundColor(event.backgroundColor)
            }

            if(event.dragBackgroundColor !== null && event.dragBackgroundColor !== undefined){
                setDragBackgroundColor(event.dragBackgroundColor)
            }

            if(event.borderColor !== null && event.borderColor !== undefined){
                setBorderColor(event.borderColor)
            }
            if(event.raw !== null && event.raw !== undefined){
                setRaw(event.raw)
            }


            if(event.isPerm !== null && event.isPerm !== undefined){
                setIsPermanent(event.isPerm)
            }

            if(event.isCompleted !== null && event.isCompleted !== undefined){
                setIsCompleted(event.isCompleted)
            }


        }
    }, [])

    function fetchReminders(){
        getUserReminders().then(data=>{
            const reminders = [...data.filter((reminder)=>reminder.eventId === event.id)]
            console.log("reminders of event",reminders)     
            setReminders(reminders)
            if(reminders.length > 0){
                setIsReminders(true)
            }

        })
    }


    function setCalendarColors(calendar){
        setBackgroundColor(calendar.backgroundColor)
        setBorderColor(calendar.borderColor)
        setDragBackgroundColor(calendar.dragBackgroundColor)
        setColor(calendar.color)
    }

    function fetchCalendars(){
        getUserCalendars().then(data=>{
            setUserCalendars(toLabelValueItemJson(data))
            return data
        }).then(data=>{
            if(event === null || event === undefined){
                const calendar = data[0]
                setSelectedCalendar(toLabelValueItemJson(calendar))
                setCalendarColors(calendar)

            }else{
                if(event.calendarId !== null && event.calendarId !== undefined){
                    const eventCalendar = [...data.filter((cal)=>cal.id == event.calendarId)][0]
                    setSelectedCalendar(toLabelValueItemJson(eventCalendar))

                }
            }

        })
    }

    function fetchObjects(){
        getUserObjects().then(data=>{
            setUserObjects([toLabelValueItemJson("none"),...toLabelValueItemJson(data)])
            return data
        })
    }

    function setChanges(){
        if(changes['start'] !== null && changes['start']!== undefined){
            const startDate = changes['start'].toDate()
            setStart(startDate)
        }
        if(changes['end'] !== null && changes['end']!== undefined){
            const endDate = changes['end'].toDate()
            setEnd(endDate)
        }
    }

    function getUpdatedEventChanges(currentEvent){
        const allChanges = {}

        if(currentEvent.start !== event.start && currentEvent.start !== undefined && currentEvent.start !== null){
            allChanges['start'] = currentEvent.start
        }
        if(currentEvent.end !== event.end && currentEvent.end !== undefined && currentEvent.end !== null){
            allChanges['end'] = currentEvent.end
        }
        if(currentEvent.title !== event.title && currentEvent.title !== undefined && currentEvent.title !== null){
            allChanges['title'] = currentEvent.title
        }
        if(currentEvent.isAllday !== event.isAllday&& currentEvent.isAllday !== undefined && currentEvent.isAllday !== null){
            allChanges['isAllday'] = currentEvent.isAllday
        }
        if(currentEvent.dueDateClass !== event.dueDateClass && currentEvent.dueDateClass !== undefined && currentEvent.dueDateClass !== null){
            allChanges['dueDateClass'] = currentEvent.dueDateClass
        }
        if(currentEvent.location !== event.location && currentEvent.location !== undefined && currentEvent.location !== null){
            allChanges['location'] = currentEvent.location
        }
        if(currentEvent.state !== event.state && currentEvent.state !== undefined && currentEvent.state !== null){
            allChanges['state'] = currentEvent.state
        }
        if(currentEvent.isPrivate !== event.isPrivate && currentEvent.isPrivate !== undefined && currentEvent.isPrivate !== null){
            allChanges['isPrivate'] = currentEvent.isPrivate
        }
        if(currentEvent.body !== event.body && currentEvent.body !== undefined && currentEvent.body !== null){
            allChanges['body'] = currentEvent.body
        }
        if(currentEvent.goingDuration !== event.goingDuration && currentEvent.goingDuration !== undefined && currentEvent.goingDuration !== null){
            allChanges['goingDuration'] = currentEvent.goingDuration
        }
        if(currentEvent.comingDuration !== event.comingDuration && currentEvent.comingDuration !== undefined && currentEvent.comingDuration !== null){
            allChanges['comingDuration'] = currentEvent.comingDuration
        }
        if(currentEvent.recurrenceRule !== event.recurrenceRule && currentEvent.recurrenceRule !== undefined && currentEvent.recurrenceRule !== null){
            allChanges['recurrenceRule'] = currentEvent.recurrenceRule
        }
        if(currentEvent.isReadOnly !== event.isReadOnly && currentEvent.isReadOnly !== undefined && currentEvent.isReadOnly !== null){
            allChanges['isReadOnly'] = currentEvent.isReadOnly
        }
        if(currentEvent.color !== event.color && currentEvent.color !== undefined && currentEvent.color !== null){
            allChanges['color'] = currentEvent.color
        }
        if(currentEvent.attendees !== event.attendees && currentEvent.attendees !== undefined && currentEvent.attendees !== null){
            allChanges['attendees'] = currentEvent.attendees
        }
        if(currentEvent.backgroundColor !== event.backgroundColor && currentEvent.backgroundColor !== undefined && currentEvent.backgroundColor !== null){
            allChanges['backgroundColor'] = currentEvent.backgroundColor
        }
        if(currentEvent.dragBackgroundColor !== event.dragBackgroundColor && currentEvent.dragBackgroundColor !== undefined && currentEvent.dragBackgroundColor !== null){
            allChanges['dragBackgroundColor'] = currentEvent.dragBackgroundColor
        }
        if(currentEvent.borderColor !== event.borderColor && currentEvent.borderColor !== undefined && currentEvent.borderColor !== null){
            allChanges['borderColor'] = currentEvent.borderColor
        }
        if(currentEvent.customStyle !== event.customStyle && currentEvent.customStyle !== undefined && currentEvent.customStyle !== null){
            allChanges['customStyle'] = currentEvent.customStyle
        }
        
        return allChanges
    }

    function handleSubmit(e){
        e.preventDefault()
        const currentEvent = getCurrentEvent()
        if(!validateEvent(currentEvent)){
            console.log("bad event inputs")
            return false
        }else{
            if(isCreateEvent()){ // new event
                handleOnCreate(currentEvent)
            }else{ // update event
                handleOnUpdate(currentEvent)
                handleCreateReminders()
            }
            handleClose&&handleClose()
        }  
    }

    function isCreateEvent(){
        if(event === null || event === undefined){
            return true
        }
        if(event !== null && event !== undefined && selectedCalendar.item.id !== event.calendarId){
            return true
        }
        return false
    }

    function handleOnCreate(currentEvent){
        onCreate(currentEvent)
    }

    function validateEvent(currentEvent){
        if (currentEvent === undefined){
            console.log("curr event undef")
            return false
        }
        if (currentEvent === null){
            console.log("curr event null")
            return false
        }
        if (currentEvent === null){
            console.log("curr event null")
            return false
        }
        if(currentEvent.calendarId === null || currentEvent.calendarId === undefined){
            console.log("choose calendar")
            return false
        }
 
        if(title.length < 3){
            console.log("event:title too short")
            return false
        }
        if(title.length > 15){
            console.log("event:title too long")
            return false
        }
        if(isScheduled === false){
            return true
        }
        const startDate = moment(currentEvent.start)
        const endDate = moment(currentEvent.end)
        const today = moment()

       if(currentEvent.isAllday === true && endDate.diff(startDate,"minutes") < 24*60){
            console.log("is not all day")
            return false
        }
        if(startDate.isBefore(today)){
            console.log("start date before now")
            return false
        }

        if(endDate.isBefore(today)){
            console.log("end date before now")
            return false
        }
        if(endDate.isBefore(startDate)){
            console.log("end date before start")
            return false
        }

        return true
    }

    function handleRecurrenceValidation(rrule){
        return true
    }

    function handleRecurrenceEvents(currentEvent){ 
        const newRR = currentEvent.recurrenceRule 
        const rr = RRule.fromString(newRR)// dates to recur
        let startDate = moment(currentEvent.start)
        let endDate = moment(currentEvent.end)
        const diff = endDate.diff(startDate,"minutes")
        console.log("diffrence minutes", diff)
        if(diff < 0){
            console.log("date:shouldnt get here")
        } 
        const maxLength = 300 // minutes = 10 hours
        if(diff > maxLength){
            console.log("too long big of an event for recurance")
            return 
        }
        const startDateTime = moment(moment(rr.options['dtstart']).format('DD.MM.YYYY') +" "+ startDate.format('HH:mm:ss'),'DD.MM.YYYY HH:mm:ss').toDate()
        console.log("rr start", startDateTime)
        const endDateTime = moment(moment(rr.options['until']).format('DD.MM.YYYY') +" "+ endDate.format('HH:mm:ss'),'DD.MM.YYYY HH:mm:ss').toDate()
        console.log("rr start", endDateTime)

        const newRRules = {
            ...rr.origOptions
        }
        newRRules['dtstart'] = startDateTime
        newRRules['until'] = endDateTime
        newRRules['tzid'] = 'Asia/Jerusalem'
        
        const readyRR = new RRule(newRRules)

        if(!handleRecurrenceValidation(rr)){
            console.log('failed to recurance event')
            return 
        }

        if(readyRR.all().length> 250){ // 
            console.log("too much occourances")
            return
        }
        const dates = [...readyRR.all()]
        const newEvents = []
        dates.map((date,index)=>{
            const event = getRecurrenceEvent(date,index,diff)
            newEvents.push(event)
        })
        console.log(newEvents)
        newEvents.map((event)=>{
            onCreate(event)
        })
    }

    function getRecurrenceEvent(date,index,diff){
        let cur = {...getCurrentEvent()}
        const start = new TZDate(date).toString()
        const end = moment(start).add(diff,"minutes").toDate()

        cur['start'] = start
        cur['end']=new TZDate(end).toString()
        cur['recurrenceRule']=""
        cur['title']=title
        cur['serialId']=`${index}_${cur.title}`
        return cur
    }

    function handleOnUpdate(currentEvent){
        const calendarId = currentEvent.calendarId
        console.log("form current update",currentEvent)
        if(isScheduled === true && currentEvent.recurrenceRule !== '' && currentEvent.recurrenceRule !== event.recurrenceRule){
            handleRecurrenceEvents(currentEvent)
        }
        const allChanges = getUpdatedEventChanges(currentEvent)
        if(isScheduled === true){
            allChanges['start'] = new TZDate(allChanges['start'])
            allChanges['end'] = new TZDate(allChanges['end'])
        }
        onUpdate(currentEvent,currentEvent.id,currentEvent.calendarId,allChanges)       
    }

    function getCurrentEvent(){
        let calendar = userCalendars[0].item
        if(selectedCalendar !== null && selectedCalendar !== undefined){
            calendar = selectedCalendar.item
        }
        const currentEvent = {
            calendarId: calendar.id,
            objectId:null,
            type:type,
            title: title,
            isAllday: isAllday,
            start: start,
            end: end,
            category: category.item,
            dueDateClass: dueDateClass,
            location: location,
            state: state.item,
            isPrivate: isPrivate,
            body:body,
            goingDuration:parseInt(goingDuration),
            comingDuration:parseInt(comingDuration),
            recurrenceRule:recurrenceRule,
            isReadOnly:isReadOnly,
            attendees:event?event.attendees:[],  
            color:color,
            backgroundColor:backgroundColor,
            dragBackgroundColor:dragBackgroundColor,
            borderColor:borderColor,
            customStyle:customStyle,
            raw:raw,
            isPerm:isPermanent || false,
            isCompleted:isCompleted || false,
        };
        if(isScheduled === false){
            currentEvent['start'] = null
            currentEvent['end'] = null
            currentEvent['goingDuration'] = 0
            currentEvent['comingDuration'] = 0
            currentEvent['recurrenceRule'] = ''
            currentEvent['isAllday'] = false

        }
        if(event !== null && event !== undefined){
            currentEvent['id'] = event.id
        }
        
        if(selectedUserObject.label !== "none"){
            currentEvent["objectId"] = selectedUserObject.item.id
        }
        if(category.item === "time"){
        }
        if(category.item === "milestone"){
        }
        if(category.item === "allday"){
        }
        if(isAllday === true){
        }
        if(category.item === "task"){
        }
        return currentEvent

    }


    function handleCreateReminders(){
        if(reminders !== undefined && reminders.length >0 && event !== undefined && event !== null){
            reminders.map((reminder)=>{
                    delete reminder.id
                    reminder['eventId'] = event.id
                    createUserReminder(reminder)
            })
        }
    }
  return (
    <div>
        <div className='formLayout'>

            <StyledSelect label={"calendar"} value={selectedCalendar} options={userCalendars} handleChange={handleSelectedCalendarOnChange} placeholder={"calendar"}/>
            <StyledTextField 
                    className={classes.formTitle} 
                    value={title} 
                    handleChange={handleTitleOnChange}
                    placeholder={"title"} 
                    InputProps={{
                        classes: {
                        input: classes.resize,
                        },
                    }}
            />
            <StyledTextField 
                    value={body} 
                    handleChange={handleBodyOnChange}
                    placeholder={"body"} 
                    multiline
            />

            {(event === undefined || event === null || event.start === null) && (
                <div>
                    <div>isSchedule<input value={"isSchedule"} name={"isSchedule"} type="checkbox" checked={isScheduled} onChange={handleIsScheduledOnChange}/></div>
                    <div>permanentSideBar<input value={"permanentSideBar"} name={"permanentSideBar"} type="checkbox" checked={isPermanent} onChange={handleIsPermanentOnChange}/></div>
                </div>
            )}
            {(isScheduled === true)&&(
                <div>
                    <div>isAllday<input value={"isAllday"} name={"isAllday"} type="checkbox" checked={isAllday} onChange={handleIsAllDayOnChange}/></div>
                    {(isAllday === true && start !== undefined && end !== undefined ) && (
                        <div>
                            <StyledDatePicker value={start} onChange={handleStartDateTimeOnChange} />
                            <StyledDatePicker value={end} onChange={handleEndDateTimeOnChange}   />
                        </div>
                    )}
                    {(isAllday === false && start !== undefined && end !== undefined ) && (
                        <div>
                            <StyledDateTimePicker label={"start date"} value={start} onChange={handleStartDateTimeOnChange} /> 
                            <StyledDateTimePicker label={"end date"} value={end} onChange={handleEndDateTimeOnChange}/> 
                        </div>
                    )}
                </div>
            )}
        
            <StyledSelect label={"object"} values={selectedUserObject} options={userObjects} handleChange={handleSelectUserObjectOnChange} placeholder={"objet"}/>

            <StyledTextField label={"comeup-preparation(walk,etc) in minutes"} value={goingDuration} handleChange={handleGoingDurationOnChange} />
            <StyledTextField label={"cooldown-(rest,walk,etc) in minutes"} value={comingDuration} handleChange={handleComingDurationOnChange} />
            <StyledTextField label={"location"} value={location} handleChange={handleLocationOnChange} />

            {/* <StyledSelect label={"attendees"} values={attendees} handleChange={handleAttendeesOnChange} options={} isMulti /> */}


            <StyledSelect label={"category"} values={category} handleChange={handleCategoryOnChange} options={categoryOptions} />
            <StyledSelect label={"state"} values={state} handleChange={handleStateOnChange} options={stateOptions} />

            <StyledTextField label={"custom styles"} value={customStyle} handleChange={handleCustomStyleOnChange} />

            Classification of work events.
            <StyledTextField label={"dueDateClass"} value={dueDateClass} handleChange={handleDueDateClassOnChange} />

            {(selectedUserObject.label!=="none")&&(
                <div>
                    <ClassicObject object={selectedUserObject.item}/>
                </div>
            )} 
                {(color !== undefined && backgroundColor !== undefined && dragBackgroundColor !== undefined && borderColor !== undefined && (
                <div>
                    <ColorSelect label={"color"} value={color} onChange={handleColorOnChange}/>
                    <ColorSelect label={"backgroundColor"} value={backgroundColor} onChange={handleBackgroundColorOnChange}/>
                    <ColorSelect label={"dragBackgroundColor"} value={dragBackgroundColor} onChange={handleDragBackgroundColorOnChange}/>
                    <ColorSelect label={"borderColor"} value={borderColor} onChange={handleBorderColorOnChange}/>
                </div>
                ))}


            <div className='checkboxes'>
                <div>
                    <div>isReadOnly<input value={"isReadOnly"} name={"isReadOnly"} type="checkbox" checked={isReadOnly} onChange={handleIsReadOnlyOnChange}/></div>
                    <div>isPrivate<input value={"isPrivate"} name={"isPrivate"} type="checkbox" checked={isPrivate} onChange={handleIsPrivateOnChange}/></div>
                    <div>isCompleted<input value={"isCompleted"} name={"isCompleted"} type="checkbox" checked={isCompleted} onChange={handleIsCompletedOnChange}/></div>
                </div>
            </div>

            {(isScheduled === true && event !== null && event !== undefined)&&(

            <div>

                <div>reminders <input value={"reminder"} name={"isReminders"} type="checkbox" checked={isReminders} onChange={handleIsReminderOnChange}/></div>
                {(isReminders === true)&& (
                    <div className='reminders'>
                        <ReminderForm onChange={handleRemindersOnChange} value={reminders} />
                    </div>
                )}
                <div className='recurringRRule' >
                    <div className="" >
                        Recurring<input value={"recurring"} name={"recuring"} type="checkbox" checked={isRecurring} onChange={handleIsRecurringOnChange}/>

                        {(isRecurring!== undefined && isRecurring!==null && isRecurring === true)&&(
                        <div>   
                            <div className='rruleform'>
                                {/* <RRuleForm3 eventRRuleString={recurrenceRule} setEventRRuleString={handleRecurrenceRuleOnChange}  until={until} setUntil={setUntil} dtStart={dtStart} setDtStart={setDtStart}  /> */}
                                <RRuleFormGenerator start={start} value={recurrenceRule} handleChange={handleRecurrenceRuleOnChange} />
                            </div>
                        </div>
                        )}
                    </div>
                </div>

            </div>
            )}
            <StyledButton name={"submit"} handleOnClick={handleSubmit} />

        </div>

    </div>
  )

    function handleIsPermanentOnChange(){
        setIsPermanent(!isPermanent)
    }

    function handleIsReminderOnChange(){
        setIsReminders(!isReminders)
    }
    function handleRemindersOnChange(notfications){
        setReminders(notfications)
    }

    function handleSelectUserObjectOnChange(e){
        setSelectedUserObject(e)
    }

    function handleIsRecurringOnChange(){
        setIsRecurring(!isRecurring)
        setRecurrenceRule("")
    }

    function handleSelectedCalendarOnChange(e){
        setSelectedCalendar(e)
    }

    function handleIsCompletedOnChange(e){
        setIsCompleted(!isCompleted)
    }

    function handleCustomStyleOnChange(e){
        setCustomStyle(e)
    }

    function handleDueDateClassOnChange(e){
        setDueDateClass(e.target.value)
    }

    function handleStateOnChange(e){
        setState(e)
    }

    function handleIsReadOnlyOnChange(e){
        setIsReadOnly(!isReadOnly)
    }
    function handleIsScheduledOnChange(e){
        setIsScheduled(!isScheduled)
        if(!isScheduled === true) {
            setStart(new Date())
            setEnd(new Date())
        }
        if(!isScheduled === false) {
            setStart(null)
            setEnd(null)
        }
    }

    function handleColorOnChange(e){
        setColor(e)
    }

    function handleColorOnChange(e){
        setColor(e)
    }

    function handleBackgroundColorOnChange(e){
        setBackgroundColor(e)
    }

    function handleDragBackgroundColorOnChange(e){
        setDragBackgroundColor(e)
    }

    function handleBorderColorOnChange(e){
        setBorderColor(e)
    }

    function handleIsPrivateOnChange(){
        setIsPrivate(!isPrivate)
    }

    function handleGoingDurationOnChange(e){
        const value = e.target.value
        if(!validateInteger(value)){
            console.log('integer only')
            setGoingDuration('')
            return
        }
        setGoingDuration(value)

    }

    function handleComingDurationOnChange(e){
        const value = e.target.value
        if(!validateInteger(value)){
            console.log('integer only')
            setComingDuration('')
            return
        }
        setComingDuration(value)
    }

    function handleLocationOnChange(e){
        setLocation(e.target.value)
    }

    function handleCategoryOnChange(e){
        setCategory(e)
    }

    function handleStartDateTimeOnChange(e){
        setStart(e)
    }

    function handleEndDateTimeOnChange(e){
        setEnd(e)
    }

    function handleTitleOnChange(e){
        setTitle(e.target.value)
    }

    function handleBodyOnChange(e){
        setBody(e.target.value)
    }

    function handleIsAllDayOnChange(e){
        setIsAllday(!isAllday)
    }

    function handleRecurrenceRuleOnChange(e){
        setRecurrenceRule(e)
    }
}

export default EventForm
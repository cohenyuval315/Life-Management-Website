

import React, { useState, useEffect }  from 'react'
import {TZDate} from '@toast-ui/calendar';
import MyCalendar from './MyCalendar' 
import { theme } from './styles/theme';
import { templates } from './styles/templates'
import { createUserCalendar, createUserEvent, deleteUserCalendar, deleteUserEvent, getUserCalendars, getUserEvents, updateUserCalendar, updateUserEvent } from '../../../../../services/api/index';

const start = new Date();

const end = new Date(new Date().setMinutes(start.getMinutes() + 60));

const attendees = [
  {
    id: "1",
    name: "Chin"
  },
  { id: "2", name: "Khanh" },
  { id: "3", name: "Linh" },
  { id: "4", name: "Hai" }
];

const schedules = [
  {
    id: "1",
    title: "Mua nuoc dum",
    calendarId: "1",
    category: "time",
    attendees: ["Chin"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  },
  {
    id: "2",
    title: "Di lau nha",
    calendarId: "2",
    category: "time",
    attendees: ["Khanh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  },
  {
    id: "3",
    title: "Di don phong",
    calendarId: "3",
    category: "time",
    attendees: ["Hai"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 4))
  },
  {
    id: "4",
    title: "Phai lam sao day",
    calendarId: "4",
    category: "time",
    attendees: ["Linh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 6))
  },
  {
    id: "1",
    title: "TASK",
    calendarId: "4",
    category: "task",
    attendees: ["Linh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 6))
  }
];

const colors = [
  {
    id: "1",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F"
  },
  {
    id: "2",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A"
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C"
  },
  {
    id: "5",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D"
  },
  {
    id: "6",
    color: "#ffffff",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40"
  },
  {
    id: "7",
    color: "#000000",
    bgColor: "#FFFFFF",
    dragBgColor: "#FFFFFF",
    borderColor: "#FFFFFF"
  }
];

const today = new TZDate();


const viewModeOptions = [
  {
    title: 'Monthly',
    value: 'month',
  },
  {
    title: 'Weekly',
    value: 'week',
  },
  {
    title: 'Daily',
    value: 'day',
  },
];



const MyCalendarWrapper = () => {

  const [loading,setLoading] = useState(true)
  const [calendars,setCalendars] = useState([])
  const [events,setEvents] = useState([])
  const [calendarsEvents,setCalendarsEvents] = useState([])
  const [selectedEvent,setSelectedEvent] = useState(null)

    useEffect(() => {
      fetchCalendars()
      fetchEvents()
      setLoading(false)
    }, [])

    useEffect(() => {
      const curCalendarsEvents = eventToCalendarEvents(getCalendarsEvents(calendars))
      setCalendarsEvents(curCalendarsEvents)
    }, [calendars,events])


  const collapseDuplicateEventsExampleByEventTitleRemoveDuplicate =   {
      week: {
          collapseDuplicateEvents: {
              getDuplicateEvents: (targetEvent, events) =>
                  events
                  .filter((event) =>
                      event.title === targetEvent.title &&
                      event.start.getTime() === targetEvent.start.getTime() &&
                      event.end.getTime() === targetEvent.end.getTime()
                  )
                  .sort((a, b) => (a.calendarId > b.calendarId ? 1 : -1)),
              getMainEvent: (events) => events[events.length - 1], // events are the return value of getDuplicateEvents()
          }
      }
  }

  function getEventsByFilters(eventFilters) {
      let readyEvents = [...events]
      eventFilters.map((eventFilter)=>{
          readyEvents= [...readyEvents.filter((event)=>eventFilter(event))]
      })
      return readyEvents
  }

  function handleSelectedEventOnChange(event){
      setSelectedEvent(event)
  }

  function handleCalendarsOnChange(calendars){
      setCalendars(calendars)
      const filteredEvents = eventToCalendarEvents(getCalendarsEvents(calendars))
      setCalendarsEvents(filteredEvents)
  }

  function getCalendarsEvents(calendars){
      const calendarsIds = [...calendars.filter((calendar)=>calendar.isChecked === true).map((calendar)=>calendar.id)]
      return [...events.filter((event)=>event.start !== null).filter((event)=>calendarsIds.includes(event.calendarId))]
  }

  function handleDeleteEvent(deleteEvent){
      deleteUserEvent(deleteEvent)
      // setEvents([...events.filter((event)=>event.id !== deleteEvent.id)])
      fetchEvents()
  }

  function handleUpdateEvent(updateEvent){
      updateUserEvent(updateEvent)
      // setEvents([...events.map((event)=>{return (event.id === updateEvent.id)?updateEvent:event})])
      fetchEvents()
  }

  function handleCreateEvent(newEvent){
      createUserEvent(newEvent)
      fetchEvents()
  }

  function handleCreateCalendar(calendar){
      createUserCalendar(calendar)
      fetchCalendars()
  }

  function handleUpdateCalendar(calendar){
      updateUserCalendar(calendar)
      fetchCalendars()
  }

  function handleDeleteCalendar(calendar){
      deleteUserCalendar(calendar)
      fetchCalendars()
  }

  function eventToCalendarEvents(events){
      const readyEvents = [...events.filter((event)=>event.start !== null).map((event)=>{
          event['start'] = new TZDate(event['start'])     
          event['end'] = new TZDate(event['end'])    
          return event
      })]
      return readyEvents
  }


  function fetchCalendars(){
      getUserCalendars().then(data=>{
        const calendars = [...data.map((element) => ({ ...element, isChecked: element.isChecked?element.isChecked:true }))]
        setCalendars(calendars)
      })
      getUserEvents().then(data=>{
        setCalendarsEvents(eventToCalendarEvents(data))
      })
  }


  function fetchEvents(){
      getUserEvents().then(data=>{
        setEvents(data)
      })
  }



  const CalendarProps = { 
      useFormPopup:true,
      useDetailPopup:false,
      usageStatistics:false,
      height:1000,
      isReadOnly: false,
      showSlidebar: true,
      showMenu: true,
      week:{
          startDayOfWeek:1,
          dayNames:['SUN','MON','TUE','WEND','THU','FRI','SAT'],
          workweek:true
          // showTimezoneCollapseButton
          // timezonesCollapsed
          // hourStart
          // hourEnd
          // narrowWeekend
          // eventView
          // taskView
          // collapseDuplicateEvents
      },
      month:{
              startDayOfWeek:1,
              dayNames:['SUN','MON','TUE','WEND','THU','FRI','SAT'],
              workweek:true,
              narrowWeekend:false,
              visibleWeeksCount:4,
      },
      theme:theme,
      // template:template,
      viewModeOptions:viewModeOptions,
      onEventDelete:handleDeleteEvent,
      onEventUpdate:handleUpdateEvent,
      onEventCreate:handleCreateEvent,
      onCalendarDelete:handleDeleteCalendar,
      onCalendarUpdate:handleUpdateCalendar,
      onCalendarCreate:handleCreateCalendar,
      calendarsOnChange:handleCalendarsOnChange,
      selectedEvent:selectedEvent,
      selectedEventOnChange:handleSelectedEventOnChange,
      getEventsByFilters:getEventsByFilters,
      events:events,
  }

  return (

    <div>
        {(loading!==true)&&(
          <MyCalendar 
              {...CalendarProps}
              calendars={calendars}
              calendarsEvents={calendarsEvents}
          />
        )}
    </div>

  )
}

export default MyCalendarWrapper
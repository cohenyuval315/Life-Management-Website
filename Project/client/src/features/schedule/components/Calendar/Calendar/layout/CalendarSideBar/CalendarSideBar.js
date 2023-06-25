import React from 'react'
import './CalendarSideBar.css'
import '../../styles/MyCalendar.css'
import EventList from './../../../../ui/Event/List/index'
import CollapsableList from '../../../../ui/CollapsableList'
import moment from 'moment'
const CalendarSideBar = (props) => {

  const { calendars,
          events,
          calendarsOnChange,
          getEventsByFilters,
          onEventCreate,
          onEventUpdate,
          onEventDelete,
    } = props

  const handleCheckChildElement = (e) => {
      const cloneCheckedCalendars = [...calendars];
      const newCalendars = cloneCheckedCalendars.map((element)=>{
          if (element.id === e.target.value){
              const newElement = {...element,isChecked: e.target.checked}    
              return newElement
          }
          return element
      })
      calendarsOnChange(newCalendars)
  };


  const handleAllChecked = () => {
      const cloneCheckedCalendars = [...calendars];
      const NewCalendars = cloneCheckedCalendars.map((element) => {
          return {...element,isChecked:true}
      });
      calendarsOnChange(NewCalendars)
  };
    const permEvents = [timeEvents,perms]
    const permTasks = [tasks,perms]
    const permRoutines = [routines]
    const permAllDay = [eventsAllDays,perms]
    const permMilestones = [milestones,perms]
    const unscheduledEvents = [unscheduled,timeEvents,nonePerms]
    const unscheduledTasks = [unscheduled,tasks,nonePerms]
    const unscheduledAllDay = [unscheduled,eventsAllDays,nonePerms]
    const unscheduledMilestones = [unscheduled,milestones,nonePerms]
    const uncompletedTasks = [tasks,scheduled,uncomplete]
    const uncompletedPassedTasks = [tasks,scheduled,uncomplete,passed]

    function uncomplete(event){
        return event.isCompleted === false
    }

    function passed(event){
        const endDate = moment(event.end)
        const today = moment()
        if (endDate.isBefore(today)){
            return true
        }
        return false
    }
    function tasks(event){
        return event.category === "task"
    }
    function milestones(event){
        return event.category === "milestone"
    }
    function timeEvents(event){
        return event.category === "time"
    }
    function eventsAllDays(event){
        return event.category === "allday"
    }
    function unscheduled(event){
        return event.start === null
    }
    function scheduled(event){
        return event.start !== null
    }
    function perms(event){
        return event.isPerm === true
    }
    function nonePerms(event){
        return event.isPerm === false
    }

    function routines(event){
        return event.type === "routine"
    }

  return (
            <div id="lnb" className='sidebar-container'>

                <div id="lnb-calendars" className="lnb-calendars">
                <div>
                    <div className="lnb-calendars-item">
                    <label>
                        <input
                        className="tui-full-calendar-checkbox-square"
                        type="checkbox"
                        defaultValue="all"
                        checked={calendars.every(
                            (element) => element.isChecked === true
                        )}
                        onChange={handleAllChecked}
                        />
                        <span />
                        <strong>View all</strong>
                    </label>
                    </div>
                </div>
                <div id="calendarList" className="lnb-calendars-d1">
                    {calendars.map((element, i) => {
                    return (
                        <div key={i} className="lnb-calendars-item">
                        <label>
                            <input
                            type="checkbox"
                            className="tui-full-calendar-checkbox-round"
                            value={element.id}
                            checked={element.isChecked}
                            
                            onChange={(e)=>handleCheckChildElement(e)}
                            />
                            <span
                            style={{
                                borderColor: element.backgroundColor,
                                backgroundColor: element.isChecked
                                ? element.backgroundColor
                                : "transparent"
                            }}
                            />
                            <span>{element.name}</span>
                        </label>
                        </div>
                    );
                    })}
                </div>
                </div>
                    {/* <CollapsableList component={EventList} componentItemName={} data={[]} keyName=''/> */}
                <div className='eventList'>
                    <div className='eventListItem'>
                        <EventList label={"routines"} events={getEventsByFilters(permRoutines)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"uncompleted passed tasks"} events={getEventsByFilters(uncompletedPassedTasks)} isUnscheduled={false} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"uncompleted tasks"} events={getEventsByFilters(uncompletedTasks)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"tasks"} events={getEventsByFilters(permTasks)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"events"}  events={getEventsByFilters(permEvents)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"milestones"} events={getEventsByFilters(permMilestones)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"alldays"}  events={getEventsByFilters(permAllDay)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"task queue schedule"}  events={getEventsByFilters(unscheduledTasks)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"event queue schedule"} events={getEventsByFilters(unscheduledEvents)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"milestone queue schedule"} events={getEventsByFilters(unscheduledMilestones)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>
                    <div className='eventListItem'>
                        <EventList label={"allday queue schedule"} events={getEventsByFilters(unscheduledAllDay)} isUnscheduled={true} onCreate={onEventCreate} onUpdate={onEventUpdate} onDelete={onEventDelete} />
                    </div>



                </div>
            </div>
  )
    // permEvents 
    // permTasks
    // allDay
    // milestones
    // unscheduledEvents
    // unscheduledTasks
    // unscheduledAllDay
    // unscheduledMilestones

}

export default CalendarSideBar
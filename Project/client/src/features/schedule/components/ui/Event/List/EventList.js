import React from 'react'
import EventItem from '../Item/index'
import CollapsableList from '../../CollapsableList/index'

const EventList = (props) => {
  const {events,label} = props
  return (
    <div>
        <div style={{padding:"10px"}}>{label?label:""}</div>
        <div style={{height:"5px",backgroundColor:"black"}}>
        </div>
        <CollapsableList component={EventItem} data={events} componentItemName={"event"}  keyName={"title"} {...props} />
        {/* {(events.map((event)=>{
            return (<EventItem event={event} {...eventFormProps}/>)
        }))} */}
        
    </div>
  )
}

export default EventList
import React from 'react'
import './EventCard.css'

const EventCard = ({event}) => {
  return (
    <div>
        <div className='eventCard'>
        <div className='header'>
        <div><span>{event.title}</span></div>
        <div><span>{event.isComplete===true?"COMPLETED!!":"NOT FINISHED"}</span></div>
        <div><span className='eventBody'>{event.body}</span></div>
        </div>
        </div>
    </div>
  )
}

export default EventCard
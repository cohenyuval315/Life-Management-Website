import React from 'react'
import StyledButton from '../../../../../../components/ui/Button/StyledButton'
import './EventDetails.css'


const EventDetails = ({event,handleClose,onDelete,onEdit}) => {

  function handleSubmit() {
    handleClose()
  }
  function handleEdit() {
    onEdit()
  }
  function handleDelete() {
    onDelete(event.id,event.calendarId)
    handleClose()
  }
  function handleComplete() {
    event.isComplete = true
  }

  return (
    <div>
      <div>
        {event.title}
          {event.isComplete===false?"NOT FINISHED!!":"COMPLETED!"}
      </div>
      <StyledButton name={"complete"} handleOnClick={handleComplete}/>

      <StyledButton name={"cancel"} handleOnClick={handleSubmit}/>
      <StyledButton name={"delete"} handleOnClick={handleDelete}/>
      <StyledButton name={"edit"} handleOnClick={handleEdit}/>
    </div>
  )
}

export default EventDetails
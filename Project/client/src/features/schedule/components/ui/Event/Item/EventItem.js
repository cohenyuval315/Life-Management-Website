import React,{useState} from 'react'
import StyledButton from '../../../../../../components/ui/Button/StyledButton'
import { deleteUserEvent } from '../../../../../../services/api'
import EventForm from '../../../form/Event/index'
import DataModal from '../../../../../../components/ui/PopupModal/StyledPopupModal'
import EventCard from '../Card'

const EventItem = (props) => {
    const {event,onDelete,onUpdate} = props
    const [openUpdateModal,setOpenUpdateModal] = useState(false)

    function handleEventScheduleOnClick(){
        setOpenUpdateModal(true)
    }

    function handleEventDeleteOnClick(){
        onDelete(event)
    }
    function handleEventUpdatedOnClick(){
        onUpdate(event)
    }

    function handleSetOpenUpdateModal(bool){
        setOpenUpdateModal(bool)
    }
    function getSelectedEvent(){
        const scheduleSelectedEvent = event
        scheduleSelectedEvent['start'] = new Date()
        scheduleSelectedEvent['end'] = new Date()
        return scheduleSelectedEvent
    }
  return (
    <div>
        <DataModal isOpen={openUpdateModal} handleSetOpen={handleSetOpenUpdateModal}>
            <div>
            <EventForm handleClose={()=>handleSetOpenUpdateModal(false)} onUpdate={handleEventUpdatedOnClick} isUnscheduled={false} changes={{}}   {...props} event={event}  />
            </div>  
        </DataModal>
        <EventCard event={event}/>
        <StyledButton name={"schedule/edit"} handleOnClick={handleEventScheduleOnClick} />
        <StyledButton name={"delete"} handleOnClick={handleEventDeleteOnClick} />
    </div>
  )
}

export default EventItem
import React from 'react'
import StyledPopupModal from '../../../../../../../components/ui/PopupModal/StyledPopupModal'
import CalendarForm from '../../../..//form/Calendar/index';
import EventForm from '../../../../form/Event/index'
import EventDetails from '../../../../ui/Event/Detail/index'


const CalendarModals = (props) => {
    
    const {

        isOpenModal,
        handleOpenModal,
        handleCloseModal,
        selectedEvent,
        selectedModal,
        handleCalendarCreateEvent,
        handleCalendarUpdateEvent,
        handleCalendarDeleteEvent,
        changes,

            } = props

    function getUnscheduledToScheduleEvent(event){
        const eventWithDate = event
        eventWithDate['start'] = new Date()
        eventWithDate['end'] = new Date()
        return eventWithDate
    }

    function handleSetOpen(){
        handleOpenModal(selectedModal)
    }
    function handleEditOpen(){
        handleOpenModal("updateEvent",true)
    }

  return (
        <div className='modals-container'>
                <StyledPopupModal isOpen={isOpenModal} handleSetOpen={handleSetOpen}>
                    <div>
                    {(selectedModal === "calendar")&&(
                        <CalendarForm />
                    )}
                    {(selectedModal === "createEvent")&&(
                        <EventForm onUpdate={handleCalendarUpdateEvent} onCreate={handleCalendarCreateEvent} event={null} handleClose={handleCloseModal} changes={{}} />
                    )}     
                    {(selectedModal === "updateEvent")&&(
                        <EventForm onUpdate={handleCalendarUpdateEvent} onCreate={handleCalendarCreateEvent} event={selectedEvent} handleClose={handleCloseModal} changes={changes} />
                    )}  
                    {(selectedModal === "detailsEvent")&&(
                        <EventDetails event={selectedEvent} handleClose={handleCloseModal} onDelete={handleCalendarDeleteEvent} onEdit={handleEditOpen} />
                    )}                
                    </div>  
                </StyledPopupModal>

        </div>
  )
}

export default CalendarModals
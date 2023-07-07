/* eslint-disable no-console */
import './styles/MyCalendar.css';
import type { EventObject, ExternalEventTypes, Options } from '@toast-ui/calendar';
import { TZDate } from '@toast-ui/calendar';
import type { ChangeEvent, MouseEvent } from 'react';
import React,{ useCallback, useEffect, useRef, useState } from 'react';
import Calendar from '../TuiCalendar/index';
import CalendarSideBar from './layout/CalendarSideBar/index'
import CalendarMenuBar from './layout/CalendarMenuBar/index'
import CalendarModals from './layout/CalendarModals/index'

type ViewType = 'month' | 'week' | 'day';


interface CalendarPropsTypes {
    [key:string]:any;
    view?: ViewType;
    useFormPopup?:Boolean;
    useDetailPopup?:Boolean;
    isReadOnly?:Boolean;
    usageStatistics?:Boolean;
    eventFilter?:Function;
    week?:{
        startDayOfWeek?:Number;
        dayNames?:String[];
        workweek?:Boolean;
        showTimezoneCollapseButton?:Boolean;
        timezonesCollapsed?:Boolean;
        hourStart?:Number;
        hourEnd?:Number;
        narrowWeekend?:Boolean;
        eventView?:Boolean | String[];
        taskView?:Boolean | String[];
        collapseDuplicateEvents?:Boolean | Object;
    };
    month?:{
        startDayOfWeek?:Number;
        dayNames?:String[];
        workweek?:Boolean;
        narrowWeekend?:Boolean;
        visibleWeeksCount?:Number;
    };
    calendars?:Options['calendars'];
    events?:Partial<EventObject>[];
    gridSelection?:Boolean | {enableDbClick:Boolean,enableClick:Boolean};
    theme?:Options['theme'];
    template?:Options['template'];

}


export default function MyCalendar(props) {

    // calendar config


    const {
        height=900,
        view="week",
        useFormPopup,
        useDetailPopup,
        isReadOnly,
        usageStatistics,
        eventFilter,
        week,
        month,
        gridSelection,
        theme,
        template,
        calendars,
        calendarsEvents,
        onEventDelete,
        onEventUpdate,
        onEventCreate,
        selectedEvent,
        selectedEventOnChange,

        } = props




    const calendarRef = useRef<typeof Calendar>(null);

    const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
    const [selectedView, setSelectedView] = useState(view);
    const [calendarHeight,setCalendarHeight] = useState(height)

    // month config
    const [monthStartDayOfWeek,setMonthStartDayOfWeek] = useState(0)
    const [monthDayNames,setMonthDayNames] = useState<String[]>(['SUN','MON','TUE','WEND','THU','FRI','SAT'])
    const [monthIsWorkWeek,setMonthIsWorkWeek] = useState(false)
    const [monthIsNarrowWeekend,setmonthIsNarrowWeekend] = useState(false)
    const [monthVisibleWeeksCount,setMonthVisibleWeeksCount] = useState(4)

    // week config
    const [weekStartDayOfWeek,setWeekStartDayOfWeek] = useState(0)
    const [weekDayNames,setWeekDayNames] = useState(['SUN','MON','TUE','WEND','THU','FRI','SAT'])
    const [weekIsWorkWeek,setWeekIsWorkWeek] = useState(false)
    const [weekIsShowTimezoneCollapseButton,setWeekIsShowTimezoneCollapseButton] = useState(false)
    const [weekIsTimezonesCollapsed,setWeekIsTimezonesCollapsed] = useState(false)
    const [weekHourStart,setWeekHourStart] = useState(6)
    const [weekHourEnd,setWeekHourEnd] = useState(30)
    const [weekIsNarrowWeekend,setWeekIsNarrowWeekend] = useState(false)


    // need some extra looking
    const [weekTaskView,setWeekTaskView] = useState({})
    const [isShowTaskView,setIsShowTaskView] = useState(true)
    const isShowTaskViewCheckBox = "idk"
    const [weekEventView,setWeekEventView] = useState(false) // [allday,time] ,false ,true  
    const [weekCollapseDuplicateEvents, setWeekCollapseDuplicateEvents] = useState()
  

    // filtered calendars by checkboxes
    // const [checkedCalendars, setCheckedCalendars] = useState(
    //     calendars?calendars.map((element) => ({ ...element, isChecked: true })):[]
    // );

    // const [allEvents, setAllEvents] = useState(events);
    // const [filterEvents, setFilterEvents] = useState(events);
    // // selected event for form 
    // const [selectedEvent,setSelectedEvent] = useState<Object>({})
    // modals

    const modalOptions = ["detailsEvent","calendar","updateEvent","createEvent"]
    const [selectedModal,setSelectedModal] = useState("")
    const [isOpenModal,setIsOpenModal] = useState(false)
    const [changes,setChanges] = useState({})

    // instance
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);


    const updateRenderRangeText = useCallback(() => {
        const calInstance = getCalInstance();
        if (!calInstance) {
        setSelectedDateRangeText('');
        }

        const viewName = calInstance.getViewName();
        const calDate = calInstance.getDate();
        const rangeStart = calInstance.getDateRangeStart();
        const rangeEnd = calInstance.getDateRangeEnd();

        let year = calDate.getFullYear();
        let month = calDate.getMonth() + 1;
        let date = calDate.getDate();
        let dateRangeText: string;

        switch (viewName) {
        case 'month': {
            dateRangeText = `${year}-${month}`;
            break;
        }
        case 'week': {
            year = rangeStart.getFullYear();
            month = rangeStart.getMonth() + 1;
            date = rangeStart.getDate();
            const endMonth = rangeEnd.getMonth() + 1;
            const endDate = rangeEnd.getDate();

            const start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
            const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
            endDate < 10 ? '0' : ''
            }${endDate}`;
            dateRangeText = `${start} ~ ${end}`;
            break;
        }
        default:
            dateRangeText = `${year}-${month}-${date}`;
        }

        setSelectedDateRangeText(dateRangeText);
    }, [getCalInstance]);

    useEffect(() => {
        setSelectedView(view);
    }, [view]);

    useEffect(() => {
        updateRenderRangeText();
    }, [selectedView, updateRenderRangeText]);

    
    const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
        // console.group('onClickDayName');
        // console.log('Date : ', res.date);
        // console.groupEnd();
    };

    const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault()
        if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
        const button = ev.target as HTMLButtonElement;
        const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '');
        getCalInstance()[actionName]();
        updateRenderRangeText();
        }
    };

    const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] = (
        timezoneCollapsed
    ) => {
        console.group('onClickTimezonesCollapseBtn');
        console.log('Is Timezone Collapsed?: ', timezoneCollapsed);
        console.groupEnd();

        const newTheme = {
        'week.daygridLeft.width': '100px',
        'week.timegridLeft.width': '100px',
        };

        getCalInstance().setTheme(newTheme);
    };

    const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        setSelectedView(ev.target.value as ViewType);
    };

    const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
        // console.group('onAfterRenderEvent');
        // console.log('Event Info : ', res);
        // console.groupEnd();
    };

    const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {

        const clickedEvent = res.event
        console.log("clicked Event =",clickedEvent)
        clickedEvent['start'] = clickedEvent['start'].toDate()
        clickedEvent['end'] = clickedEvent['end'].toDate()
        selectedEventOnChange(clickedEvent)
        // console.group('onClickEvent');
        // console.log('MouseEvent : ', res.nativeEvent);
        // console.log('Event Info : ', res.event);
        // console.groupEnd();
        handleOpenModal("detailsEvent",true)
    };

    const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (res) => {
        // console.group('onBeforeDeleteEvent');
        // console.log('Event Info : ', res.title);
        // console.groupEnd();
        const { id, calendarId } = res;
        handleCalendarDeleteEvent(id,calendarId)
    };

    function handleCalendarDeleteEvent(id:any,calendarId:any){
        const deleteEvent = [...calendarsEvents.filter((event)=>event.id === id)][0]
        if(deleteEvent['serialId'] !== undefined && deleteEvent['serialId'] !== null && deleteEvent['serialId'].length > 0){
            if(window.confirm("delete all recurring as well?")){
                const serialId = deleteEvent['serialId'].split('_')
                const index = serialId[0]
                const reccuranceName = serialId[1]

                const toDeleteEvents = calendarsEvents.filter((event)=>{
                    if(event['serialId'] !== undefined && event['serialId'] !== null){
                        const eventSerialId = event['serialId'].split('_')
                        const eventIndex = eventSerialId[0]
                        const eventReccuranceName = eventSerialId[1]
                        if(reccuranceName === eventReccuranceName && index < eventIndex){
                            return event
                        }
                    }    
                    return null
                }).filter((event)=> event !== null)
                console.log(toDeleteEvents)
                toDeleteEvents.map((event)=>{
                    onEventDelete({id:event.id})
                    getCalInstance().deleteEvent(event.id, event.calendarId);
                })
                return
            }
        }
        onEventDelete({id:id})
        getCalInstance().deleteEvent(id, calendarId);
    }

    const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
        console.group('onBeforeUpdateEvent');
        console.groupEnd();
        const targetEvent = updateData.event;
        const placementChanges = { ...updateData.changes };
        setChanges(placementChanges)
        handleCalendarUpdateEvent(targetEvent,targetEvent.id, targetEvent.calendarId, placementChanges)

    };

    function handleCalendarUpdateEvent(event:any,id:any,calendarId:any,changes:any){
        getCalInstance().updateEvent(id, calendarId, changes);
        const eventToUpdate = event
        if(changes !== null && changes !== undefined){
            if(changes['start'] !== null && changes['start'] !== undefined){
                eventToUpdate['start'] = changes['start'].toString()
            }else{
                eventToUpdate['start'] = eventToUpdate['start'].toString()
            }
            if(changes['end'] !== null && changes['end'] !== undefined){
                eventToUpdate['end'] = changes['end'].toString()
            }else{
                eventToUpdate['end'] = eventToUpdate['end'].toString()
            }
        }
        const eventToSelect = eventToUpdate
        onEventUpdate(eventToUpdate)
        eventToSelect['start'] = new TZDate(eventToSelect['start']).toDate(); 
        eventToSelect['end'] = new TZDate(eventToSelect['end']).toDate();
        selectedEventOnChange(eventToSelect)
    }

    const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (eventData) => {
        let calendar = calendars?.filter((calendar)=>calendar.id === eventData.calendarId)[0]
        if(eventData.calendarId === undefined){
           calendar = calendars[0]
        }
        const event = {
            calendarId: eventData?.calendarId || calendar.id,
            objectId:null,
            body:eventData.body || '',
            isReadOnly:eventData.isReadOnly || false,
            recurrenceRule:eventData.recurrenceRule || "",
            type:"event",
            dueDateClass:eventData.dueDateClass || "",
            customStyle:eventData.customStyle || "",
            goingDuration:eventData.goingDuration || 0,
            comingDuration:eventData.comingDuration || 0,
            title: eventData.title,
            isAllday: eventData.isAllday,
            attendees:eventData.attendees || [],
            start: eventData.start,
            end: eventData.end,
            category: eventData.isAllday ? 'allday' : 'time',
            location:eventData.location || "",
            isPrivate:eventData.isPrivate,
            state:eventData.state,
            color:calendar.color ,
            borderColor:calendar.borderColor,
            backgroundColor:calendar.backgroundColor,
            dragBackgroundColor:calendar.dragBackgroundColor,
            raw:"",
            isPerm:false,
            isCompleted:false

        };
        getCalInstance().createEvents([event])
        handleCalendarCreateEvent(event)
    };

    function handleCalendarCreateEvent(event:any){

        const readyEvent = tranformEvent(event)
        console.log("readt eve", readyEvent)
        onEventCreate(readyEvent)
    }

    function tranformEvent(event:any){
        const createEvent = event
        createEvent['isPerm'] = false
        createEvent['isCompleted'] = false
        if(createEvent.start !== null && createEvent.end !== null && createEvent.start !== undefined && createEvent.end !== undefined){
            createEvent.start = createEvent.start.toString();
            createEvent.end = createEvent.end.toString();
        }
        return createEvent 
    }


// menu


    const handleCheckTaskView = () => {
        setIsShowTaskView(!isShowTaskView)
    };

    // height 
    const handleHeightOnChange = (value:any) => {
        setCalendarHeight(value)
    }


    function handleOpenModal(modal:any,state:boolean){
        setSelectedModal(modal)
        setIsOpenModal(!isOpenModal)
        if (state === true || state === false){
            setIsOpenModal(state)
        }
        
    }

    function handleCloseModal(){
        setIsOpenModal(false)
    }

    const menuExtraProps = {
        onClickNavi:onClickNavi,
        selectedDateRangeText:selectedDateRangeText,
        isShowTaskViewCheckBox:isShowTaskViewCheckBox,
        handleCheckTaskView:handleCheckTaskView,
        isShowTaskView:isShowTaskView,
        handleOpenModal:handleOpenModal,
        handleCloseModal:handleCloseModal,
        onChangeSelect:onChangeSelect,
        selectedView:selectedView 
    }

    const modalsExtraProps = {
        isOpenModal:isOpenModal,
        handleOpenModal:handleOpenModal,
        handleCloseModal:handleCloseModal,
        selectedEvent:selectedEvent,
        selectedModal:selectedModal,
        handleCalendarCreateEvent:handleCalendarCreateEvent,
        handleCalendarUpdateEvent:handleCalendarUpdateEvent,
        handleCalendarDeleteEvent:handleCalendarDeleteEvent,
        changes:changes,
    }
  return (
    <div>
      <div id='calendar-feature-container' >
        <div className='screen left side' id='left-side-calendar'>
            <CalendarModals {...props} {...modalsExtraProps}/> 
            <CalendarSideBar {...props}/>
        </div>
        <div className='screen right side'  id='right-side-calendar'>
            <CalendarMenuBar {...props} {...menuExtraProps} /> 

            <div className='calendar-container'>
                <Calendar
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    ref={calendarRef}

                    usageStatistics={false}
                    
                    height={`${calendarHeight}px`}
                    calendars={calendars} // checkedCalendars.map((calendar)=>calendar.isChecked === true)
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    month={{
                        startDayOfWeek:monthStartDayOfWeek,
                        dayNames:['SUN','MON','TUE','WEND','THU','FRI','SAT'],
                        workweek:monthIsWorkWeek,
                        narrowWeekend:monthIsNarrowWeekend,
                        visibleWeeksCount:monthVisibleWeeksCount,
                    }}
                    week={{
                        startDayOfWeek:weekStartDayOfWeek,
                        dayNames:['SUN','MON','TUE','WEND','THU','FRI','SAT'],
                        workweek:weekIsWorkWeek,
                        showTimezoneCollapseButton:weekIsShowTimezoneCollapseButton,
                        timezonesCollapsed:weekIsTimezonesCollapsed,
                        hourStart:weekHourStart,
                        hourEnd:weekHourEnd,
                        narrowWeekend:weekIsNarrowWeekend,
                        eventView:true,
                        taskView:isShowTaskView,
                        // collapseDuplicateEvents
                    }}
                    events={calendarsEvents}
                    template={template}
                    theme={theme}
                    // timezone={{
                    //   zones: [
                    //     {
                    //       timezoneName: 'Israel Standard Time',
                    //       displayLabel: 'jerusalm',
                    //       tooltip: 'UTC+02:00',
                    //     },
                    //   ],
                    // }}
                    isReadOnly={isReadOnly}
                    useDetailPopup={useDetailPopup}
                    useFormPopup={useFormPopup}
                    view={selectedView}
                    onAfterRenderEvent={onAfterRenderEvent}
                    onBeforeDeleteEvent={onBeforeDeleteEvent}
                    onClickDayname={onClickDayName}
                    onClickEvent={onClickEvent}
                    onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
                    onBeforeUpdateEvent={onBeforeUpdateEvent}
                    onBeforeCreateEvent={onBeforeCreateEvent}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
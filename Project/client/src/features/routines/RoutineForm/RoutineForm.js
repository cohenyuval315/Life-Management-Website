import React, { useEffect, useState } from 'react'
import { Icons} from '../../../assets/index.js'
import './RoutineForm.css'

const RoutineForm = ({routine}) => {
    const [title,setTitle] = useState('')
    const [type,setType]= useState()
    const [period,setPeriod] = useState()
    const [target,setTarget] = useState()
    const [measureUnits,setMeasureUnits] = useState()
    const [config,setConfig] = useState()
    const [optional,setOptional] = useState()

    const [expandConfig,setExpandConfig] = useState(false)
    const [expandOptional,setExpandOptional] = useState(false)

    const [timeRange,setTimeRange] = useState()
    const [timeRangeStart,setTimeRangeStart] = useState()
    const [timeRangeEnd,setTimeRangeEnd] = useState()

    const [hideAfterSuccess,setHideAfterSuccess] = useState(true)
    const [showInDayView,setShowInDayView] = useState(false)
    const [showInCalendar,setShowInCalendar] = useState(true)

    const radioPeriodOptions = ['Daily','Weekly', 'Monthly', 'Quaterly','Yearly']
    const radioTypesOptions = [{label:"trying to build",value:'positive'},{label:"trying to quit",value:'negative'}]
    function handleTimeRangeStartOnChange(e){
        setTimeRangeStart(e.target.value)
    }
    function handleTimeRangeEndOnChange(e){
        setTimeRangeEnd(e.target.value)
    }

    function handleShowInCalendarOnChange(e){
        setShowInCalendar(!showInCalendar)
    }
    function handleShowInDayViewOnChange(e){
        setShowInDayView(!showInDayView)
    }
    function handleHideAfterSuccessOnChange(e){
        setHideAfterSuccess(!hideAfterSuccess)
    }

    const optionalOptions=[
        {
            label:"tags",
            component:""
        },
        {
            label:"categories",
            component:""
        },
        {
            label:"priority",
            component:""
        },
        {
            label:"isDreadfull",
            component:""
        },
        {
            label:"duration",
            component:""
        },
    ]

    const configOptions = [
        {
            label:"during day time range",
            from:timeRangeStart,
            fromOnChange:handleTimeRangeStartOnChange,
            to:timeRangeEnd,
            toOnChange:handleTimeRangeEndOnChange,
            type:"time-range",
        },
        {
            label:"auto hide after success",
            value:hideAfterSuccess,
            type:"checkbox",
            onChange:handleHideAfterSuccessOnChange,
            children:[
            ]

        },
        {
            label:"show in day view",
            value:showInDayView,
            type:"checkbox",
            onChange:handleShowInDayViewOnChange,
            children:[
            ]

        },
        {
            label:"show in calendar",
            value:showInCalendar,
            type:"checkbox",
            onChange:handleShowInCalendarOnChange,
            children:[
            ]
        },
    ]
    const [formString,setFormString] = useState()
    useEffect(() => {
        if (routine !== null && routine !== undefined){
            setTitle(routine.title)
            setType(routine.type)
            setPeriod(routine.period)
            setTarget(routine.target)
            // config
            // optional
        }
    
      return () => {
        
      }
    }, [])


    function handleTypeOnChange(event) {
        setType(event.currentTarget.value)
    }

    function handlePeriodOnChange(event){
        setPeriod(event.currentTarget.value)
    }
    function handleTargetOnChange(event){
        setTarget(event.currentTarget.value)
    }
    function handleMeasureUnitsOnChange(event){
        setMeasureUnits(event.target.value)
    }

  return (
    <div className='routine-form-container' onKeyDown={(e)=>e.stopPropagation()}>
        <div className='routine-form-header'>{routine?'update':'new'}</div>
        <div className='routine-form-title-wrapper'>
            <div className='routine-form-title'>
                <div className='routine-form-title-span-wrapper'>
                    <input className='routine-form-title-input' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
            </div>
        </div>

        <div className='routine-form-type-header'>routine type</div>




        <div className='routine-form-type'>
            {radioTypesOptions.map((option)=>(
                <div className='routine-form-type-radio-wrapper' onClick={(e)=>setType(option.value)}>
                    <input className='routine-form-type-radio' type='radio' 
                    name="positive"
                    value={option.value}
                    checked={type === option.value}
                    onChange={handleTypeOnChange}
                    />
                    <label className='routine-form-radio-type-label'  >{option.label}</label>
                </div>
            ))}
        </div>

        <div className='routine-form-period-header'>period </div>
        <div className='routine-form-period'>
            {(radioPeriodOptions.map((option)=>(
                <div className='routine-form-period-option' key={option}  onClick={(e)=>setPeriod(option)}>

                    <input className='routine-form-period-input' type='radio' 
                    name={option}
                    value={option}
                    checked={period === option}
                    onChange={handlePeriodOnChange}
                    />
                    <label className='routine-form-period-label'>{option}</label>

                </div>
            )))}
        </div>
        <div className='routine-form-target-header'>target </div>
        <div className='routine-form-target'>
            <input className='routine-form-target-number-input' type={'number'} value={target} onChange={handleTargetOnChange}/>
            <input className='routine-form-target-measure-units' type={'text'} value={measureUnits} onChange={handleMeasureUnitsOnChange}/>
        </div>
        <div className='routine-form-string'></div>
            <span className='routine-form-string-span'>{formString}</span>



        <div className='routine-form-config'>
            <div className='routine-form-config-header' onClick={()=>setExpandConfig(!expandConfig)}>
                {expandConfig?Icons.ChevronDown:Icons.ChevronRight}
                config
            </div>
            {expandConfig?(
                <div className='routine-form-config-options'>
                    {configOptions.map((option)=>(
                        <>
                            {/* <div className='routine-form-config-option-header'>{option.label}</div>
                         */}
                                {option.type === 'time-range'?(<>
                                    <div className='routine-form-config-option-header'>{option.label}</div>
                                    <div className='routine-form-config-option-time-wrapper'>
                                        <div className='routine-form-config-option-time-range'>
                                            <input className='routine-form-config-option-time-range-input' type={'text'} value={option.from} onChange={option.fromOnChange}/>
                                        </div>
                                        <span>and</span>
                                        <div className='routine-form-config-option-time-range'>
                                            <input className='routine-form-config-option-time-range-input' type={'text'} value={option.to} onChange={option.toOnChange}/>
                                        </div>
                                    </div></>
                                ):null}
                                {option.type === 'checkbox'?(

                                    <div className='routine-form-config-option-checkbox-wrapper'>
                                            <div className='routine-form-config-option-checkbox-input-wrapper'> 
                                                <input type={'checkbox'}  className='routine-form-config-option-checkbox-input' value={option.value} onChange={option.onChange}/>
                                            </div>
                                            <div className='routine-form-config-option-checkbox-label'>{option.label}</div>
                                            {(option.value === true && option.children.length > 0?(
                                                <>
                                                    {option.children.map((childOption)=>(   
                                                        <div className='routine-form-config-child-option-wrapper'>
                                                            <div className='routine-form-config-child-option-input'>
                                                            </div>
                                                            <div className='routine-form-config-child-option-label'>
                                                            </div>
                                                        </div>

                                                    ))}
                                                </>
                                            ):null)}
                                    </div>
                                ):null}

                        </>
                    ))}


                </div>
            ):null}
        </div>

        <div className='routine-form-optional'>
            <div className='routine-form-optional-header' onClick={()=>setExpandOptional(!expandOptional)}>
                {expandOptional?ChevronDownIcon:ChevronRightIcon}
                optional
            </div>

            {expandOptional?(
                <div className='routine-form-optional-options'>
                    {(optionalOptions.map((option)=>(
                        <div className='routine-form-optional-option-wrapper'>
                            <div className='routine-form-optional-option-label'>{option.label}</div>
                            {option.component}
                        </div>)))}
                </div>
            ):null}
        </div>


        <div className='routine-form-submit'>submit</div>
    </div>
  )
}

export default RoutineForm
import React, { useState,useEffect } from 'react'
import RRule from 'rrule'
import Select from 'react-select'
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button } from '@material-ui/core';
import { updateEvents } from '../../services/api';
//{label:"MINUTELY",value:RRule.MINUTELY}

// first , deafauly not repeat selected
// every day.. week . month year,custom
// custom => 
// reapeat every 1 day/wekk/year/motnth ,
// ends = never,onDate,after 6 occorense

export const RadioButton = (props) => {
  const { changed, id, isSelected, label, value } = props;
  return (
    <div className="RadioButton">
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
      />

    </div>
  );
};

const rruleFrequencies = [{label:"HOURLY",value:RRule.HOURLY},{label:"DAILY",value:RRule.DAILY},{label:"WEEKLY",value:RRule.WEEKLY},{label:"MONTHLY",value:RRule.MONTHLY},{label:"YEARLY",value:RRule.YEARLY}]
const rrulesWeekDays = [{label:"SUNDAY",value:RRule.SU},{label:"MONDAY",value:RRule.MO},{label:"TUESDAY",value:RRule.TU},{label:"WENDSDAY",value:RRule.WE},{label:"THURSDAY",value:RRule.TH},{label:"FRIDAY",value:RRule.FR},,{label:"SATERDAY",value:RRule.SA}]
const rrulesMonths = [{label:"JAN",value:1},{label:"FEB",value:2},{label:"MAR",value:3},{label:"APR",value:4},{label:"MAY",value:5},{label:"JUN",value:6},{label:"JUL",value:7},{label:"AUG",value:8},{label:"SEP",value:9},{label:"OCT",value:10},{label:"NOV",value:11},{label:"DEC",value:12}]

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "blue",
      color:"white"
    };
  },
  multiValueLabel: (styles, { data }) => {
    return {
      ...styles,
      color:"white"
    };
  },

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
        ...provided, 
            opacity, 
        transition ,
        backgroundColor:"white"
    };
  },
  container: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
        ...provided, 
            opacity, 
        transition ,
        backgroundColor:"white"
    };
  },
}

const RRuleForm3 = ({dtStart,setDtStart,until,setUntil,setEventRRuleString, eventRRuleString}) => {


    const [rruleString,setRRuleString] = useState("")
    const [rruleText,setRRuleText] = useState("")

    const [freq,setFreq] = useState(rruleFrequencies[0])
    const [count,setCount]= useState("")
    const [interval,setInterval]= useState("")

    const [byWeekDay,setByWeekDay]= useState(null)
    const [byMonth,setByMonth]= useState(null)

    const [byHour,setByHour]= useState("")
    const [byMinute,setByMinute]= useState("")

    useEffect(() => {

      let rrule = undefined
      if ((eventRRuleString !== undefined)&&(eventRRuleString !== null)&&(eventRRuleString.length>0)){
          rrule = RRule.fromString(eventRRuleString)
      }
      if (rrule !== undefined && rrule !== null ){
        setRRuleText(rrule.toText())
        setRRuleString(rrule.toString())
        setDtStart(new moment(rrule.options.dtstart))
        setUntil(new moment(rrule.options.until))
        setFreq([...rruleFrequencies.filter((item)=>item.value === rrule.options.freq)][0])
        setCount(rrule.options.count)
        setInterval(rrule.options.interval)
        setByWeekDay([...rrulesWeekDays.filter((item)=>rrule.options.byweekday.includes(item.value.weekday))])  
        setByMonth([...rrulesMonths.filter((item)=>rrule.options.bymonth.includes(item.value))])
        setByHour(rrule.options.byhour.join())
        setByMinute(rrule.options.byminute.join())
      }
    }, [])
    

    useEffect(() => {

      const rrule = getCurrentRRule()
      if (rrule!== null){
        setRRuleString(rrule.toString())
        setRRuleText(rrule.toText())
        setEventRRuleString(rrule.toString())
      }
      
    }, [freq,dtStart,until,count,interval,byWeekDay,byMonth,byHour,byMinute])
    

    function validateInteger( strValue ) {
    /************************************************
    DESCRIPTION: Validates that a string contains only
        valid integer number.

    PARAMETERS:
      strValue - String to be tested for validity

    RETURNS:
      True if valid, otherwise false.
    **************************************************/
      var objRegExp  = /(^-?\d\d*$)/;  

      //check for integer characters
      return objRegExp.test(strValue);
    }

    function getValuesFromOptions(arr){
        const newArr = arr.map((item)=>item.value)
        if (newArr.length === 1){
            return newArr[0]
        }
        return newArr
    }


    function getCurrentRRule(){
        const rrule= {
          tzid: 'Asia/Jerusalem',
          wkst:RRule.SU,
        }
        rrule["freq"] = freq.value
        if ((dtStart!==undefined)&&(dtStart!==null)){
            rrule["dtstart"] = dtStart.toDate()
        }
        if ((until!==undefined)&&(until!==null)){  
            rrule["until"] = until.toDate()
        }
        if ((count!==undefined)&&(count!==null)&&(count!=="")){
            rrule["count"] = parseInt(count)
        }
        if ((interval!==undefined)&&(interval!==null)&&(interval!=="")){
            rrule["interval"] = parseInt(interval)
        }
        if ((byWeekDay!==undefined)&&(byWeekDay!==null)&&(byWeekDay.length > 0)){
            rrule["byweekday"] = getValuesFromOptions(byWeekDay)
        }
        if ((byMonth!==undefined)&&(byMonth!==null)&&(byMonth.length > 0)){
            rrule["bymonth"] = getValuesFromOptions(byMonth)
        }
        if ((byHour!==undefined)&&(byHour!==null)&&(byHour!=="")&&checkIfValidIntArray(byHour)){
            rrule["byhour"] = intArrayToList(byHour)
        }
        if ((byMinute!==undefined)&&(byMinute!==null)&&(byMinute!=="")&&checkIfValidIntArray(byMinute)){
            rrule["byminute"] = intArrayToList(byMinute)
        }
        return new RRule(rrule)
    }

    function checkIfValidIntArray(text){
        const arr = text.split(",")
        arr.map((item)=>(validateInteger(item)))
        if (arr.includes(false)){
            return false
        }
        return true
    }

    function intArrayToList(text){
        const arr = text.split(",")
        const newArr = [...arr.map((int)=>{
            return parseInt(int)
        })]
        return newArr
        
    }

    function handleSubmit(){
        console.log(rruleString)
    }

    function handleCountOnChange(e){
      setCount(e.target.value) 
        if (!validateInteger(e.target.value)){
            console.log("must be integer")
            setCount("")
        }         
    }

    function handleIntervalOnChange(e){
      setInterval(e.target.value) 
        if (!validateInteger(e.target.value)){
            console.log("must be integer")
            setInterval("")
        }  
    }

    function handleHourOnChange(e){
      setByHour(e.target.value) 
    }

    function handleMinuteOnChange(e){
      setByMinute(e.target.value) 
    }

    function handleFreqOnChange(e){
        setFreq(e)
    }

    function handleByWeekDayOnChange(e){
        setByWeekDay(e)
    }

    function handleByWMonthOnChange(e){
        setByMonth(e)
    }


  return (
    <div style={{backgroundColor:"gray", color:"black", width:"800px",height:"800px", display:"block"}} >

        <div className='rruleShow'>
          <div style={{fontSize:"20px"}}>
              current rrule:
          </div>
            <div className='verticalDivider' style={{height:"20px"}}>
            </div>  
            <div style={{fontSize:"15px"}} className='rrule text'>  
              text: 
            </div>
            <div style={{fontSize:"20px",color:"#8b0000", wordBreak:"break-all"}}>
              {rruleText}
            </div>
            <div className='verticalDivider' style={{height:"20px"}}>
            </div>
            <div style={{fontSize:"15px"}} className='rrule text'>  
              string: 
            </div>
            <div style={{fontSize:"20px",color:"#8b0000", wordBreak:"break-all"}}>
              {rruleString}
            </div>
            <div className='verticalDivider' style={{height:"20px"}}>
            </div>
        </div>

        <div className='freq'>
          <div>
            freqency:
          </div>
          <div>
            <Select styles={customSelectStyles} value={freq} onChange={handleFreqOnChange} options={rruleFrequencies}/>
          </div>
        </div>

        <div className="verticalDivider" style={{height:"20px"}}>
        </div>

        <div className='dates' style={{display:"inline-flex"}}>
              <div >
                <div>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="from"
                      value={dtStart}
                      onChange={(newValue) => {
                        setDtStart(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className='horizontalDivider' style={{width:"20px"}}>
              </div>

              <div >
                <div>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker

                      renderInput={(props) => <TextField {...props} />}
                      label="until:"
                      value={until}
                      onChange={(newValue) => {
                        setUntil(newValue);
                      }}
                      minDate={dtStart?dtStart.toDate():new Date()}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              
        </div>

        <div className='count'>
          <TextField value={count} placeholder={"count"} onChange={handleCountOnChange}/>
        </div>

        <div className='interval'>
          <TextField value={interval} placeholder={"interval"} onChange={handleIntervalOnChange}/>
        </div>

        <div className='byWeekDay'>
          by weekdays
          <Select isMulti value={byWeekDay} options={rrulesWeekDays} onChange={handleByWeekDayOnChange} styles={customSelectStyles} placeholder={"weekdays"}/>
        </div>

        <div className='byMonth'>
          by month:
          <Select isMulti value={byMonth} options={rrulesMonths} onChange={handleByWMonthOnChange} styles={customSelectStyles}  placeholder={"months"}/>
        </div>

        <div className='hours'>
          by hour:
          <TextField value={byHour} placeholder={"hour"} onChange={handleHourOnChange} />
        </div>

        <div className='minutes'>
          by minute:
          <TextField value={byMinute} placeholder={"minute"} onChange={handleMinuteOnChange}/>
        </div>

        <div>
          
          <Button onClick={handleSubmit}>console</Button>
        </div>

    </div>
  )
}

export default RRuleForm3
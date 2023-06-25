import React, { useState,useEffect } from 'react'
import RRule from 'rrule'
import moment from 'moment';
import StyledSelect from '../../../../../components/ui/Select/StyledSelect';
import StyledDateTimePicker from '../../../../../components/ui/DateTimePicker/StyledDateTimePicker';
import StyledTextField from '../../../../../components/ui/TextField/StyledTextField';
import StyledButton from '../../../../../components/ui/Button/StyledButton';

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

const rruleFrequenciesData = [{label:`HOURLY`,value:RRule.HOURLY},{label:"DAILY",value:RRule.DAILY},{label:"WEEKLY",value:RRule.WEEKLY},{label:"MONTHLY",value:RRule.MONTHLY},{label:"YEARLY",value:RRule.YEARLY}]
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

const RRuleForm = ({dtStart,setDtStart,until,setUntil,setEventRRuleString, eventRRuleString}) => {


    const [rruleString,setRRuleString] = useState("")
    const [rruleText,setRRuleText] = useState("")

    const [rruleFrequencies,setRRuleFrequencies] = useState(rruleFrequenciesData)

    const [freq,setFreq] = useState(null)
    const [count,setCount]= useState("")
    const [interval,setInterval]= useState("")

    const [byWeekDay,setByWeekDay]= useState(null)
    const [byMonth,setByMonth]= useState(null)

    const [byHour,setByHour]= useState("")
    const [byMinute,setByMinute]= useState("")

    // const [dtStart,setDtStart] = useState()

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
        if(freq !== undefined  && freq !== null ){
          const label = rruleFrequenciesData.filter((item)=>item.value === freq.value)[0].label
          setFreq({label:label+ " " + getCurrentRRule().toText(), value:freq.value}) 
        }
        
      }
      
    }, [dtStart,until,count,interval,byWeekDay,byMonth,byHour,byMinute])
    

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
        if(freq === undefined || freq === null){
          rrule["freq"] = RRule.DAILY
        }else{
          rrule["freq"] = freq.value
        }
        
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

    function handleHandleUntilOnChange(e){
        setUntil(e)
    }
    function handleHandleDtStartOnChange(e){
        setDtStart(e)
    }

    function rruleFreqs(){
      return rruleFrequencies.map((freq)=>{return {label:freq.label+ " " + getCurrentRRule().toText(), value:freq.value}})
    }

    function handleClearOnClick(){
        setDtStart(null)
        setUntil(null)
    }

  return (
    <div style={{backgroundColor:"gray", color:"black", width:"800px",height:"1000px", display:"block"}} >

        <div className='rruleShow'>
          <div style={{fontSize:"20px"}}>
              current rrule:
          </div>

            <div style={{fontSize:"15px"}} className='rrule text'>  
              text: 
            </div>
            <div style={{fontSize:"20px",color:"#8b0000", wordBreak:"break-all"}}>
              {rruleText}
            </div>

            <div style={{fontSize:"15px"}} className='rrule text'>  
              string: 
            </div>
            <div style={{fontSize:"20px",color:"#8b0000", wordBreak:"break-all"}}>
              {rruleString}
            </div>

        </div>
        <StyledSelect label={'freqency'} values={freq} handleChange={handleFreqOnChange} options={rruleFreqs()} />  
        <StyledDateTimePicker label={"dtStart"} value={dtStart} onChange={handleHandleDtStartOnChange}/>
        <StyledDateTimePicker label={"until"} value={until} onChange={handleHandleUntilOnChange} />
        <StyledButton name={"clear"} handleOnClick={handleClearOnClick}/>
        <StyledTextField label={"count"} value={count} placeholder={"count"} handleChange={handleCountOnChange}/>
        <StyledTextField label={"interval"} value={interval} placeholder={"interval"} handleChange={handleIntervalOnChange}/>
        <StyledSelect label={"by weekdays"} isMulti values={byWeekDay} options={rrulesWeekDays} handleChange={handleByWeekDayOnChange} placeholder={"weekdays"}/>
        <StyledSelect label={"by month"} isMulti values={byMonth} options={rrulesMonths} handleChange={handleByWMonthOnChange} placeholder={"months"}/>
        <StyledTextField label={"by hour"} value={byHour} placeholder={"hour"} handleChange={handleHourOnChange} />
        <StyledTextField label={"by minute"} value={byMinute} placeholder={"minute"} handleChange={handleMinuteOnChange}/>
    </div>
  )
}

export default RRuleForm
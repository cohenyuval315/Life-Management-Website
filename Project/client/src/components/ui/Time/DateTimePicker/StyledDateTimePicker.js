import React,{useState,useEffect} from 'react'
import StyledTimePicker from '../TimePicker/StyledTimePicker'
import StyledDatePicker from '../../DatePicker/StyledDatePicker'
import './DateTimePicker.css'
import moment from 'moment';

const StyledDateTimePicker = ({label,value,onChange}) => {

    let isDate = function (input) {
      if (Object.prototype.toString.call(input) === "[object Date]")
        return true;
      return false;
    };

    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());

    useEffect(() => {
      onChange(getCurrentDateTime())
    }, [])

    function handleValueChange(){
      if(value !== undefined && value !== null){
          setDate(moment(value))
          setTime(moment(value).add(1, 'minutes'))
      }
    }

    useEffect(() => {
      handleValueChange()
      onChange(getCurrentDateTime())

    }, [])
    useEffect(() => {


      onChange(getCurrentDateTime())

    }, [date,time])
    
    function getCurrentDateTime(){
        const datetime =  moment(date.format('DD.MM.YYYY') +" "+ time.format('HH:mm:ss'),'DD.MM.YYYY HH:mm:ss')
        return datetime.toDate()
    }

    function handleTimeOnChange(e){
        setTime(e)
    }

    function handleDateOnChange(e){
        setDate(e)  
    }

  return (
    <div className='dateTimeContainer'>
        {(label !== undefined) && (
          <div className='dateTimeLabel'>
            {label}
          </div>
        )}
      <div className='dateTimeDateTimeData'>
          <div className='dateTimeDateContainer'>
            <StyledDatePicker value={date} onChange={handleDateOnChange}/>
          </div>

          <div className='dateTimeTimeContainer'>
            <StyledTimePicker value={time} onChange={handleTimeOnChange}/>
          </div>
      </div>
    </div>
  )
}

export default StyledDateTimePicker
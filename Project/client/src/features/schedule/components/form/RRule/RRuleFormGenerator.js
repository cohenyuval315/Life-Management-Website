// @import '~bootstrap/dist/css/bootstrap.css';       // this lib uses boostrap (v. 4.0.0-beta.2)
// @import '~react-rrule-generator/build/styles.css'; // react-rrule-generator's custom CSS
import RRuleGenerator from 'react-rrule-generator';
import React,{useState,useEffect} from 'react'
import RRule from 'rrule';
import 'react-rrule-generator/build/styles.css' // react-rrule-generator's custom CSS
import StyledButton from '../../../../../components/ui/Button/StyledButton';
import StyledDatePicker from '../../../../../components/ui/DatePicker/StyledDatePicker';

const RRuleFormGenerator = ({start,handleChange,value}) => {
    const [state,setState] = useState({"rrule":''})
    // const [rruleStart,setRRuleStart] = useState(start)
    // const [isStart,setIsStart] = useState(true)

    // useEffect(() => {
    //     setRRuleStart(start)

    // }, [start])

      useEffect(() => {
        if(validateRRule(state.rrule)){
            
            const r = RRule.fromString(state.rrule)
            console.log("rr",r)
            handleChange(state.rrule)
        }else{
            handleChange("")
        }
        
    }, [state])  



    function handleStringChange(r){

        // if(isStart === true){
        //     const rr = RRule.fromString(r['rrule'])
        //     rr['options']['dtstart'] = rruleStart.toDate()
        //     setState(rr.toString())
        //     return
        // }
        setState(r)

    }

    // function handleStartOnChange(e){
    //     setRRuleStart(e)
    // }

    // function handleIsStartOnChange(){
    //     setIsStart(!isStart)
    // }

    function validateRRule(rruleString){
        if(rruleString.length === 0){
            return false
        }
        return true
    }

  return (
    <div>
        {/* <div>isStart?<input value={"isStart"} name={"isStart"} type="checkbox" checked={isStart} onChange={handleIsStartOnChange}/></div>
        {(isStart===true && (
            <StyledDatePicker value={rruleStart}  onChange={handleStartOnChange} />
        ))} */}
        <RRuleGenerator
            value={value}
            onChange={(rrule) => handleStringChange({ rrule })}
            config={{
            repeat: ['Monthly', 'Weekly','Yearly','Daily','Hourly'],
            yearly: 'on the',// on / on the
            monthly: 'on',// on /on the
            end: ['Never','after','On date'],
            hideStart:false,
            hideEnd:false,
            weekStartsOnSunday: true,
            // hideError: true,
            }}
        />
    </div>
  )
}

export default RRuleFormGenerator
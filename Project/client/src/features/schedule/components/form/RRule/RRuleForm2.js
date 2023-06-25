import React,{useState} from 'react'
import StyledButton from '../../ui/Button/StyledButton'
import RRuleStepOne from './RRuleStepOne'
import RRuleStepTwo from './RRuleStepTwo'

const RRuleForm2 = ({rrule}) => {
    const radioOptions = ["do not repeat","daily","weekly","monthly","yearly","custom"]

    const [rruleString,setRRuleString] = useState("")
    const [rruleText,setRRuleText] = useState("")

    const [stepOneState,setStepOneState] = useState("do not repeat")
    const [stepTwoState,setStepTwoState] = useState("")
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);

    function handlePageForward(){
        setPage(1)
    }

    function handleSubmit(){

    }

    function handleOpenOnClick(){
        setOpen(true)
    }

    function handleStepTwoStateOnChange(data){
      setStepTwoState(data)
    }

    function handleStepOneStateOnChange(name){
      setStepOneState(name)
    }

    function renderPage(){
        if(page === 0){
            return (<RRuleStepOne stepOneState={stepOneState} setOpen={setOpen} handleStepOneStateChange={handleStepOneStateOnChange} radioOptions={radioOptions} handlePageForward={handlePageForward}/>)
        }
        if(page === 1){
            return (<RRuleStepTwo stepTwoState={stepTwoState} handleStepTwoStateChange={handleStepTwoStateOnChange} handleSubmit={handleSubmit}/>)
        }
    }

  return (
    <div>
        <div>
          <StyledButton handleOnClick={handleOpenOnClick} name={"repeat?(rrule text)"}/>
        </div>
          {(open===true)&& (
            renderPage()
          )}
    </div>
  )
}

export default RRuleForm2
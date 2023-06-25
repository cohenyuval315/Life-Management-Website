import React,{useState,useEffect} from 'react'
import Select from 'react-select'

const useSelect = (arr) => {
    const [arr,setArr] = useState(arr)
    const [arrSelectOptions,setArrSelectOptions] = useState()

    useEffect(() => {
        arrToSelectOptions()
    }, [arr])
    
    function arrToSelectOptions(){
        setArrSelectOptions([...arr.map((item)=>{return{label:item.name,value:item.name}})]);
        setArr(arrSelectOptions.map((item)=>getValueFromArrLabel(item.label)))    
    }
    function getValueFromArrLabel(label){
        return arr.filter((item)=>item.name===label)[0]
    }
    return {arr,arrSelectOptions}

}




const SelectComponent = ({values,options,handleChange,...props}) => {
    function handleOnChange(e){
        handleChange(e)
    }
    // api call 
  return (
    <div>
        <Select value={values} options={options} onChange={handleOnChange} styles={} {...props}/> 
    </div>
  )
}





export default useSelect
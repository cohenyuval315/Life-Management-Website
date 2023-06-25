import React from 'react'
import Select from "react-select";
import './StyledSelect.css'

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',

    padding: 10,
  }),
  control: (_, { selectProps: { width }}) => ({
    width: width
  }),

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#34282C",
      color:"white"
    };
  },
  multiValueLabel: (styles, { data }) => {
    return {
      ...styles,
      color:"white"
    };
  },

  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    padding: 5,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
        ...provided, 
            opacity, 
        transition ,
        backgroundColor: "#34282C",
        padding:"5px",
        color:"white"
    };
  },
  container: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
        ...provided, 
            opacity, 
        transition ,
        backgroundColor: "#EADDCA",

    };
  },
}

const StyledSelect = ({label,values,options,handleChange,...props}) => {
    function handleOnChange(e){
        handleChange(e)
    }
    // api call 
  return (
        <div className='selectDiv' >
            <div className='selectDivLabel'>
                {label}
            </div>
            <div className='selectDivSelect'>
              <Select value={values} options={options} onChange={handleOnChange} styles={customSelectStyles} {...props}/> 
            </div>
        </div>
  )
}

export default StyledSelect
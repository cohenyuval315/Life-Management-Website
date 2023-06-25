import React from 'react'
import './Tooltip.css'

const Tooltip = ({text , children, ...styles}) => {
    if (typeof text !== 'string'){
        console.log("TOOLTIP:FAIL:NOT TEXT")
        return null
    }
  return (
    <div>
        <div>
        <div className="tooltip" style={{...styles}}>
            <span className="tooltiptext">
              {text}
            </span>
            <div className='tooltipChildren'>
              {children}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Tooltip
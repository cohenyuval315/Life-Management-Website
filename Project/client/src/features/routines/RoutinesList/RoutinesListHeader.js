import React from 'react'
import { Icons } from "../../../assets/index.js";
import './RoutinesListHeader.css'

const RoutinesListHeader = () => {
  return (
    <div className='routines-list-header-wrapper'>
        <div className='routines-list-header-flex'>
            <input className='routines-list-search-bar'/>
            <div className='routines-list-sort-by-wrapper'>
                {Icons.BarChart}
            </div>
            <div className='routines-list-group-by-wrapper'>
                {Icons.Pen}
            </div>
            <div className='routines-list-add-new-wrapper'>
                <button>new</button>
            </div>
        </div>
    </div>
  )
}

export default RoutinesListHeader
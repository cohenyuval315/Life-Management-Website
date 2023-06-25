import React from 'react'
import './RoutinesList.css'

const routinesHeaderItems = [
    {

    },
    {

    }
]

const routines = [
    {

    },
    {

    }
]

const RoutinesList = () => {

  return (
    <div className='routines-list-items-wrapper'>
        <div className=''></div>
        <div className='routines-list-items'>
            <div className='routines-list-items-headers-flex'>
                {(routinesHeaderItems.map((item)=>(
                    <div className='routines-list-header-item'>

                    </div>
                )))}
            </div>
            <div className='routines-list-wrapper'>
                {routines.map((routine)=>(
                    <RoutinesListItem routine={routine}/>                
                ))}
            </div>
        </div>
    </div>
  )
}



const RoutinesListItem = ({routine}) => {
    const routineTableOptions = [
        {
            label:"icon",
            value:""
        },
        {
            label:"title",
            value:""
        },
        {
            label:"1",
            value:""
        },
        {
            label:"2",
            value:""
        },
        {
            label:"3",
            value:""
        },
        {
            label:"4",
            value:""
        },
        {
            label:"5",
            value:""
        },
        {
            label:"6",
            value:""
        },
        {
            label:"7",
            value:""
        },
        {
            label:"8",
            value:""
        },

    ]
  return (
    <div className='routine-item-wrapper'>
        <div className='routine-item-flex'>
            {routineTableOptions.map((option)=>(
                <div className='routine-item-table-column'>
                        
                </div>
            ))}
        </div>
    </div>
  )
}


export default RoutinesList
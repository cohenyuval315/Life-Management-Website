import React from 'react'
import './ListCard.css'

const ListCard = ({arr,arrKey}) => {
  return (
    <div className='listCardArrContainer'>
        <div className='arrayKey'>
            {arrKey}
        </div>
        <ul className='arrListCardUL'>
            {arr.map((item)=>{
                return (
                    <li key={item} className='arrListCardLI'>
                        {item}
                    </li>
                )
            })}         
        </ul>
    </div>
  )
}

export default ListCard
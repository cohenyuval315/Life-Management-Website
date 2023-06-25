import React from 'react'
import './ItemCard.css'

const ItemCard = ({itemKey,itemValue}) => {
  return (
    <div className='itemCard'>
        <div className='itemKey'>
            {itemKey}
        </div>
        <div className='itemValue'>
            {itemValue}
        </div>
    </div>
  )
}

export default ItemCard
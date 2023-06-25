import React from 'react'
import { isArray } from '../../../../utils/helpers'
import ItemCard from '../ItemCard/ItemCard'
import ListCard from '../ListCard/ListCard'
import './DataCard.css'

const DataCard = ({object}) => {
    const data =  Object.entries(object).map(([key,value]) =>{
                        if(isArray(value)){
                            return (
                                <div className='listDataCardContainer'>
                                    <ListCard arrKey={key} arr={value}/>
                                    
                                </div>
                            )
                        }
                        return (
                            <div className='itemDataCardContainer'>
                                <ItemCard itemKey={key} itemValue={value} />
                            </div>
                        )
                })

  return (
    <div>
        {data}
    </div>
  )
}

export default DataCard
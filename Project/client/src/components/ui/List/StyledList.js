import React from 'react'
import './StyledList.css'

const StyledList = ({items,Component}) => {
  return (
      <div className='StyledListDiv'>
        <List>
            {items.map((item,index)=>{
                return (
                  <div key={`styledListItem${index}`}>
                      <ListItem>
                        <Component item={item} />
                      </ListItem>
                  </div>)
            })}
        </List>
      </div>
  )
}

export default StyledList


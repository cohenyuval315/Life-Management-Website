import React from 'react'


const LifeCalendar = () => {
  const today = new Date().now()
  const birth = new Date(1997,8,11)
  const daysDiff = Math.floor((today - birth) / (1000*60*60*24))

  return (
    <div>LifeCalendar</div>
  )
}

export default LifeCalendar
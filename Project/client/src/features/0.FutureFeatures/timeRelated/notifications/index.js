
import React,{useEffect,useState} from 'react'

function showNotification(){
}
const index = () => {
const currentDate = new Date()
const [notifications,setNotifications] = useState()

function fetchNotifications(){

}

useEffect(() => {
  fetchNotifications()
  const timeout = setTimeout(() => showNotification(), notifications.expirationDate-currentDate);

  return () => { 
    clearTimeout(timeout) 
  };
}, []);


  return (
    <div>index</div>
  )
}

export default index

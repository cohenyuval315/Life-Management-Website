import React from 'react'
import { Link } from 'react-router-dom'
import './NotesListHeader.css'


const NotesListHeader = ({activeItem,onCreate}) => {
  return (
    <div className='notes-header-container'>
        <div className='new-button-wrapper'>
            <Link to={'/wiki/new'}>new</Link>
        </div>
    </div>
  )
}





export default NotesListHeader
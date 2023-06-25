import React, { useEffect, useState } from 'react'
import AppLeftSidebarDrawer from '../../../layouts/AppLeftSidebarDrawer'
import './NotesList.css'
import SearchBar from '../../../components/common/SearchBar/index'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Icons } from '../../../assets/index.js'
const NotesHeader = ({item}) => {
  return (
    <>
        <div style={{border:"1px solid white"}}>
            {item.component?item.component:item.title}
        </div>
    </>
  )
}

const NotesBodyHeader = ({item}) => {
  return (
    <>
        <div style={{border:"1px solid white"}}>
            {item.title}
        </div>
    </>
  )
}



const bodyHeadersData = [
    {
        id:"1",
        title:"bodyheader1"
    },
    {
        id:"2",
        title:"bodyheader2"
    },
    {
        id:"3",
        title:"bodyheader3"
    },
]




const NotesList = ({sortOptions,notes,sortBy,onSort,activeNote,setActiveNote,onDelete,onUpdate}) => {
    if (!sortOptions || !onSort){
        return null
    }

  const handleSortBy = (sortBy) => {
     onSort(sortBy)
 }

  return (
    <>
        <div style={{padding:"5px"}}>
            <select name="sort-by" value={sortBy} onChange={(event) => handleSortBy(event.target.value)}>
                {sortOptions.map((sort,index)=>(<option key={index} id={index}>{sort}</option>))}
            </select>
        </div>
        <ul className='notes-list-ul'>
            {(notes.map((note)=>{
                return (
                    <NoteListItem key={note.id} item={note} activeItem={activeNote} onActive={setActiveNote} onDelete={onDelete}/>
                )
            }))}
        </ul>
    </>
  )
}


const NoteListItem = ({item,activeItem,onActive,onDelete}) => {
    const [hoverNote,setHoverNote] = useState(false);
    const navigate = useNavigate();
    function handleOnClick(){
        onActive(item)
        navigate(`/wiki/${item.id}`)
    }   

    return (
        <li style={{cursor:"pointer"}} onMouseOver={()=>setHoverNote(true)} onMouseOut={()=>setHoverNote(false)}  className={['note-list-item ', `${activeItem?.id === item?.id?"active-note":""}`,hoverNote?"note-on-hover":""].join(' ')} onClick={()=>handleOnClick()}>
            <div className='note-label-div'>
                {item.title}
            </div>

            <div className={['hide-note-toolbar',hoverNote?"note-toolbar":""].join('')}>   
                <div className='delete-note-button-wrapper'>
                    <button  onClick={()=>{window.confirm('delete note?')?onDelete(item):console.log("not deleted")}} className='delete-note-button'>{Icons.Xmark}</button>
                </div>
            </div>

        </li>
    )
}

export default NotesList
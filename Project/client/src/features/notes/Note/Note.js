import React from 'react'
import { useNavigate } from 'react-router-dom'

const Note = ({note}) => {

    const navigate = useNavigate()

    function handleEditClick(){
        navigate(`/wiki/${note.id}/edit`)
    }

  return (
    <div>
        <h1>Note</h1>
        <button onClick={handleEditClick}>edit</button>
    </div>
  )
}

export default Note
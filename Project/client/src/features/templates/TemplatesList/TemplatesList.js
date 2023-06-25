import React from 'react'
import './TemplatesList.css'
import TemplateForm from '../TemplateForm/TemplateForm'

export const TemplatesHeader = () => {
  return (
    <div>
        <div>
        </div>
        <div>
          <button onClick={()=>{}}>new</button>
        </div> 
    </div>
  )
}

export const TemplatesList = ({templates,onDelete,onUpdate}) => {
  return (
    <div>
      <TemplatesHeader/>
      {(templates.map((template)=>{
        <TemplatesListItem item={template} />
      }))}
      
    </div>
  )
}

export const TemplatesListItem = ({item}) => {
  return (
    <div>
    </div>
  )
}


export default TemplatesList
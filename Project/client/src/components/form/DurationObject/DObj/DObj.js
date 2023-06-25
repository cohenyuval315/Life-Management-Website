import React from 'react'
import './DObj.css'

const DObj = (props) => {
    const {item} = props
    console.log("DOBJ item",item)
  return (
    <div>
        <div>
            name:{item.name}
        </div>
        <div>
            duration:{item.duration}
        </div>
        <div>
            objId:{item.objectId}
        </div>
        <div>
            parents:{item.parentsIds.length > 0 ? item.parentsIds.map((id)=>(<div>{id}</div>)): "none"}
        </div>
        <div>
            props:{item.properties.length > 0 ? item.properties.map((prop)=>(<div>{prop.name}</div>)): "none"}
        </div>
    </div>
  )
}

export default DObj
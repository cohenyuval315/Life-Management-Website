import { TextField } from '@mui/material'
import { Button } from 'antd'
import React, { useState,useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'


const EdgeForm = ({edge,x,y}) => {
    const [userObjects,setUserObjects] = useState(null)
    const [userEdges,setUserEdges] = useState(null)
    const [parentObject, setParentObject] = useState(null)
    const [childObject, setChildObject] = useState(null)
    const [weight, setWeight] = useState(null)
    const [connectionType,setConnectionType] = useState(null)
    const [group,setGroup] = useState(null)
    const [config,setConfig] = useState(null)

    const [nodeName,setNodeName] = useState("")


    function handleNodeNameOnChange(nodeName){
    }


    function createNewEdge(){
        const newEdge = {
            id: uuidv4(),
            name: nodeName,
            parentObjectId:objectid1,
            childObjectId:objectid2,
            weight:[{key:"default",value:"1"}],
            connectionType:"default",
            x:x,
            y:x,
            view:{
                breakPoints:[{x:100,y:20},{x:20,y:100}],
                color:"#d3d3d3",
                fontColor:"white",
                fontSize:8,
                fontWeight:"normal",
                highlightColor: 'lightblue', //default SAME
                highlightFontSize:8,
                highlightFontWeight:"normal",
                labelProperty:"label",
                mouseCursor:"pointer",
                renderLabel:false,
                semanticStrokeWidth:false,
                strokeWidth:1.5,
                markerHeight:6,
                markerWidth:6,
                typestring:"STRAIGHT",// default:STRAIGHT,CURVE_SMOOTH,CURVE_FULL
                strokeDasharray:0,
                strokeDashoffset:0,
                strokeLinecap:"butt"//default:butt, round,sqaure
            }

        }
    }
    useEffect(() => {
      

      return () => {
        
      }
    }, [])
    

  return (
    <div>
        <div>
            <TextField value={nodeName} onChange={handleNodeNameOnChange} placeholder={"node name"}/>
            <Button onClick={createNewNode}>submit</Button>
        </div>
    </div>
  )
}

export default EdgeForm
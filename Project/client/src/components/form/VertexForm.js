import { TextField } from '@mui/material'
import { Button } from 'antd'
import React, { useState,useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import { getEdges, getObjects } from '../../services/api/index'

const VertexForm = ({node,x,y, group}) => {
    const defaultConfig = {}
    const [userObjects,setUserObjects] = useState(null)
    const [userNodes,setUserNodes] = useState(null)
    const [nodeEdges,setNodeEdges] = useState(null)

    const [nodeObjectId,setNodeObjectId] = useState(null)
    const [nodeGroup,setNodeGroup] = useState("") // remove 
    const [nodeConfig,setNodeConfig] = useState(defaultConfig)
    const [nodeName,setNodeName] = useState("")

    useEffect(() => {
        if(node !== undefined && node !== null){

            setNodeName(node.name)
            setNodeConfig(node.config)
            setNodeGroup(node.group)
            setNodeObjectId(node.objectId)

            getEdges().then(data=>{
                setNodeEdges(data.filter((edge)=>(edge["childObjectId"]===node.id || edge["parentObjectId"] === node.id)))
                })
        }
    
      return () => {
        
      }
    }, [])
    
    useEffect(() => {
      getObjects().then(data => {
        setUserObjects(data.filter((obj)=>[...obj.features.map((feature)=>feature.name)].includes("flows")))
      })

    //   getNodes().then(data => {
    //     setUserNodes(data)
    //   })

      return () => {
        
      }
    }, [])
    
    const getCurrentNode(){
        id = uuidv4().toString()
        if(node !== undefined && node !== null){
            id = node.id
        }
        const currentNode = {
            id:id,
            name:nodeName,
            objectId:nodeObjectId,
            group:nodeGroup,
            config:nodeConfig,
            // svg:null,
            x:x,
            y:y,
        }
        
        return currentNode
    }
    const extraConfig = {   
           
    }
    function handleNodeNameOnChange(e){
        setNodeName(e.target.value)
    }

    function isExistNodeObjectIdInGroup(nodeId,objectId,group){
        return false
    }

    function validateNode(node){

        if (node.x === null || node.x === undefined){
            console.log("x has to be defined")
            return false
        }
        if (node.y === null || node.y === undefined){
            console.log("y has to be defined")
            return false
        }
        if (node.group === null || node.group === undefined){
            console.log("group invalid length")
            return false
        }
        if (node.group.length > 12){
            console.log("group invalid length")
            return false
        }
        if (node.group.length < 2){
            console.log("group invalid length")
            return false
        }
        if (node.group.length === 0){
            console.log("group invalid length")
            return false
        }

        if (node.name === null || node.name === undefined){
            console.log("name invalid length")
            return false
        }
        if (node.name.length > 12){
            console.log("name invalid length")
            return false
        }
        if (node.name.length < 2){
            console.log("name invalid length")
            return false
        }
        if (node.name.length === 0){
            console.log("name invalid length")
            return false
        }

        if(nodeObjectId !== null && isExistNodeObjectIdInGroup(node.id,nodeObjectId,nodeGroup)){
            console.log("objectId already exists in group of nodes")
            return false
        }
    

        return true
    }

    function updateNode(){
        const updateNode = getCurrentNode()
        if (validateNode(updateNode)){
            console.log("node SUCCESS ! updating==",updateNode)
        }
        console.log("node, failed",updateNode)

    }

    

  return (
    <div>
        <div>
            <TextField value={nodeName} onChange={handleNodeNameOnChange} placeholder={"node name"}/>
            <Button onClick={updateNode}>submit</Button>
        </div>
    </div>
  )
}

export default VertexForm
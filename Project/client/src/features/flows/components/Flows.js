import React, { useState,useEffect } from 'react'
import { getObjects } from '../../../services/api/index'

// list of objects
const Flows = () => {
    const [userObjects, setUserObjects] = useState(null)
    // const [userEdges,setUserEdges] = useState(null)

    useEffect(() => {
        getObjects().then(data=>{
            const flowsObjects = [...data.filter((obj)=>[...obj.features.map((feature)=>feature.name)].includes("flows"))]
            setUserObjects(flowsObjects)
        })
        // getEdges().then(data=>{
        //     setUserEdges(data)
        // })
      return () => {
        
      }
    }, [])

    // function getCurrentEdges(){
        
    // }

    // function updateUserEdges(){
    //     if (validateEdges(getCurrentEdges())){
    //         updateEdges(getCurrentEdges())
    //     }
    //     console.log("edges=",getCurrentEdges())  
    // }

    // function validateEdges(){
    //     return false
    // }


  return (
    <div>
        <div>

        </div>

        <div>
            
        </div>
    </div>
  )
}




export const FlowsList = ({}) => {
  return (
    <div></div>
  )
}

export default Flows
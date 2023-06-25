import React,{useState} from 'react'
import './Graph.css'
import GraphLayout from '../../../layouts/Graph'
import useKeyPress from '../../../hooks/useKeyPress'

const Graph = ({children}) => {

    const [isOpen,setIsOpen] = useState(false)
    const onKeyPress = (event) => {
        setIsOpen(!isOpen)
    };

    useKeyPress(["g"],onKeyPress)

  return (<>
      {isOpen?(
        <GraphLayout title={"graph"}>
          {children}
        </GraphLayout>
      ):null}
    </>
  )
}



export const Graph2 = () => {
  return (
      <>
      </>
  )
}


export default Graph
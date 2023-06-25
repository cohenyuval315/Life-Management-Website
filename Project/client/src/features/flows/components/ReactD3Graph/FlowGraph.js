import React ,{useState,useEffect}from 'react'
import {Graph} from 'react-d3-graph'
import { v4 as uuidv4 } from 'uuid';
import firespace from './../../../../.userFiles/images/firespace.jpeg'
import './FlowGraph.css'
import {Button} from '@mui/material'
// graph payload (with minimalist structure)
// const data = {
//     nodes: [
//       {id: 'Harry'},
//       {id: 'Sally'},
//       {id: 'Alice'}
//     ],
//     links: [
//         {source: 'Harry', target: 'Sally'},
//         {source: 'Harry', target: 'Alice'},
//     ]
// };

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
// const myConfig = {
//     nodeHighlightBehavior: true,
//     node: {
//         color: 'lightgreen',
//         size: 120,
//         highlightStrokeColor: 'blue'
//     },
//     link: {
//         highlightColor: 'lightblue'
//     }
// };

// Callback to handle click on the graph.
// @param {Object} event click dom event



const FlowGraph = ({myConfig,initialData}) => {
     const [data, setData] = useState(initialData)
     const [visableForm, setVisableForm] = useState(false)

     const background = firespace

     useEffect(() => {
        console.log("data=>",data)
        console.log("links",data.links)
        console.log("nodes",data.nodes)
        const newLinks = [...data.links,{source:1,target:5}]
        const newNodes = [...data.nodes,{id:5,name:"heey", x:600,y:700}]
        const newData = {nodes:newNodes,links:newLinks}
        console.log("newData=>",newData)
        setData(newData)

     return () => {
     
     }
     }, [])


     const onClickGraph = function(event) {
          if (window.confirm("create new node?")){
               addNode(event.clientX, event.clientY)
          }
          
     };

     const onClickNode = function(nodeId, node) {
          // window.alert('Clicked node ${nodeId} in position (${node.x}, ${node.y})');
     };

     const onDoubleClickNode = function(nodeId, node) {
          // window.alert('Double clicked node ${nodeId} in position (${node.x}, ${node.y})');
     };

     const onRightClickNode = function(event, nodeId, node) {
          // window.alert('Right clicked node ${nodeId} in position (${node.x}, ${node.y})');
     };

     const onMouseOverNode = function(nodeId, node) {
          // window.alert(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);

     };

     const onMouseOutNode = function(nodeId, node) {
          // window.alert(`Mouse out node ${nodeId} in position (${node.x}, ${node.y})`);
     };

     const onClickLink = function(source, target) {
          // window.alert(`Clicked link between ${source} and ${target}`);
     };

     const onRightClickLink = function(event, source, target) {
          // window.alert('Right clicked link between ${source} and ${target}');
     };

     const onMouseOverLink = function(source, target) {
          // window.alert(`Mouse over in link between ${source} and ${target}`);
     };

     const onMouseOutLink = function(source, target) {
          // window.alert(`Mouse out link between ${source} and ${target}`);
     };

     const onNodePositionChange = function(nodeId, x, y) {
          window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
     };

     // Callback that's called whenever the graph is zoomed in/out
     // @param {number} previousZoom the previous graph zoom
     // @param {number} newZoom the new graph zoom
     const onZoomChange = function(previousZoom, newZoom) {
          // window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
     };

     
     function addNode(x,y){
          const id = uuidv4().toString()
          const newNode = {
            id: id,
            name: id,
            objectId: null,
            group:"test",
            x:x,
            y:y,
            config:myConfig.node
          }
          const newNodes = [...data.nodes,newNode]
          const newLinks = [...data.links]
          const newData = {nodes:newNodes,links:newLinks}
          setData(newData)
     }

     function removeNode(nodeId){

     }

  return (
    <div className='graphBackground' style={{backgroundImage: "url(" + background + ")", minHeight:"800px", maxWidth:"100%"}} >

          <div className='graphDiv'>
               <Graph
                    id={"graphId"} // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                    onClickGraph={onClickGraph}
                    onClickNode={onClickNode}
                    onDoubleClickNode={onDoubleClickNode}
                    onRightClickNode={onRightClickNode}
                    onClickLink={onClickLink}
                    onRightClickLink={onRightClickLink}
                    onMouseOverNode={onMouseOverNode}
                    onMouseOutNode={onMouseOutNode}
                    onMouseOverLink={onMouseOverLink}
                    onMouseOutLink={onMouseOutLink}
                    onNodePositionChange={onNodePositionChange}
                    onZoomChange={onZoomChange}
               />
          </div>
          <div className='graphToolbar'>
          </div>
    </div>
  )
}

export default FlowGraph
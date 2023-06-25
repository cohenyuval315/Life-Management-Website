import { Button } from '@mui/material'
import React ,{useState,useEffect}from 'react'
import FlowGraph from './FlowGraph'

const FlowGraphWrapper = ({}) => {

    const myConfig = {
        // staticGraphWithDragAndDrop  null default
        staticGraphWithDragAndDrop:true,
        height:800,
        width:1000,
        nodeHighlightBehavior: true,
        directed:true,
        initialZoom:1,//null default
        maxZoom:8,
        minZoom:0.1,
        highlightOpacity:1,
        node: {
            color: 'lightgreen',
            fontColor:"black",
            fontSize:8,
            fontWeight:"normal",
            highlightColor:"SAME",
            highlightFontSize:8,
            highlightFontWeight:"normal",
            highlightStrokeColor:"blue",//default SAME
            highlightStrokeWidth:"SAME",
            labelPosition:"center",//left right top botton center, default null
            labelProperty:"id", // can be firstName, can be function,...
            mouseCursor:"pointer",
            opacity:1,
            renderLabel:true,
            // size:{ cause my links to disapear
            //     height:200,
            //     width:300,
            // },
            size:500,
            
            strokeColor:"none",
            strokeWidth:1.5,
            svgstring:"",
            symbolTypestring:"circle",
            viewGenerator:null,// function that recieves a node return jsx

        },
        link: {
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
        },
        d3: {
        }
    };
    const d3 = {

    }
    const firstMountOnlyConfigDefaults = {
        freezeAllDragEvents:false
    }
    const dynamicConfigsDefaults = {
        focusAnimationDuration:0.75, //
        height:400,
        width:800

    }
    const performanceTaxingConfigsDefaults={
        linkHighlightBehavior :false
    }
    const [groupConfig,setGroupConfig] = useState(myConfig)
    const [groupEdges, setGroupEdges] = useState(null)
    const [groupObjects,setGroupObjects] = useState(null)
    const [toggle, setToggle] = useState(false)

    const data = {
        nodes: [
            {
            id: 1,
            name: "A",
            x: 50,
            y: 300
            },
            {
            id: 2,
            name: "B",
            x: 40,
            y: 330
            },
            {
            id: 3,
            name: "C",
            x: 40,
            y: 510
            },
            {
            id: 4,
            name: "D",
            x: 400,
            y: 200
            }
        ],
        links: [
            {
            source: 1,
            target: 2
            //label: "A-B",
            },
            {
            source: 1,
            target: 3
            //label: "A-C",
            },
            {
            source: 2,
            target: 4
            //label: "A-D",
            }
        ]
    // focusedNodeId: "Alice"
    };

    function handleToggleStaticOnClick(){
        setToggle((prev)=>!prev)
        const newConfig = groupConfig
        newConfig["staticGraphWithDragAndDrop"] = !toggle
        console.log("new config" , newConfig)
        setGroupConfig((prev)=>newConfig)
    }

  return (
    <div>
        <Button onClick={handleToggleStaticOnClick}>toggle static</Button>
        <FlowGraph myConfig={groupConfig} initialData={data}/>
    </div>
  )
}

export default FlowGraphWrapper
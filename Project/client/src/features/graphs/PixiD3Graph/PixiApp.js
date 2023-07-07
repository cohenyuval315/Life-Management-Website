  import React, { useRef, useEffect, useState } from "react";
import './PixiApp.css'
import {PixiManager,IScene} from "./Pixi/PixiManager";
import { Container } from "pixi.js";
import { InteractiveScene } from "./D3Graph/InteractiveScene";
export class Scene extends Container {
    
}

function PixiApp() {
  const containerRef = useRef(null);
  const groupInBoxTypes = ["treemap","force"]
  const [isShowTemplate,setIsShowTemplate] = useState(false)
  const [isGroupInBox,setIsGroupInBox] = useState(false)
  const [GroupInBoxType,setGroupInBoxType] = useState(groupInBoxTypes[0])
  const [NodesStrength,setNodesStrength] = useState()
  const [clusterIntraLinksStrength,setClusterIntraLinksStrength] = useState()
  const [clusterInterLinksStrength,setClusterInterLinksStrength] = useState()

    // const nodeHoverTooltip = React.useCallback((node) => {
    //   return <div>{node.id}</div>
    // }, []);


  async function initApp(){

    const height = 400|| containerRef.current.clientHeight;
    const width = containerRef.current.clientWidth;
    PixiManager.initialize(width, height);
    PixiManager.initializeViewport(width, height);
    const scene = new InteractiveScene()
    PixiManager.changeViewportScene(scene)
    
    // PixiManager.app.stage

    return () => {
      app.destroy(true, true);
    };
  }


  useEffect(() => {
      const startApp = async () => {
        const {destroy} = await initApp()
      }
      startApp()
  }, [])
  

  return (
      <div className="canvas-items-wrapper">
          <div className="canvas-toolbar">
            <button onClick={()=>console.log()} style={{color:"black"}}>reset</button>
            <input type='search'/>
            <input type='checkbox' />show arrows
            <input type='checkbox' />show hidden
            <input type='checkbox' />group in a box
            
          </div>
          <div id="canvas-wrapper" ref={containerRef} onKeyDown={(e)=>e.stopPropagation()}>    
              <canvas id="pixi-canvas" />
          </div>
      </div>
    )
}




export default PixiApp



// /*
// // -Search in graph by (tags,groups,syntax:( like google dorks )), file:, path:, '-'  remove this  ',' another, able to save to template filter
// // -show arrows (directional or not)
// // -backlinks - breadcrumbs to go back where i clicked from  graph, 
// // -node groups = dynamic colors
// // -cluster groups 
// // -node popup 
// // -clusters removing temporary , depend on chosen stuff depend on depth
// // -depth number to links to go deeper on select
// // -encrypt node name , password show , property = a.c.d name = lol => encrpy a.c.d , on pass => lol
// // -link types
// // -show Hidden nodes
// // -show empty nodes (orphans)
// // -categories => clusters NOT SHOW IN MASTER LIST , only for graph clusters
// // -node size,actions,popover,isvisable,(grouprank?)
// // -link weight = (name, value), color,source,target,type,template


// // -depth number to links to go deeper on show
// // -creatable group
// // -incoming links option
// // -outcoming links option
// // -neighbors links
// // -tags,
// 1.general layout:
// -able to open multiple notes
// -

// 2.markdown notes:
// -math
// -rank in link => [[link]](1-10) => link types
// -properties for note => basicly json , querieable, : --- prop:"" ---
// -favorites , pinnable
// -title: link: type: producer: tags:== block   ,,  can create template  == BLOCKS
// -block inheritance
// -add link to pdf + refereance to certain div 
// -add audio , pictres markdown
// -create reminders with REMIND
// -create projects with PROJECT
// -create events with EVENT
// -create tasks with TODO, allow *[] = ticking checkboxes of for tasks (TODO)
// -name = id => link to note
// -template markdown note structures
// -[[nodename]] => without referance create new *orphan
// -#name => tag 
// -state => synstax : $%^&* idk but enum state (  @$ test = construction "test", @^ test= commplete 'test', none = ongoing )
// -syntax: referal = #[[]],   in-senstance(also ref but not the same as ,go to here->, more of passive) : [[]] , diffrent strcutres ,meaning more on later
// -daily nots = date = journal
// -// notes structure / remooendation like -> coceptional notes , live like project // CONCEPTIONAL NOTE TAKING
// - orphans nodes without parents


// 7.search-area/templates:
// -template searchs
// -template queries
// -extra custom query syntax: example:-CALENDAR query
// -create filters / queries  = Query:(and [[]] [[]]) , table view with args=> block,type,tags,link // should stick with mysql probably
// -mysql querys or others


// 3.graph:
// -Search in graph by (tags,groups,syntax:( like google dorks )), file:, path:, '-'  remove this  ',' another, able to save to template filter
// -show arrows (directional or not)
// -backlinks - breadcrumbs to go back where i clicked from  graph, 
// -node groups = dynamic colors
// -cluster groups 
// -node popup 
// -clusters removing temporary , depend on chosen stuff depend on depth
// -depth number to links to go deeper on select
// -encrypt node name , password show , property = a.c.d name = lol => encrpy a.c.d , on pass => lol
// -link types
// -show Hidden nodes
// -show empty nodes (orphans)
// -categories => clusters NOT SHOW IN MASTER LIST , only for graph clusters
// -node size,actions,popover,isvisable,(grouprank?)
// -link weight = (name, value), color,source,target,type,template


// 10.CODE SNIPPETS:
//  template shortcuts snnippets


// 4.mind maps:
//   -combine categories and notes



// 5.local graphs:
// -depth number to links to go deeper on show
// -creatable group
// -incoming links option
// -outcoming links option
// -neighbors links
// -tags,

// 6.masterlist for tasks and routines for more action than data:
// - diffrent features graph :


// 9.dashboard:
// -dashboard queories blocks widgets

// */ 
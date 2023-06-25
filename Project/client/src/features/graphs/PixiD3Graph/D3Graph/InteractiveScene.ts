import { Container, Graphics, InteractionEvent, Sprite ,settings, Circle, Texture, BitmapText,SCALE_MODES, Text, Point, TARGETS} from "pixi.js";
import { IScene, PixiManager } from "../Pixi/PixiManager";
// import { DUMMY_DATA as graph } from './DummyData'
import {runD3Layout} from '../D3/D3Layout'
import * as d3 from 'd3';
import { GlobalInput } from "../D3/GlobalInput";
import { Cull} from '@pixi-essentials/cull'
import forceInABox from './ForceInABox'
import { node } from "prop-types";

// color by depth
// then color by group / tags
// cluster by 
//

// INSTEAD OF ID , DIFFRENT NAMES ACCOYNM 
 const DummyData={
  "nodes": [
    {
      "id": 1,
      "name": "Andy",
      "gender": "male",
      "group":"1",
    },
    {
      "id": 2,
      "name": "Betty",
      "gender": "female",
      "group":"2",
    },
    {
      "id": 3,
      "name": "Cate",
      "gender": "female",
      "group":"1",
    },
    {
      "id": 4,
      "name": "Dave",
      "gender": "male",
      "group":"1",
    },
    {
      "id": 5,
      "name": "Ellen",
      "gender": "female",
      "group":"1",
    },
    {
      "id": 6,
      "name": "Fiona",
      "gender": "female",
      "group":"1",
    },
    {
      "id": 7,
      "name": "Garry",
      "gender": "male",
      "group":"1",
    },
    {
      "id": 8,
      "name": "Holly",
      "gender": "female",
      "group":"1",
    },
    {
      "id": 9,
      "name": "Iris",
      "gender": "female",
      "group":"2",
    },
    {
      "id": 10,
      "name": "Jane",
      "gender": "female",
      "group":"2",
    }
  ],

  "links": [
    {
      "source": 1,
      "target": 2
    },
    {
      "source": 1,
      "target": 5
    },
    {
      "source": 1,
      "target": 6
    },

    {
      "source": 2,
      "target": 3
    },
    {
      "source": 2,
      "target": 7
    }
  ,

    {
      "source": 3,
      "target": 4
    },
    {
      "source": 8,
      "target": 3
    }
  ,
    {
      "source": 4,
      "target": 5
    }
  ,

    {
      "source": 4,
      "target": 9
    },
    {
      "source": 5,
      "target": 10
    }
  ]
}

const graph = DummyData

const RESOLUTION = window.devicePixelRatio;
const NODE_RADIUS = 15;
const NODE_BORDER_WIDTH = 2;
const NODE_BORDER_COLOR = 0xffffff;
const NODE_BORDER_RADIUS = NODE_RADIUS + NODE_BORDER_WIDTH;
const NODE_HIT_WIDTH = 5;
const NODE_HIT_RADIUS = NODE_RADIUS + NODE_HIT_WIDTH;
const NODE_HOVER_BORDER_COLOR = 0x000000;
const ICON_FONT_FAMILY = 'Material Icons';
const ICON_FONT_SIZE = NODE_RADIUS / Math.SQRT2 * 2;
const ICON_COLOR = 0xffffff;
const ICON_TEXT = nodeData => typeof nodeData.id === 'number' || typeof nodeData.id === 'string' && (!isNaN(parseInt(nodeData.id[0], 10)) || nodeData.id[0] === '(') ? 'star' : 'person';
const LABEL_FONT_FAMILY = 'HelveticaRegular';
const LABEL_FONT_SIZE = 12;
const LABEL_COLOR = 0x333333;
const LABEL_TEXT = nodeData => `${nodeData.id}`;
const LABEL_PADDING = 4;
const LABEL_BACKGROUND_COLOR = 0xffffff;
const LABEL_BACKGROUND_ALPHA = 0.5;
const LABEL_HOVER_BACKGROUND_COLOR = 0xeeeeee;
const LABEL_HOVER_BACKGROUND_ALPHA = 1;
const LINK_SIZE = linkData => Math.log((linkData.value || 1) + 1);
const LINK_COLOR = 0xcccccc;
const LINK_HOVER_COLOR = 0x999999;
const TEXTURE_COLOR = 0xffffff;
const CIRCLE = 'CIRCLE';
const CIRCLE_BORDER = 'CIRCLE_BORDER';
const ICON = 'ICON';
const LABEL = 'LABEL';
const LABEL_BACKGROUND = 'LABEL_BACKGROUND';
const LINE = 'LINE';


export class InteractiveScene extends Container implements IScene {
    
    private timeElapsed:number = 0
    private clampy: Sprite;
    private clampyVelocity: number;
    private classNodes:any[] = graph.nodes;
    private classEdges:any[] = graph.links;
    private visualLinks:Graphics = new Graphics();
    private simulation:any;
    private dragging:any = false;
    constructor() {
        super();


        this.clampy = Sprite.from("./clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.height = 10;
        this.clampy.width = 10;
        this.clampy.x = PixiManager.width / 2;
        this.clampy.y = PixiManager.height / 2;
        this.addChild(this.clampy);

        this.clampyVelocity = 5;
        // this.clampy
        // .on('click',this.onClick,this)   
        // .on('pointerdown', this.onDragStart,this)
        // .on('pointerup',this.onDragEnd,this)
        // .on('pointerupoutside', this.onDragEnd,this)
        // .on('pointermove', this.onDragMove,this)
        // .on('tap',this.onTap,this)
        // .on('mouseover',this.onMouseOver,this)
        // .on('mouseout',this.onMouseOut,this)

        this.clampy.interactive = true;

        const color = (function() {
            let scale = d3.scaleOrdinal(d3.schemeCategory10);
            return (num) => parseInt(scale(num).slice(1), 16);
        })();


        const linksLayer = new Container();
        this.addChild(linksLayer);

        const frontLinksLayer = new Container();
         this.addChild(frontLinksLayer);

        const nodesLayer = new Container();
        this.addChild(nodesLayer);

        const frontNodesLayer = new Container();
         this.addChild(frontNodesLayer);

        const linkLabelsLayer = new Container();
        this.addChild(linkLabelsLayer);

        const frontLinkLabelsLayer = new Container();
         this.addChild(frontLinkLabelsLayer);

        const nodeLabelsLayer = new Container();
        this.addChild(nodeLabelsLayer);

        const frontNodeLabelsLayer = new Container();
         this.addChild(frontNodeLabelsLayer);


      const circleGraphics = new Graphics();
      circleGraphics.lineStyle(0);
      circleGraphics.beginFill(TEXTURE_COLOR,1);
      circleGraphics.drawCircle(NODE_RADIUS, NODE_RADIUS, NODE_RADIUS);
      circleGraphics.endFill();
      const circleTexture = PixiManager.app.renderer.generateTexture(circleGraphics);

      const circleBorderGraphics = new Graphics();
      circleBorderGraphics.lineStyle(NODE_BORDER_WIDTH, TEXTURE_COLOR);
      circleBorderGraphics.drawCircle(NODE_BORDER_RADIUS, NODE_BORDER_RADIUS, NODE_RADIUS);
      const circleBorderTexture = PixiManager.app.renderer.generateTexture(circleBorderGraphics);

      const iconTextures = new Map([...new Set(graph.nodes.map(nodeData => ICON_TEXT(nodeData)))].map(icon => {

        const iconText = new Text(icon, {
          fontFamily: ICON_FONT_FAMILY,
          fontSize: ICON_FONT_SIZE,
          fill: TEXTURE_COLOR
        });
        const iconTexture =  PixiManager.app.renderer.generateTexture(iconText);
        return [icon, iconTexture];

      }));

      const circleBorder = new Sprite(circleBorderTexture);
      circleBorder.name = CIRCLE_BORDER;
      circleBorder.x = -circleBorder.width / 2;
      circleBorder.y = -circleBorder.height / 2;
      circleBorder.tint = NODE_BORDER_COLOR;

      const icon = new Sprite(iconTextures.get('person'));
      icon.name = ICON;
      icon.x = -icon.width / 2;
      icon.y = -icon.height / 2;
      icon.tint = ICON_COLOR;



















      const testNodes = graph.nodes
      const linksitems = new Graphics();

      const testLinks = graph.links
      console.log("pre simulation testnodes = ",testNodes, "pre sim links", testLinks)

      const simulation = d3.forceSimulation().nodes(this.classNodes)
            .force("link", d3.forceLink(this.classEdges) // This force provides links between nodes
                .id((d) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
                .distance(50)
            )
            .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(PixiManager.width / 2, PixiManager.height / 2))
            .force("collision", d3.forceCollide().radius((d) => d.radius).iterations(200))
            .velocityDecay(0.8);
    

    const template = "force";
      
    // let groupingForce = forceInABox()
    //   .strength(0.1) // Strength to foci
    //   .template(template) // Either treemap or force
    //   .groupBy("group") // Node attribute to group
    //   .links(this.classEdges) // The graph links. Must be called after setting the grouping attribute
    //   .size([PixiManager.width, PixiManager.height]); // Size of the chart

      this.simulation = simulation;

      this.classNodes.forEach((nodeData)=>{
        nodeData.gfx = new Container()

        nodeData.gfx.x = nodeData.x
        nodeData.gfx.y = nodeData.y
        nodeData.gfx.interactive = true
        nodeData.gfx.buttonMode = true
        nodeData.gfx.hitArea = new Circle(0, 0, NODE_HIT_RADIUS);

        const circle = new Sprite(circleTexture);
        circle.name = CIRCLE;
        circle.x = -circle.width / 2;
        circle.y = -circle.height / 2;

        nodeData.gfx.addChild(circle);
        nodeData.gfx.addChild(circleBorder);
        nodeData.gfx.addChild(icon);

        const labelGfx = new Container();
        labelGfx.x = PixiManager.width / 2;
        labelGfx.y = PixiManager.height / 2;
        labelGfx.interactive = true;
        labelGfx.buttonMode = true;


        nodeData.gfx        
          .on('click',(e)=>this.onClickNode(e,nodeData.gfx),this)   
          .on('pointerdown', (e)=>this.onDragStartNode(e,nodeData.gfx),this)
          .on('pointerup',(e)=>this.onDragEndNode(e,nodeData.gfx),this)
          .on('pointerupoutside',(e)=> this.onDragEndNode(e,nodeData.gfx),this)
          .on('pointermove', (e)=>this.onDragMoveNode(e,nodeData.gfx),this)
        

          // .on('tap',this.onTap,this)
          // .on('mouseover',this.onMouseOver,this)
          // .on('mouseout',this.onMouseOut,this)  




        // const label = new Text(nodeData.id);

        // label.name = LABEL;
        // label.x = -label.width / 2;
        // label.y = NODE_HIT_RADIUS + LABEL_PADDING;
        // const labelBackground = new Sprite(Texture.WHITE);
        // labelBackground.name = LABEL_BACKGROUND;
        // labelBackground.x = -(label.width + LABEL_PADDING * 2) / 2;
        // labelBackground.y = NODE_HIT_RADIUS;
        // labelBackground.width = label.width + LABEL_PADDING * 2;
        // labelBackground.height = label.height + LABEL_PADDING * 2;
        // labelBackground.tint = LABEL_BACKGROUND_COLOR;
        // labelBackground.alpha = LABEL_BACKGROUND_ALPHA;

        // labelGfx.addChild(labelBackground);
        // labelGfx.addChild(label);

        // nodeLabelsLayer.addChild(labelGfx)

        nodesLayer.addChild(nodeData.gfx)



      })



      this.addChild(this.visualLinks);

        // graph.nodes.forEach((node) => {
            
        //     node.gfx = new Graphics();
        //     node.gfx.lineStyle(1.5, 0xFFFFFF);
        //     node.gfx.beginFill(color(node.group));
        //     node.gfx.drawCircle(node.x, node.y, 5);
        //     node.gfx.interactive = true;
        //     node.gfx.buttonMode = true;
        //     node.gfx.on("pointerover",(e)=>this.onPointerOver(e,node),this);
        //     node.gfx.on("pointerout",(e)=>this.onPointerOut(e,node),this);
        //     // node.gfx.on('pointerdown', this.onDragStart,this)
        //     // node.gfx.on('pointerup',this.onDragEnd,this)
        //     // node.gfx.on('pointerupoutside', this.onDragEnd,this)
        //     // node.gfx.on('pointermove', this.onDragMove,this)
        //     // this.addChild(node.gfx)
        //     nodesLayer.addChild(node.gfx)
        //     console.log(node,node.gfx)
        // });
        

    //     let nodeDataToNodeGfx = new WeakMap();
    //     let nodeDataToLabelGfx = new WeakMap();
    //     let nodeGfxToNodeData = new WeakMap();
    //     let nodeLabelGfxToNodeData = new WeakMap();

    //     let linkDataToLinkGfx = new WeakMap();
    //     let linkDataToLabelGfx = new WeakMap();
    //     let linkGfxToLinkData = new WeakMap();
    //     let linkLabelToLinkDataGfx = new WeakMap();

    //     let hoveredNodeData = undefined;
    //     let clickedNodeData = undefined;
    //     let hoveredLinkData = undefined;
    //     let clickedLinkData = undefined;


    // const fullNodesData:any[] = [];

    // const Nodes = [
    //     {id:"FirstNode",title:"one",x:"",y:"",path:"",group:"",color:"",circleRadius:"",borderRadius:"",backgroundColor:"",isCluster:"false"}, // cluster = no collision and all nodes inside whicl linked outgoing
    //     {id:"SecondNode",title:"two",x:"",y:"",path:"",group:"",color:"",circleRadius:"",borderRadius:"",backgroundColor:"",isCluster:"false"},
    //     {id:"ThirdNode",title:"three",x:"",y:"",path:"",group:"",color:"",circleRadius:"",borderRadius:"",backgroundColor:"",isCluster:"false"}
    // ];

    //   Nodes.forEach((nodeData,index)=>{

    //   const nodeGfx = new Container()
    //   nodeGfx.x = PixiManager.width / 2 + 50*index;
    //   nodeGfx.y = PixiManager.height / 2;
    //   nodeGfx.interactive = true
    //   nodeGfx.buttonMode = true
    //   nodeGfx.hitArea = new Circle(0, 0, NODE_HIT_RADIUS);

    //   const circle = new Sprite(circleTexture);
    //   circle.name = CIRCLE;
    //   circle.x = -circle.width / 2;
    //   circle.y = -circle.height / 2;

    //   nodeGfx.addChild(circle);
    //   nodeGfx.addChild(circleBorder);
    //   nodeGfx.addChild(icon);

    //   const labelGfx = new Container();
    //   labelGfx.x = PixiManager.width / 2;
    //   labelGfx.y = PixiManager.height / 2;
    //   labelGfx.interactive = true;
    //   labelGfx.buttonMode = true;


    //   nodeGfx        
    //     .on('click',(e)=>this.onClickNode(e,nodeGfx,labelGfx),this)   
    //     .on('pointerdown', (e)=>this.onDragStartNode(e,nodeGfx,labelGfx),this)
    //     .on('pointerup',(e)=>this.onDragEndNode(e,nodeGfx,labelGfx),this)
    //     .on('pointerupoutside',(e)=> this.onDragEndNode(e,nodeGfx,labelGfx),this)
    //     .on('pointermove', (e)=>this.onDragMoveNode(e,nodeGfx,labelGfx),this)
    //     // .on('tap',this.onTap,this)
    //     // .on('mouseover',this.onMouseOver,this)
    //     // .on('mouseout',this.onMouseOut,this)  




    //   const label = new Text(nodeData.title);

    //   label.name = LABEL;
    //   label.x = -label.width / 2;
    //   label.y = NODE_HIT_RADIUS + LABEL_PADDING;
    //   const labelBackground = new Sprite(Texture.WHITE);
    //   labelBackground.name = LABEL_BACKGROUND;
    //   labelBackground.x = -(label.width + LABEL_PADDING * 2) / 2;
    //   labelBackground.y = NODE_HIT_RADIUS;
    //   labelBackground.width = label.width + LABEL_PADDING * 2;
    //   labelBackground.height = label.height + LABEL_PADDING * 2;
    //   labelBackground.tint = LABEL_BACKGROUND_COLOR;
    //   labelBackground.alpha = LABEL_BACKGROUND_ALPHA;

    //   labelGfx.addChild(labelBackground);
    //   labelGfx.addChild(label);



    //   nodesLayer.addChild(nodeGfx)
    //   nodeLabelsLayer.addChild(labelGfx)

    //   const fullNodeData = {
    //       data:nodeData,
    //       gfx:nodeGfx,
    //       label:labelGfx
    //   }
    //     fullNodesData.push(fullNodeData)

    //   })


    // const fullLinksData :any[] = []


    //  const links =  [
    //     {source:"FirstNode",target:"SecondNode",weights:[],types:[]},
    //     {source:"SecondNode",target:"ThirdNode",types:[{linkType:"inherit"},{linkType:"referance"},{linkType:"assosssiate"}],weights:[{label:"strength",value:"6"},{label:"connection",value:"8"}]}
    //   ]
    
    // function getNodeById(id){
    //     const arr = [...fullNodesData.filter((fullNodeData)=>(fullNodeData.data.id===id))]
    //     if (arr.length === 1){
    //         return arr[0]
    //     }
        
    //     console.log("failed to find node")
    // }

    // console.log('data=',fullNodesData)

    // links.forEach((linkData,index)=>{
        
  
    //     const sourceNode = getNodeById(linkData.source)
    //     const sourceNodePosition = this.toLocal(sourceNode.gfx.getBounds())
    //     const targetNode = getNodeById(linkData.target)
    //     const targetNodePosition = this.toLocal(targetNode.gfx.getBounds())

    //     console.log("source=",sourceNodePosition,"target=",targetNodePosition)

    //     const lineLength = Math.max(Math.sqrt((targetNodePosition.x - sourceNodePosition.x) ** 2 + (targetNodePosition.y - sourceNodePosition.y) ** 2) - 2 * NODE_BORDER_RADIUS, 0);

    //     const lineSize = LINK_SIZE(linkData);
    //     console.log("lineLength=",lineLength,"lineSize=",lineSize,"node border radius",NODE_BORDER_RADIUS)
    //     // linkGfx.x = sourceNodeData.x;
    //     // linkGfx.y = sourceNodeData.y;
    //     const linkGfx = new Container();
    //     linkGfx.x = sourceNodePosition.x;
    //     linkGfx.y = sourceNodePosition.y;
    //     linkGfx.pivot.set(0, lineSize / 2);
    //     linkGfx.rotation = Math.atan2(targetNodePosition.y - sourceNodePosition.y, targetNodePosition.x - sourceNodePosition.x);
    //     linkGfx.interactive = true;
    //     linkGfx.buttonMode = true;


    //     console.log('link width=',linkGfx.width,'link height=',linkGfx.height,"x=",linkGfx.y,"y=",linkGfx.y)
    //     const line = new Sprite(Texture.WHITE);
    //     line.name = LINE;
    //     line.x = NODE_BORDER_RADIUS;
    //     line.y = -lineSize / 2;
    //     line.width = lineLength + 2 * NODE_RADIUS;
    //     line.height = lineSize;
    //     line.tint = LINK_COLOR;

    //     linkGfx.addChild(line);

    //   console.log('after line,link width=',linkGfx.width,'after line,link height=',linkGfx.height,"x=",linkGfx.y,"y=",linkGfx.y)
    //   console.log('after line,link width=',line.width,'after line,link height=',line.height,"x=",line.y,"y=",line.y)
    //     const linkLabelGfx = new Container();

    //     const fullLinkData = {
    //         data:linkData,
    //         gfx:linkGfx,
    //         label:linkLabelGfx,
    //         line:line
    //     }

    //     fullLinksData.push(fullLinkData)
    //     linksLayer.addChild(linkGfx);

        
    // })



























      // frontNodeLabelsLayer.addChild()

        // const updatePositions = () => {
        //     graph.nodes.forEach(nodeData => {
        //     const nodeGfx = nodeDataToNodeGfx.get(nodeData);
        //     const nodeLabelGfx = nodeDataToLabelGfx.get(nodeData);
            
        //     nodeGfx.x = nodeData.x;
        //     nodeGfx.y = nodeData.y;
        //     nodeLabelGfx.x = nodeData.x;
        //     nodeLabelGfx.y = nodeData.y;
        //     });
            
        //     graph.links.forEach(linkData => {
        //     const sourceNodeData = graph.nodes.find(nodeData => nodeData.id === linkData.source);
        //     const targetNodeData = graph.nodes.find(nodeData => nodeData.id === linkData.target);
            
        //     const linkGfx = linkDataToLinkGfx.get(linkData);
        //     const linkLabelGfx = linkDataToLabelGfx.get(linkData);

        //     const line = linkGfx.getChildByName(LINE);
        //     const labelLine = linkLabelGfx.getChildByName(LINE);
            
        //     const lineLength = Math.max(Math.sqrt((targetNodeData.x - sourceNodeData.x) ** 2 + (targetNodeData.y - sourceNodeData.y) ** 2) - NODE_BORDER_RADIUS * 2, 0);
            

        //     linkGfx.x = sourceNodeData.x;
        //     linkGfx.y = sourceNodeData.y;
        //     linkLabelGfx.x = sourceNodeData.x;
        //     linkLabelGfx.y = sourceNodeData.y;


        //     linkGfx.rotation = Math.atan2(targetNodeData.y - sourceNodeData.y, targetNodeData.x - sourceNodeData.x);
        //     linkLabelGfx.rotation = Math.atan2(targetNodeData.y - sourceNodeData.y, targetNodeData.x - sourceNodeData.x);

        //     line.width = lineLength;
        //     labelLine.width = lineLength
        //     });
            
        //     // rerender
        // };



//         const round = value => Math.round(value * 1000) / 1000;
        
//         const updateVisibility = () => {
//             // culling
//             const cull = new Cull();
//             cull.addAll(nodesLayer.children);
//             cull.addAll(nodeLabelsLayer.children);
//             cull.addAll(linksLayer.children);
//             cull.addAll(linkLabelsLayer.children);

//             cull.cull(PixiManager.app.renderer.screen);
//             // console.log(
//             //   [...cull._targetList].filter(x => x.visible === true).length,
//             //   [...cull._targetList].filter(x => x.visible === false).length
//             // );
            
//             // levels of detail
//             const zoom = PixiManager.viewport.scale.x;
//             const zoomSteps = [0.1, 0.2, 0.4, Infinity];
//             const zoomStep = zoomSteps.findIndex(zoomStep => zoom <= zoomStep);
            
//             graph.nodes.forEach(nodeData => {
//             const nodeGfx = nodeDataToNodeGfx.get(nodeData);
//             const circleBorder = nodeGfx.getChildByName(CIRCLE_BORDER);
//             const icon = nodeGfx.getChildByName(ICON);
//             const nodeLabelGfx = nodeDataToLabelGfx.get(nodeData);
//             const label = nodeLabelGfx.getChildByName(LABEL);
//             const labelBackground = nodeLabelGfx.getChildByName(LABEL_BACKGROUND);
            
//             circleBorder.visible = zoomStep >= 1;
//             icon.visible = zoomStep >= 2;
//             label.visible = zoomStep >= 3;
//             labelBackground.visible = zoomStep >= 3;
//             });
            
//             graph.links.forEach(linkData => {
//             const linkGfx = linkDataToLinkGfx.get(linkData);
//             const labelLinkGfx = linkDataToLabelGfx.get(linkData);
//             const line = linkGfx.getChildByName(LINE);
//             const labelLine = labelLinkGfx.getChildByName(LINE);

//             line.visible = zoomStep >= 1;
//             labelLine.visible = zoomStep >= 1;
//             });
//         };
        
//         const nodeDataGfxPairs = graph.nodes.map(nodeData => {
//         const nodeGfx = new Container();
//         nodeGfx.x = nodeData.x;
//         nodeGfx.y = nodeData.y;
//         nodeGfx.interactive = true;
//         nodeGfx.buttonMode = true;
//         nodeGfx.hitArea = new Circle(0, 0, NODE_HIT_RADIUS);
// // nodeGfx.on('mouseover', event => hoverNode(nodeGfxToNodeData.get(event.currentTarget)));
// // nodeGfx.on('mouseout', event => unhoverNode(nodeGfxToNodeData.get(event.currentTarget)));
// // nodeGfx.on('mousedown', event => clickNode(nodeGfxToNodeData.get(event.currentTarget)));
// // nodeGfx.on('mouseup', () => unclickNode());
// // nodeGfx.on('mouseupoutside', () => unclickNode());

//         const circle = new Sprite(Texture.WHITE);
//         circle.name = CIRCLE;
//         circle.x = -circle.width / 2;
//         circle.y = -circle.height / 2;
//         // circle.tint = colorToNumber(color(nodeData));
//         nodeGfx.addChild(circle);

//         const circleBorder = new Sprite(Texture.WHITE);
//         circleBorder.name = CIRCLE_BORDER;
//         circleBorder.x = -circleBorder.width / 2;
//         circleBorder.y = -circleBorder.height / 2;
//         circleBorder.tint = NODE_BORDER_COLOR;
//         nodeGfx.addChild(circleBorder);

//         const icon = new Sprite(Texture.WHITE);
//         icon.name = ICON;
//         icon.x = -icon.width / 2;
//         icon.y = -icon.height / 2;
//         icon.tint = ICON_COLOR;
//         nodeGfx.addChild(icon);

//         const nodeLabelGfx = new Container();
//         nodeLabelGfx.x = nodeData.x;
//         nodeLabelGfx.y = nodeData.y;
//         nodeLabelGfx.interactive = true;
//         nodeLabelGfx.buttonMode = true;
//         // nodeLabelGfx.on('mouseover', event => hoverNode(nodeLabelGfxToNodeData.get(event.currentTarget)));
//         // nodeLabelGfx.on('mouseout', event => unhoverNode(nodeLabelGfxToNodeData.get(event.currentTarget)));
//         // nodeLabelGfx.on('mousedown', event => clickNode(nodeLabelGfxToNodeData.get(event.currentTarget)));
//         // nodeLabelGfx.on('mouseup', () => unclickNode());
//         // nodeLabelGfx.on('mouseupoutside', () => unclickNode());

//         const label = new BitmapText(LABEL_TEXT(nodeData), {
//         font: {
//             name: LABEL_FONT_FAMILY,
//             size: LABEL_FONT_SIZE
//         },
//         align: 'center',
//         tint: LABEL_COLOR
//         });

//         label.name = LABEL;
//         label.x = -label.width / 2;
//         label.y = NODE_HIT_RADIUS + LABEL_PADDING;
//         const labelBackground = new Sprite(Texture.WHITE);
//         labelBackground.name = LABEL_BACKGROUND;
//         labelBackground.x = -(label.width + LABEL_PADDING * 2) / 2;
//         labelBackground.y = NODE_HIT_RADIUS;
//         labelBackground.width = label.width + LABEL_PADDING * 2;
//         labelBackground.height = label.height + LABEL_PADDING * 2;
//         labelBackground.tint = LABEL_BACKGROUND_COLOR;
//         labelBackground.alpha = LABEL_BACKGROUND_ALPHA;
//         nodeLabelGfx.addChild(labelBackground);
//         nodeLabelGfx.addChild(label);
        
//         nodesLayer.addChild(nodeGfx);
//         nodeLabelGfx.addChild(nodeLabelGfx);

//         return [nodeData, nodeGfx, nodeLabelGfx];
//         });
    
//         // create link graphics
//         const linkDataGfxPairs = graph.links.map(linkData => {
//             const sourceNodeData = graph.nodes.find(nodeData => nodeData.id === linkData.source);
//             const targetNodeData = graph.nodes.find(nodeData => nodeData.id === linkData.target);
            
//             const lineLength = Math.max(Math.sqrt((targetNodeData.x - sourceNodeData.x) ** 2 + (targetNodeData.y - sourceNodeData.y) ** 2) - NODE_BORDER_RADIUS * 2, 0);
//             const lineSize = LINK_SIZE(linkData);
            
//             const linkGfx = new Container();
//             linkGfx.x = sourceNodeData.x;
//             linkGfx.y = sourceNodeData.y;
//             linkGfx.pivot.set(0, lineSize / 2);
//             linkGfx.rotation = Math.atan2(targetNodeData.y - sourceNodeData.y, targetNodeData.x - sourceNodeData.x);
//             linkGfx.interactive = true;
//             linkGfx.buttonMode = true;
//             // linkGfx.on('mouseover', event => hoverLink(linkGfxToLinkData.get(event.currentTarget)));
//             // linkGfx.on('mouseout', event => unhoverLink(linkGfxToLinkData.get(event.currentTarget)));

//             const linkLabelGfx = new Container();
//             linkLabelGfx.x = sourceNodeData.x;
//             linkLabelGfx.y = sourceNodeData.y;
//             linkLabelGfx.pivot.set(0, lineSize / 2);
//             linkLabelGfx.rotation = Math.atan2(targetNodeData.y - sourceNodeData.y, targetNodeData.x - sourceNodeData.x);
//             linkLabelGfx.interactive = true;
//             linkLabelGfx.buttonMode = true;
//             // linkGfx.on('mouseover', event => hoverLink(linkGfxToLinkData.get(event.currentTarget)));
//             // linkGfx.on('mouseout', event => unhoverLink(linkGfxToLinkData.get(event.currentTarget)));
            
//             const line = new Sprite(Texture.WHITE);
//             line.name = LINE;
//             line.x = NODE_BORDER_RADIUS;
//             line.y = -lineSize / 2;
//             line.width = lineLength;
//             line.height = lineSize;
//             line.tint = LINK_COLOR;
//             linkGfx.addChild(line);

//             const lineLabel = new Sprite(Texture.WHITE);
//             lineLabel.name = LINE;
//             lineLabel.x = NODE_BORDER_RADIUS;
//             lineLabel.y = -lineSize / 2;
//             lineLabel.width = lineLength;
//             lineLabel.height = lineSize;
//             lineLabel.tint = LINK_COLOR;
//             linkLabelGfx.addChild(lineLabel);
            
//             linksLayer.addChild(linkGfx);
//             linkLabelsLayer.addChild(linkLabelGfx)
//             return [linkData, linkGfx,linkLabelGfx];
//         });
    }
   
    public ticker(){
      
    }

    public handleSetNodes(){
          this.classNodes.forEach((node) => {
            let { x, y, gfx } = node;
              if(gfx.dragging === true){
                
              }else{
                gfx.x = x;
                gfx.y = y;
              }

          });
    }

    public dragstarted() {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }

    public dragged() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }

    public dragended() {
        if (!d3.event.active) simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

    public update(framesPassed: number): void {

      // ticker call this function with framepassed already

        this.timeElapsed = this.timeElapsed + framesPassed + 10
        if ( this.timeElapsed < 10){
            return
            
        }

          this.classNodes.forEach((node) => {
            let { x, y, gfx } = node;
              if(this.dragging === true){

              }else{
                gfx.x = x;
                gfx.y = y;
              }

          });

          const children  = this.visualLinks.children
          for (let i = children.length - 1; i >= 0; i--) {
            this.visualLinks.children[i].destroy();
          }
          this.visualLinks.clear();
          this.visualLinks.removeChildren();
          this.visualLinks.alpha = 1;

          this.classEdges.forEach((link) => {
            let { source, target } = link;
            this.visualLinks.lineStyle(2, 0xD3D3D3);
            this.visualLinks.moveTo(source.x, source.y);
            this.visualLinks.lineTo(target.x, target.y);
          });

          this.visualLinks.endFill();
          this.timeElapsed = 0

        // Lets move clampy!
        // this.clampy.x += this.clampyVelocity * framesPassed;

        // if (this.clampy.x > PixiManager.width) {
        //     this.clampy.x = PixiManager.width;
        //     this.clampyVelocity = -this.clampyVelocity;
        // }

        // if (this.clampy.x < 0) {
        //     this.clampy.x = 0;
        //     this.clampyVelocity = -this.clampyVelocity;
        // }
    }

    public resize(screenWidth: number, screenHeight: number): void {
        
    }

    private onClickNode(e: InteractionEvent,node): void {
        if(node.dragging === true){
            return
        }
          console.log("Click! node")


          // Global position of the interaction
          // e.data.global

          // Local (inside clampy) position of the interaction
          // e.data.getLocalPosition(this.clampy) 
          // Remember Clampy has the 0,0 in its center because we set the anchor to 0.5!
    }

    private onClick(e: InteractionEvent): void {
        console.log("Click!")


        // Global position of the interaction
        // e.data.global

        // Local (inside clampy) position of the interaction
        // e.data.getLocalPosition(this.clampy) 
        // Remember Clampy has the 0,0 in its center because we set the anchor to 0.5!
    }

    private onMouseDown(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onMouseUp(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onMouseMove(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onMouseOver(e: InteractionEvent): void {
        console.log("Over!")
    }

    private onMouseOut(e: InteractionEvent): void {
        console.log("Out!")
    }

    private onTap(e: InteractionEvent): void {
        console.log("Tap!")
    }

    private onTouchStart(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }
    private onTouchEnd(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }
    private onTouchMove(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }
    private onPointerOver(e: InteractionEvent,node): void {
        console.log("Over! ",node.name)
    }
    private onPointerOut(e: InteractionEvent,node): void {
        console.log("l-Out! ",node.name)
    }
    private onPointerTap(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }
    private onPointerDown(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }
    private onPointerUp(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }
    private onPointerMove(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onKeyDown(e: KeyboardEvent): void {
        console.log("KeyDown event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onKeyUp(e: KeyboardEvent): void {
        console.log("KeyUp event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onDragStart(e){
        
        this.clampy.x = e.data.global.x;
        this.clampy.y = e.data.global.y;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
        this.clampy.dragging = true;
    }

    private onDragMove(e) {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
	if (this.clampy.dragging) {
		this.clampy.x = e.data.global.x;
		this.clampy.y = e.data.global.y;
	}
    }

    private onDragEnd(e) {
        this.clampy.x = e.data.global.x;
        this.clampy.y = e.data.global.y;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
        this.clampy.dragging = false;
    }

    private onDragStartNode(e,node){

        this.dragging = true;
        PixiManager.viewport.plugins.pause('drag')
        this.simulation.alphaTarget(0.3).restart();
        const from = this.toLocal(e.data.global)
        node.x = from.x
        node.y = from.y
        console.log("start",from.x,from.y)
        // label.x = from.x
        // label.y = from.y
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
        node.dragging = true;
      this.classEdges.forEach((link) => {
          console.log("line-source-x=",link.source.x,"line-source-y=",link.source.y,"line-target-x=",link.target.x,"line-source-y=",link.target.y)
        const {target ,source} = link
        if(source.id === node.id){

            source.x = from.x
            source.y = from.y
        }
        if(target.id === node.id){
            source.x = from.x
            source.y = from.y
        }

      });

    }

    private onDragMoveNode(e,node) {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
      if (node.dragging) {
        const from = this.toLocal(e.data.global)

        node.x = from.x
        node.y = from.y
        console.log("move",from.x,from.y)
        // label.x = from.x
        // label.y = from.y


      this.classEdges.forEach((link) => {
      console.log("line-source-x=",link.source.x,"line-source-y=",link.source.y,"line-target-x=",link.target.x,"line-source-y=",link.target.y)
        const {target ,source} = link
        if(source.id === node.id){
            // this.visualLinks.lineStyle(2, 0xD3D3D3);
            // this.visualLinks.moveTo(from.x,from.y);
            // this.visualLinks.lineTo(target.x, target.y);
            source.x = from.x
            source.y = from.y
        }

        if(target.id === node.id){
            target.x = from.x
            target.y = from.y
        }

      });
      }



      
    }

    private onDragEndNode(e,node) {
        

        if(!e.active) this.simulation.alphaTarget(0);
        const from = this.toLocal(e.data.global)
        node.x = from.x
        node.y = from.y
        node.dragging = false;
        this.dragging = false;
        console.log("end",from.x,from.y)

      this.classEdges.forEach((link) => {
      console.log("line-source-x=",link.source.x,"line-source-y=",link.source.y,"line-target-x=",link.target.x,"line-source-y=",link.target.y)
        const {target ,source} = link
        if(source.id === node.id){
            source.x = from.x
            source.y = from.y
        }
        if(target.id === node.id){
            target.x = from.x
            target.y = from.y
        }

      });
      

          this.visualLinks.endFill();

        PixiManager.viewport.plugins.resume('drag')

    }
}


class Layer extends Container{
  constructor(){
    super()
  }
}



class Node extends Container{
    gfx
    circleTexture
    circleBorderTexure
    iconTexure

  constructor(nodeData,circleTexture){
    super()

        

        this.gfx = new Graphics()
        this.gfx.x = nodeData.x
        this.gfx.y = nodeData.y
        this.gfx.interactive = true
        this.gfx.buttonMode = true
        this.gfx.hitArea = new Circle(0, 0, NODE_HIT_RADIUS);

        const circle = new Sprite(circleTexture);
        circle.name = CIRCLE;
        circle.x = -circle.width / 2;
        circle.y = -circle.height / 2;

        nodeData.gfx.addChild(circle);
        nodeData.gfx.addChild(circleBorder);
        nodeData.gfx.addChild(icon);

        const labelGfx = new Container();
        labelGfx.x = PixiManager.width / 2;
        labelGfx.y = PixiManager.height / 2;
        labelGfx.interactive = true;
        labelGfx.buttonMode = true;


        nodeData.gfx        
          .on('click',(e)=>this.onClickNode(e,nodeData.gfx),this)   
          .on('pointerdown', (e)=>this.onDragStartNode(e,nodeData.gfx),this)
          .on('pointerup',(e)=>this.onDragEndNode(e,nodeData.gfx),this)
          .on('pointerupoutside',(e)=> this.onDragEndNode(e,nodeData.gfx),this)
          .on('pointermove', (e)=>this.onDragMoveNode(e,nodeData.gfx),this)
  }



    private onClick(e: InteractionEvent): void {
        console.log("Click!")


        // Global position of the interaction
        // e.data.global

        // Local (inside clampy) position of the interaction
        // e.data.getLocalPosition(this.clampy) 
        // Remember Clampy has the 0,0 in its center because we set the anchor to 0.5!
    }

    private onMouseDown(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onMouseUp(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onMouseMove(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onMouseOver(e: InteractionEvent): void {
        console.log("Over!")
    }

    private onMouseOut(e: InteractionEvent): void {
        console.log("Out!")
    }

    private onTap(e: InteractionEvent): void {
        console.log("Tap!")
    }

    private onTouchStart(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onTouchEnd(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onTouchMove(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onPointerOver(e: InteractionEvent,node): void {
        console.log("Over! ",node.name)
    }

    private onPointerOut(e: InteractionEvent,node): void {
        console.log("l-Out! ",node.name)
    }

    private onPointerTap(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onPointerDown(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onPointerUp(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onPointerMove(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
    }

    private onKeyDown(e: KeyboardEvent): void {
        console.log("KeyDown event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onKeyUp(e: KeyboardEvent): void {
        console.log("KeyUp event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onDragStart(e,node){

        this.dragging = true;
        PixiManager.viewport.plugins.pause('drag')
        this.simulation.alphaTarget(0.3).restart();
        const from = this.toLocal(e.data.global)
        node.x = from.x
        node.y = from.y
        console.log("start",from.x,from.y)
        // label.x = from.x
        // label.y = from.y
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
        node.dragging = true;
      this.classEdges.forEach((link) => {
          console.log("line-source-x=",link.source.x,"line-source-y=",link.source.y,"line-target-x=",link.target.x,"line-source-y=",link.target.y)
        const {target ,source} = link
        if(source.id === node.id){

            source.x = from.x
            source.y = from.y
        }
        if(target.id === node.id){
            source.x = from.x
            source.y = from.y
        }

      });

    }

    private onDragMove(e,node) {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
      if (node.dragging) {
        const from = this.toLocal(e.data.global)

        node.x = from.x
        node.y = from.y
        console.log("move",from.x,from.y)
        // label.x = from.x
        // label.y = from.y


      this.classEdges.forEach((link) => {
      console.log("line-source-x=",link.source.x,"line-source-y=",link.source.y,"line-target-x=",link.target.x,"line-source-y=",link.target.y)
        const {target ,source} = link
        if(source.id === node.id){
            // this.visualLinks.lineStyle(2, 0xD3D3D3);
            // this.visualLinks.moveTo(from.x,from.y);
            // this.visualLinks.lineTo(target.x, target.y);
            source.x = from.x
            source.y = from.y
        }

        if(target.id === node.id){
            target.x = from.x
            target.y = from.y
        }

      });
      }



      
    }

    private onDragEnd(e,node) {
        

        if(!e.active) this.simulation.alphaTarget(0);
        const from = this.toLocal(e.data.global)
        node.x = from.x
        node.y = from.y
        node.dragging = false;
        this.dragging = false;
        console.log("end",from.x,from.y)

      this.classEdges.forEach((link) => {
      console.log("line-source-x=",link.source.x,"line-source-y=",link.source.y,"line-target-x=",link.target.x,"line-source-y=",link.target.y)
        const {target ,source} = link
        if(source.id === node.id){
            source.x = from.x
            source.y = from.y
        }
        if(target.id === node.id){
            target.x = from.x
            target.y = from.y
        }

      });
      

          this.visualLinks.endFill();

        PixiManager.viewport.plugins.resume('drag')

    }
}

import { Container, DisplayObject, Graphics, InteractionEvent, Point, Sprite } from "pixi.js";
import { IScene, PixiManager } from "../Pixi/PixiManager";
import D3PixiGraph from "./D3PixiGraph";
import { DUMMY_DATA as graph } from './DummyData'
import { runD3Layout } from '../D3/D3Layout'
import * as d3 from 'd3'
import forceInABox from './ForceInABox'
// @ts-nocheck

export class ForceGraphScene extends Container implements IScene{
    public static Nodes: [];
    public static Links: [];
    private clampy :Sprite;
    private clampyVelocity: number;
    constructor(width:number,height:number) {
        super();


    const context = new Graphics();
    this.addChild(context);





//   // pixi nodes and link graphics
//     const links = new Graphics();
//     this.addChild(links);
  
//     graph.nodes.forEach((node) => {
//         node.gfx = new Graphics();
//         node.gfx.lineStyle(1.5, 0xFFFFFF);
//         node.gfx.beginFill(color(node.group));
//         node.gfx.drawCircle(0, 0, 5);
//         node.gfx.interactive = true;
//         node.gfx.buttonMode = true;
//         node.gfx.on("pointerover", ()=>pointerOver(node));
//         node.gfx.on("pointerout", ()=>pointerOut(node));
//         this.addChild(node.gfx);
//     });


//   // d3 simulation
//  //* @ts-ignore */    //* @ts-ignore */
//     const simulation = d3.forceSimulation()
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         .nodes(graph.nodes)
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//         .force('link', d3.forceLink().id((d) => d.id))
//         .force('charge', d3.forceManyBody().strength(-5))
//         .force('center', d3.forceCenter(width / 2, height / 2))
//         .force("forceInABox", forceInABox()
//         .strength(0.5) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//         .groupBy("group") // Node attribute to group
//         .enableGrouping(false) // TRUE FOR GROUPING
//         .forceNodeSize(d => 8)
//         .size([width, height])
//         )
//         .on('tick', ticked);
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//     simulation
//         .force('link')
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//         .links(graph.links);
    
//     function ticked() {
//         graph.nodes.forEach((node) => {
//             let { x, y, gfx } = node;
//             gfx.position = new Point(x, y);
//         });
//         links.clear();
//         links.alpha = 0.6;
//         graph.links.forEach((link) => {
//             let { source, target } = link;
//             links.lineStyle(Math.sqrt(link.value), 0xEEEEEE);
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//             links.moveTo(source.x, source.y);
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//             links.lineTo(target.x, target.y);
//         });
//         links.endFill();
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore

//     }

  
//   // d3 drag
//   d3.select(PixiManager.app.view)
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//     .call(d3.drag()
//       .container(PixiManager.app.view)
//       // Returns the node closest to the position with the given search radius
//       .subject((d)=>simulation.find(d.x, d.y, 10))
//       .on('start', dragstarted)
//       .on('drag', dragged)
//       .on('end', dragended)
//     );
  
//     function dragstarted(e, d) {
//         hideTooltip();
//         if (!e.active) {
//         simulation
//         .alphaTarget(0.3)
//         .restart();
//         } 
//         e.subject.fx = e.subject.x;
//         e.subject.fy = e.subject.y;
//     }

//     function dragged(e,d) {
//         e.subject.fx = e.x;
//         e.subject.fy = e.y;
//     }

//     function dragended(e,d) {
//         if (!e.active) {
//         simulation.alphaTarget(0);
//         }
//         e.subject.fx = null;
//         e.subject.fy = null;
//     }

//     function pointerOver(node){
//         showTooltip(node);
//         node.gfx.tint = 0x666666;
//         // renderer.render(stage);
//     }

//     function pointerOut(node){
//         hideTooltip();
//         node.gfx.tint = 0xFFFFFF;
//         // renderer.render(stage);
//     }
    
//     // tooltips
//     const tooltipDom = d3.select("body")
//         .append("div")
//         .attr("style",`
//         display: none;
//         font-family: sans-serif;
//         font-size: 12px;
//         position: absolute;
//         padding: 0.5em;
//         color: #fff;
//         background-color: #333;
//         z-index: +9;
//         `);

//     function showTooltip(node){
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//         const offset = document.querySelector("pixi-canvas").getBoundingClientRect();
//         tooltipDom
//         .text(node.id)
//         .style("display","inline-block")
//         .style("left",`${offset.x + node.x + 10 }px`)
//         .style("top",`${offset.y + node.y + 10}px`)
//     }
    
//     function hideTooltip() {
//         tooltipDom
//         .text("")
//         .style("display","none")
//         .style("top","-100px")
//         .style("left","-100px");
//     }  






























        this.clampy = Sprite.from("./clampy.png");
        this.clampy.anchor.set(0.5);
        this.clampy.height = 50;
        this.clampy.width = 50;
        this.clampy.x = PixiManager.width / 2;
        this.clampy.y = PixiManager.height / 2;
        this.addChild(this.clampy);
        this.clampyVelocity = 5;
        // events that begin with "pointer" are touch + mouse
        this.clampy.on("pointertap", this.onClick, this);

        this.clampy.interactive = true;
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    public NodeLayout(){
    }

    public update(framesPassed: number): void {
        // nodes position update, links
    }
    public resize(screenWidth: number, screenHeight: number): void {
        
    }

    private onClick(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
        console.log("The data of your interaction is super interesting", e)

        // Global position of the interaction
        // e.data.global

        // Local (inside clampy) position of the interaction
        // e.data.getLocalPosition(this.clampy) 
        // Remember Clampy has the 0,0 in its center because we set the anchor to 0.5!

//         event.data.global This is the global (stage) position of the interaction
            // e.data.getLocalPosition(e.target) This is the local (object that has the event) position of the interaction
            // event.data.pointerType This will say mouse or touch
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
    private onTap(e: InteractionEvent): void {
        console.log("You interacted with Clampy!")
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


}

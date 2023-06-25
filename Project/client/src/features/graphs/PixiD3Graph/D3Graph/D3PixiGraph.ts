import React from 'react'
import { DUMMY_DATA as graph } from './DummyData'


import { Container,Graphics } from 'pixi.js'
import {PixiManager} from '../Pixi/PixiManager'
import { runD3Layout } from '../D3/D3Layout'


const D3PixiGraph = (stage:Container) => {
    const item = new Graphics();
    item.lineStyle(1.5, 0xFFFFFF);
    item.beginFill(0xFFFFFF);
    item.drawCircle(20, 20, 20);
    stage.addChild(item)
}

export const ReadyGraph = (stage:Container,width:number,height:number) => {

    const {nodes, links} = graph;
    const {positions,simulation} = runD3Layout(graph,width,height)
    nodes.forEach(nodeData => {
        const position = positions[nodeData.id];
        nodeData.x = position.x;
        nodeData.y = position.y;
    });
    const minNodeX = Math.min(...nodes.map(nodeData => nodeData.x));
    const maxNodeX = Math.max(...nodes.map(nodeData => nodeData.x));
    const minNodeY = Math.min(...nodes.map(nodeData => nodeData.y));
    const maxNodeY = Math.max(...nodes.map(nodeData => nodeData.y));
    const graphWidth = Math.abs(maxNodeX - minNodeX);
    const graphHeight = Math.abs(maxNodeY - minNodeY);
    const WORLD_WIDTH = Math.max(width * 2, graphWidth * 1.1);
    const WORLD_HEIGHT = Math.max(height * 2, graphHeight * 1.1);

    nodes.forEach(nodeData => {
        nodeData.x = nodeData.x - minNodeX - graphWidth / 2 + WORLD_WIDTH / 2;
        nodeData.y = nodeData.y - minNodeY - graphHeight / 2 + WORLD_HEIGHT / 2;
    });


}



export default D3PixiGraph
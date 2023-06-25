import React from 'react'
import { Sprite,Graphics } from 'pixi.js'

export function NodeLayout(node :any){
    node =new Graphics();
    node.lineStyle(1.5, 0xAAAFED);
    node.beginFill(0xFFFFFF);
    node.drawCircle(0, 0, 5);
}

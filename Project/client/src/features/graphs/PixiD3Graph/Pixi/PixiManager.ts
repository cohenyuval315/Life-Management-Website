import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import {Viewport } from "pixi-viewport";
import { Point } from "pixi.js";


export class PixiManager {
    private constructor() { }

    public static app: Application;
    public static viewport : Viewport
    private static currentScene: IScene;
    private static currentViewportScene: IScene;
    public static renderRequestId:any;

    private static _width: number;
    private static _height: number;


    public static get width(): number {
        return PixiManager._width;
    }
    public static get height(): number {
        return PixiManager._height;
    }
    public static initialize(width: number, height: number): void {

        PixiManager._width = width;
        PixiManager._height = height;

        PixiManager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            transparent:true,   
            height:height,
            width:width,

        });

    
        PixiManager.app.ticker.add(PixiManager.update)
        PixiManager.app.ticker.start()
        // window.addEventListener("resize", PixiManager.resize);
    }
    public static initializeViewport(worldHeight:number,worldWidth:number){
        PixiManager.viewport = new Viewport({
            screenWidth:   PixiManager._width,
            screenHeight: PixiManager._height,
            worldWidth: worldWidth,
            worldHeight: worldHeight,
            interaction: PixiManager.app.renderer.plugins.interaction
        })
        PixiManager.app.stage.addChild(PixiManager.viewport)
        PixiManager.viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth: PixiManager._width /4 , minHeight: PixiManager._height/4 });
        PixiManager.viewport.interactiveChildren = true
        return PixiManager.viewport
    }

    public static changeScene(newScene: IScene): void {
        if (PixiManager.currentScene) {
            PixiManager.app.stage.removeChild(PixiManager.currentScene);
            PixiManager.currentScene.destroy();
        }

        PixiManager.currentScene = newScene;
        PixiManager.app.stage.addChild(PixiManager.currentScene);
    }

    public static changeViewportScene(newScene: IScene): void {
        if (PixiManager.currentViewportScene) {
            PixiManager.currentViewportScene.removeChild(PixiManager.currentViewportScene);
            PixiManager.currentViewportScene.destroy();
        }

        PixiManager.currentViewportScene = newScene;
        PixiManager.viewport.addChild(PixiManager.currentViewportScene);
    }


    public static requestRender(){
        if (PixiManager.renderRequestId) {
            return;
        }
        PixiManager.renderRequestId = window.requestAnimationFrame(() => {
            PixiManager.app.render();
            PixiManager.renderRequestId = undefined;
        });
    }


    private static update(framesPassed): void {
        if (PixiManager.currentScene) {
            PixiManager.currentScene.update(framesPassed);
        }
        if (PixiManager.currentViewportScene) {
            PixiManager.currentViewportScene.update(framesPassed);
        }

    }

    // public static resize(): void {
    //     // if we have a scene, we let it know that a resize happened!
    //     if (PixiManager.currentScene) {
    //         PixiManager.currentScene.resize(PixiManager.width, PixiManager.height);
    //     }
    // }
    // public static viewportZoomIn = () => {
    //      PixiManager.viewport.zoom(-PixiManager._width / 10, true);
    // };
    // public static viewportZoomOut = () => {
    //      PixiManager.viewport.zoom(PixiManager._width / 10, true);
    // };
    // public static resetViewport = () => {
    //      PixiManager.viewport.center = new Point(PixiManager._width / 2, PixiManager._height / 2);
    //      PixiManager.viewport.fitWorld(true);
    // };

}

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}


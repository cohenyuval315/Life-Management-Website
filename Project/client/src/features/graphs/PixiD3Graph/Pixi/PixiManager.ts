import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import {Viewport } from "pixi-viewport";
import { Point } from "pixi.js";


export class PixiManager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    // Safely store variables for our game
    public static app: Application;
    public static viewport : Viewport
    private static currentScene: IScene;
    private static currentViewportScene: IScene;
    public static renderRequestId:any;
    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;


    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return PixiManager._width;
    }
    public static get height(): number {
        return PixiManager._height;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number): void {

        // store our width and height
        PixiManager._width = width;
        PixiManager._height = height;

        // Create our pixi app
        PixiManager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            transparent:true,   
            height:height,
            width:width,

        });

        

        // Add the ticker
        
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

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (PixiManager.currentScene) {
            PixiManager.app.stage.removeChild(PixiManager.currentScene);
            PixiManager.currentScene.destroy();
        }

        // Add the new one
        PixiManager.currentScene = newScene;
        PixiManager.app.stage.addChild(PixiManager.currentScene);
    }

    public static changeViewportScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (PixiManager.currentViewportScene) {
            PixiManager.currentViewportScene.removeChild(PixiManager.currentViewportScene);
            PixiManager.currentViewportScene.destroy();
        }

        // Add the new one
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


    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed): void {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (PixiManager.currentScene) {
            PixiManager.currentScene.update(framesPassed);
        }
        if (PixiManager.currentViewportScene) {
            PixiManager.currentViewportScene.update(framesPassed);
        }

        // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
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


    /* More code of your Manager.ts like `changeScene` and `update`*/
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    // resize(screenWidth: number, screenHeight: number): void;
}


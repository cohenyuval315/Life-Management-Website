import { Container, InteractionEvent, Sprite } from "pixi.js";
import { IScene, PixiManager } from "../Pixi/PixiManager";

export class GraphScene extends Container implements IScene {
    private clampy: Sprite;
    private clampyVelocity: number;
    constructor() {
        super();
        this.clampy = Sprite.from("./clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.height = 50;
        this.clampy.width = 50;
        this.clampy.x = PixiManager.width / 2;
        this.clampy.y = PixiManager.height / 2;
        this.addChild(this.clampy);

        this.clampyVelocity = 5;
        this.clampy.on('click',this.onClick,this)
        this.clampy.interactive = true;
    }
    public update(framesPassed: number): void {
        // Lets move clampy!
        this.clampy.x += this.clampyVelocity * framesPassed;

        if (this.clampy.x > PixiManager.width) {
            this.clampy.x = PixiManager.width;
            this.clampyVelocity = -this.clampyVelocity;
        }

        if (this.clampy.x < 0) {
            this.clampy.x = 0;
            this.clampyVelocity = -this.clampyVelocity;
        }
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
    }
}
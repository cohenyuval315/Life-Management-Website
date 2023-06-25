import { Container, InteractionEvent, Sprite } from "pixi.js";

export class Scene extends Container {
    private clampy: Sprite;
    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.clampy = Sprite.from("clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;
        this.addChild(this.clampy);

        // events that begin with "pointer" are touch + mouse
        this.clampy.on("pointertap", this.onClick, this);

        // This only works with a mouse
        // this.clampy.on("click", this.onClicky, this);

        // This only work with touch
        // this.clampy.on("tap", this.onClicky, this);

        // Super important or the object will never receive mouse events!

// .on(...): Adds an event listener.
// .once(...): Adds an event listener that will remove itself after it gets called once.
// .off(...): Removes an event listener. (Tricky to use if you use .bind!)
// .emit(...): Emits an event, all listeners for that event will get called.
// .removeAllListeners(): Removes all event listeners.

        this.clampy.interactive = true;
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
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
import { Application,Sprite } from 'pixi.js';

const app = new Application({
    view: document.getElementById("pixi-canvas") ,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    position: "absolute",
    zIndex: 10000,
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    width: 640,
    height: 480
});

const clampy = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

app.stage.addChild(clampy);
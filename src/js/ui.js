import { Actor, Color, Label, ScreenElement, TextAlign, Vector } from "excalibur";
import { Resources } from "./resources";

export class UI extends ScreenElement {

    #logo;

    #startMessage;
    #zoomTime = 0;
    #fading = false;

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.#logo = new Actor({
            pos: new Vector(640, 200),
            scale: new Vector(0.9, 0.9)
        });
        this.#logo.graphics.use(Resources.Logo.toSprite());
        this.addChild(this.#logo);
        
        this.#startMessage = new Label({
            text: 'Press Space to start!',
            pos: new Vector(640, 350),
            font: Resources.PixelFont.toFont({
                size: 25,
                color: Color.Green,
                textAlign: TextAlign.Center
            })
        });
        this.addChild(this.#startMessage);
    }

    onPreUpdate(engine, delta) {
        if(this.#startMessage) {
            this.#zoomTime += delta / 1000
            const scale = 1 + 0.02 * Math.sin(this.#zoomTime * 5)
            this.#startMessage.scale = new Vector(scale, scale);
        }

        if (this.#fading && this.#startMessage) {
            this.#startMessage.opacity -= delta * 0.002;
            if (this.#startMessage.opacity < 0.01) {
                this.#startMessage.kill();
                this.#startMessage = null;
                this.#fading = false;
            }
        }
    }

    startGame() {
        this.#fading = true;

        this.#logo.actions.moveTo(new Vector(640, -100), 500);
    }

}
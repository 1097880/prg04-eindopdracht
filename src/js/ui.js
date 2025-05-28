import { Actor, Color, Label, ScreenElement, Sprite, TextAlign, Vector } from "excalibur";
import { Resources } from "./resources";

export class UI extends ScreenElement {

    #player;
    #logo;
    #hearts;

    #startMessage;
    #zoomTime = 0;
    #fading = false;

    #lives;

    constructor(player) {
        super();
        this.#player = player;
        this.#lives = player.lives;
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

        this.#hearts = new Actor({
            x: 50,
            y: -75,
            anchor: Vector.Zero
        })
        this.#hearts.heartImage = new Sprite({
            image: Resources.Heart,
            sourceView: {
                x: 0,
                y: 0,
                width: 64 * this.#lives,
                height: 64
            }
        });
        this.#hearts.graphics.use(this.#hearts.heartImage);
        this.addChild(this.#hearts);
    }

    onPreUpdate(engine, delta) {
        if (this.#startMessage) {
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

        this.#hearts.actions.moveTo(new Vector(50, 50), 125);
    }

    updateLives(lives) {
        this.#lives = lives;
        this.#hearts.heartImage.sourceView.width = 64 * this.#lives;
        this.#hearts.heartImage.width = 64 * this.#lives;
    }

}
import { Actor, CollisionType, Color, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class Finish extends Actor {
    constructor(x, y, width = 1, height = 1) {
        super({
            x: x + 32 * width,
            y: y - 32 * height,
            scale: new Vector(2, 2),
            width: 32 * width,
            height: 32 * height,
            collisionType: CollisionType.Fixed
        });
        this.sprite = new Sprite({
            image: Resources.Finish,
            sourceView: {
                x: 0,
                y: 0,
                width: 32 * width,
                height: 32 * height
            }
        });
    }

    onInitialize(engine) {
        const glow = new Actor({
            x: this.x,
            y: this.y,
            width: this.width / 2 + 2,
            height: this.height / 2 + 2,
            color: Color.White,
            opacity: 0.5
        });

        glow.z = -1;
        this.addChild(glow);

        this.graphics.use(this.sprite);
    }
}
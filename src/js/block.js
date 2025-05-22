import { Actor, CollisionType, Color, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class Block extends Actor {
    /**
    * Creates a new block at the specified coördinates with the specified width and height.
    * @param {number} x - X position of the block, starting from the left.
    * @param {number} y - Y position of the block, starting from the top.
    * @param {number} width - How many tiles the block should have in the X direction. 20 blocks is 1280px wide (Whole screen width).
    * @param {number} height - How many tiles the block should have in the Y direction. 11 blocks is almost the whole screen height.
    */
    constructor(x, y, width = 1, height = 1) {
        super({
            x: x + 32 * width,
            y: y + 32 * height,
            scale: new Vector(2, 2),
            width: 32 * width,
            height: 32 * height,
            collisionType: CollisionType.Fixed
        });
        this.sprite = new Sprite({
            image: Resources.Block,
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
import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";
import { PadGlow } from "./particles/padglow";

export class JumpPad extends Actor {
    /**
    * Creates a new jumppad at the specified coördinates.
    * @param {number} x - X position of the block, starting from the left.
    * @param {number} y - Y position of the block, starting from the bottom.
    */
    constructor(x, y) {
        super({
            x: x + 32,
            y: y,
            scale: new Vector(2, 2),
            width: 32,
            height: 6,
            anchor: new Vector(0.5, 1),
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.JumpPad.toSprite());

        this.padglow = new PadGlow(Color.Green);
        this.addChild(this.padglow);
    }

}
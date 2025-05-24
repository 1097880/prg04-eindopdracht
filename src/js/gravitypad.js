import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";
import { PadGlow } from "./particles/padglow";

export class GravityPad extends Actor {
    /**
    * Creates a new gravitypad at the specified coördinates.
    * @param {number} x - X position of the block, starting from the left.
    * @param {number} y - Y position of the block, starting from the bottom.
    * @param {boolean} flip - Should the graphic be flipped upside down? Usefull for reversed gravity. Defaults to false.
    */
    constructor(x, y, flip = false) {
        const rotation = (flip) ? Math.PI : 0;
        super({
            x: x + 32,
            y: y,
            scale: new Vector(2, 2),
            width: 32,
            height: 6,
            anchor: new Vector(0.5, 1),
            collisionType: CollisionType.Passive,
            rotation: rotation
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.GravityPad.toSprite());

        this.padglow = new PadGlow(Color.Purple);
        this.addChild(this.padglow);
    }

}
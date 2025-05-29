import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";
import { OrbGlow } from "./particles/orbglow";

export class JumpOrb extends Actor {
    /**
    * Creates a new jumporb at the specified coördinates.
    * @param {number} x - X position of the orb, starting from the left.
    * @param {number} y - Y position of the orb, starting from the bottom.
    */
    constructor(x, y) {
        super({
            x: x + 32,
            y: y,
            scale: new Vector(2, 2),
            width: 24,
            height: 24,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.JumpOrb.toSprite());

        this.orbglow = new OrbGlow(Color.Green);
        this.addChild(this.orbglow);
    }

}
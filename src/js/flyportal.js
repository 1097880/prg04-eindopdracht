import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";

export class FlyPortal extends Actor {
    /**
    * Creates a new flyportal at the specified coördinates.
    * @param {number} x - X position of the portal, starting from the left.
    * @param {number} y - Y position of the portal, starting from the bottom.
    */
    constructor(x, y) {
        super({
            x: x + 64,
            y: y - 64,
            scale: new Vector(2, 2),
            width: 28,
            height: 64,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.FlyPortal.toSprite());
    }

}
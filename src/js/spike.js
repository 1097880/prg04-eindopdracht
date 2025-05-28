import { CollisionType, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";
import { Obstacle } from "./obstacle";

export class Spike extends Obstacle {
    /**
    * Creates a new group of spikes at the specified coördinates with the specified width and height.
    * @param {number} x - X position of the spike, starting from the left.
    * @param {number} y - Y position of the spike, starting from the bottom.
    * @param {number} width - How many tiles the spike should have in the X direction. 20 blocks is 1280px wide (Whole screen width).
    * @param {boolean} half - Should a lower spike be used? Defaults to false.
    */
    constructor(x, y, width = 1, half = false) {
        const halfSpike = (half) ? 0.6 : 1;
        const yOffset = (half) ? 9 : 0;
        super({
            x: x + 32 * width,
            y: y - 29 + yOffset,
            scale: new Vector(2, 2),
            width: 32 * width - 20,
            height: 16 * halfSpike,
            collisionType: CollisionType.Passive
        });
        this.sprite = new Sprite({
            image: Resources.Spike,
            sourceView: {
                x: 0,
                y: 0,
                width: 32 * width,
                height: 32 * halfSpike
            }
        });
    }

    onInitialize(engine) {
        this.graphics.use(this.sprite);
    }
}
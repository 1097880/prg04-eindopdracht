import { CollisionType, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";
import { Obstacle } from "./obstacle";

export class SawBlade extends Obstacle {
    #offset;
    #speed;
    #moving = false;
    #originalX;
    #originalY;
    #playerDeath = false;

    /**
    * Creates a new saw blade at the specified coördinates with the optionally specified movement path.
    * @param {number} x - X position of the blade, starting from the left.
    * @param {number} y - Y position of the blade, starting from the bottom.
    * @param {Vector} offset - How many pixels should the blade move? Moves to specified offset, and then back to original point.
    * @param {number} speed - How fast should the blade move to the offset position? Measured in px/s.
    */
    constructor(x, y, offset = new Vector(0, 0), speed = 0) {
        super({
            x: x + 32,
            y: y - 32,
            scale: new Vector(2, 2),
            width: 28,
            height: 28,
            collisionType: CollisionType.Passive
        });
        this.sprite = new Sprite({
            image: Resources.SawBlade,
            sourceView: {
                x: 0,
                y: 0,
                width: 64,
                height: 64
            }
        });
        this.#offset = offset;
        this.#speed = speed;
        this.#originalX = this.body.pos.x;
        this.#originalY = this.body.pos.y;

    }

    onInitialize(engine) {
        this.graphics.use(this.sprite);
    }

    onPreUpdate(engine) {
        if (this.scene.engine.player.pos.distance(this.pos) < 1280 && !this.#moving && !this.#playerDeath) {
            if (this.#offset.x !== 0 || this.#offset.y !== 0) {
                this.actions
                    .repeat(repeatCtx => {
                        repeatCtx.moveBy(this.#offset.x, this.#offset.y, this.#speed);
                        repeatCtx.moveBy(-this.#offset.x, -this.#offset.y, this.#speed);
                    });
            }
            this.#moving = true;
        }

        if (this.#moving) {
            this.rotation -= 0.1;
        }
    }

    onPlayerDeath() {
        this.#playerDeath = true;
        this.actions.clearActions();
        this.#moving = false;
    }

    onLevelRestart() {
        this.body.pos.x = this.#originalX;
        this.body.pos.y = this.#originalY;
        this.#playerDeath = false;
    }
}
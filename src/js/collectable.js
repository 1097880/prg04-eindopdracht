import { Actor, CollisionType, Vector } from "excalibur";
import { Player } from "./player";

export class Collectable extends Actor {

    #fadeTime = 0;
    #isFading = false;
    #isCollected = false;

    #originalX;
    #originalY;

    constructor(x, y, sprite) {
        super({
            x: x - sprite.width / 2,
            y: y,
            radius: sprite.width / 2,
            collisionType: CollisionType.Passive
        });
        this.graphics.use(sprite.toSprite());
        this.#originalX = this.pos.x;
        this.#originalY = this.pos.y;
    }

    onInitialize(engine) {
        this.on('collisionstart', (e) => this.collisionHandler(e));
    }

    onPreUpdate(engine, delta) {
        if (this.#isFading) {
            this.#fadeTime += delta;
            this.graphics.opacity = Math.max(1 - this.#fadeTime / 500, 0);
            if (this.#fadeTime >= 500) {
                this.#isFading = false;
            }
        }
    }

    collisionHandler(e) {
        if (e.other.owner instanceof Player) {
            this.actions.moveBy(new Vector(0, -100), 200);
            this.#isFading = true;
            this.#fadeTime = 0;

            if(!this.#isCollected) this.onPlayerCollide(e, e.other.owner);

            this.#isCollected = true;
        }
    }

    onLevelRestart() {
        this.graphics.opacity = 1;
        this.pos = new Vector(this.#originalX, this.#originalY);
        this.#isCollected = false;
    }

    onPlayerCollide(e, player) {

    }

}
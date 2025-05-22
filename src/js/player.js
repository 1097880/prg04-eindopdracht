import { Actor, CollisionType, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {

    isGrounded = false;

    constructor() {
        super({
            pos: new Vector(120, 600),
            scale: new Vector(2, 2),
            radius: Resources.Player.width / 2,
            collisionType: CollisionType.Active
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player.toSprite());
    }

    onPreUpdate(engine) {
        if(engine.input.keyboard.wasPressed(Keys.Space)) {

        }
    }

}
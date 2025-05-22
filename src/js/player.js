import { Actor, CollisionType, Keys, Vector } from "excalibur";
import { Resources } from "./resources";
import { Block } from "./block";
import { FloorSlide } from "./particles/floorslide";

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
        this.body.mass = 1;

        // this.body.vel = new Vector(300, 0);
        this.floorslide = new FloorSlide();
        this.addChild(this.floorslide);

        this.on('collisionstart', (e) => this.collisionHandler(e));
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.isHeld(Keys.Space) && this.isGrounded) {
            this.body.vel = new Vector(this.body.vel.x, -700);
            this.isGrounded = false;
        }
        
        this.floorslide.isEmitting = this.isGrounded;
    }

    collisionHandler(e) {
        if (e.other.owner instanceof Block) {
            const playerBottom = this.pos.y + this.height / 2
            const blockTop = e.other.owner.pos.y - e.other.owner.height / 2

            if (Math.abs(playerBottom - blockTop) < 10) {
                this.isGrounded = true;
                this.body.vel = new Vector(this.body.vel.x, 0);
            }

            console.log(playerBottom, blockTop);
        }
    }

}
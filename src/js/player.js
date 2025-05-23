import { Actor, CollisionType, Keys, Vector } from "excalibur";
import { Resources } from "./resources";
import { Block } from "./block";
import { FloorSlide } from "./particles/floorslide";

export class Player extends Actor {

    #speed = 535;
    #jumpStrength = 1150;
    
    #isGrounded = false;
    #gameStarted = false;

    constructor() {
        super({
            pos: new Vector(250, 200),
            scale: new Vector(2, 2),
            radius: Resources.Player.width / 2
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player.toSprite());
        this.body.mass = 1;
        this.updateCameraPos();

        this.floorslide = new FloorSlide();
        this.addChild(this.floorslide);

        this.on('collisionstart', (e) => this.collisionHandler(e));
        this.on('collisionend', (e) => { this.#isGrounded = false })
    }

    onPreUpdate(engine) {
        if(this.body.vel.x > 0) {
            this.updateCameraPos();
        }

        if(this.#gameStarted) this.body.vel = new Vector(this.#speed, this.body.vel.y);

        if (engine.input.keyboard.isHeld(Keys.Space) && this.#isGrounded) {
            this.jump();
        }
        if (engine.input.keyboard.wasPressed(Keys.Space) && !this.#gameStarted) {
            this.startGame();
        }

        
        // @ts-ignore
        this.floorslide.isEmitting = this.#isGrounded;
    }

    jump() {
        this.body.vel = new Vector(this.body.vel.x, -this.#jumpStrength);
        this.#isGrounded = false;
    }

    updateCameraPos() {
        this.scene?.camera.strategy.radiusAroundActor(this, 450);
        this.scene?.camera.move(new Vector(this.pos.x + 390, this.scene?.camera.pos.y), 0);
    }

    startGame() {
        this.#gameStarted = true;
        this.body.collisionType = CollisionType.Active;

        // @ts-ignore
        this.scene?.engine.ui.startGame();
    }

    collisionHandler(e) {
        if (e.other.owner instanceof Block) {
            const playerBottom = this.pos.y + this.height / 2
            const blockTop = e.other.owner.pos.y - e.other.owner.height / 2

            if (Math.abs(playerBottom - blockTop) < 10) {
                this.#isGrounded = true;
                this.body.vel = new Vector(this.body.vel.x, 0);
            }
        }
    }

}
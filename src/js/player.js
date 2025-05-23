import { Actor, CollisionType, Keys, Vector } from "excalibur";
import { Resources } from "./resources";
import { Block } from "./block";
import { FloorSlide } from "./particles/floorslide";

export class Player extends Actor {

    #speed = 535;
    #jumpStrength = 1150;
    
    #isGrounded = false;
    #isAlive = false;
    #isResetting = false;

    #lives = 3;

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

        if(this.#isAlive && this.body.vel.x < this.#speed) {
            this.body.vel = new Vector(this.#speed, this.body.vel.y);
        }

        if (engine.input.keyboard.isHeld(Keys.Space) && this.#isGrounded && this.#isAlive && !this.#isResetting) {
            this.jump();
        }
        if (engine.input.keyboard.wasPressed(Keys.Space) && !this.#isAlive && !this.#isResetting) {
            this.startGame();
        }

        this.floorslide.isEmitting = this.#isGrounded && this.#isAlive;
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
        this.#isAlive = true;
        this.body.collisionType = CollisionType.Active;

        this.scene?.engine.ui.startGame();

        Resources.MenuMusic.stop();
        Resources.GameMusic.play();
    }

    restartLevel() {
        this.#isAlive = false;
        this.#isResetting = true;
        
        this.body.useGravity = false;
        this.vel = Vector.Zero;
        
        this.graphics.isVisible = false;

        Resources.GameMusic.stop();
        Resources.DeathSfx.play();

        setTimeout(() => {
            this.pos = new Vector(250, 360);

            this.#isAlive = true;
            this.#isResetting = false;

            this.body.useGravity = true;

            this.graphics.isVisible = true;

            Resources.GameMusic.play();
        }, 1500);
    }

    collisionHandler(e) {
        if (e.other.owner instanceof Block) {
            const playerBottom = this.pos.y + this.height / 2
            const blockTop = e.other.owner.pos.y - e.other.owner.height / 2

            if (Math.abs(playerBottom - blockTop) < 10) {
                this.#isGrounded = true;
                this.body.vel = new Vector(this.body.vel.x, 0);
            } else {
                this.restartLevel();
            }
        }
    }

}
import { Actor, CollisionType, Color, Keys, Vector } from "excalibur";
import { Resources } from "./resources";
import { Block } from "./block";
import { FloorSlide } from "./particles/floorslide";
import { JumpPad } from "./jumppad";
import { PadTrail } from "./particles/padtrail";
import { GravityPad } from "./gravitypad";
import { Spike } from "./spike";

export class Player extends Actor {

    #speed = 535;
    #jumpStrength = 1150;

    #isGrounded = false;
    #isAlive = false;
    #isResetting = false;
    #isFlipping = false;

    lives = 3;

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
        this.scene?.camera.strategy.radiusAroundActor(this, 430);
        this.updateCameraPos();

        this.floorslide = new FloorSlide();
        this.addChild(this.floorslide);
        this.jumppadtrail = new PadTrail(Color.Green);
        this.addChild(this.jumppadtrail);

        this.on('collisionstart', (e) => this.collisionHandler(e));
        this.on('collisionend', (e) => {
            if (e.other.owner instanceof Block) {
                this.#isGrounded = false
            }
        })
    }

    onPreUpdate(engine) {
        if (this.body.vel.x > 0) {
            this.updateCameraPos();
        }

        if (this.#isAlive && (this.body.vel.x < this.#speed || this.body.vel.x > this.#speed)) {
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
        const flip = (this.scene.engine.physics.gravity.y > 0) ? 1 : -1;
        this.body.vel = new Vector(this.body.vel.x, -this.#jumpStrength * flip);
        this.#isGrounded = false;
    }

    updateCameraPos() {
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
        this.#isFlipping = false;
        this.lives = 3;

        this.body.useGravity = false;
        this.vel = Vector.Zero;
        this.scene.engine.physics.gravity = new Vector(this.scene.engine.physics.gravity.x, 4000);

        this.graphics.opacity = 0;

        Resources.GameMusic.stop();
        Resources.DeathSfx.play();

        setTimeout(() => {
            this.pos = new Vector(250, 360);

            this.#isAlive = true;
            this.#isResetting = false;

            this.body.useGravity = true;

            this.graphics.opacity = 1;

            this.scene.engine.ui.updateLives(this.lives);
            Resources.GameMusic.play();
        }, 1500);
    }

    collisionHandler(e) {
        if (e.other.owner instanceof GravityPad) {
            const gravity = this.scene.engine.physics.gravity;
            this.scene.engine.physics.gravity = new Vector(gravity.x, gravity.y * -1);

            this.#isFlipping = true;
        }

        if (e.other.owner instanceof Block) {
            this.jumppadtrail.isEmitting = false;
            const playerBottom = this.pos.y + this.height / 2;
            const blockTop = e.other.owner.pos.y - e.other.owner.height / 2;

            const playerTop = this.pos.y - this.height / 2;
            const blockBottom = e.other.owner.pos.y + e.other.owner.height / 2;

            if (Math.abs(playerBottom - blockTop) < 10 && this.scene.engine.physics.gravity.y > 0) {
                this.#isGrounded = true;
                this.#isFlipping = false;
                this.body.vel = new Vector(this.body.vel.x, 0);
                this.floorslide.pos.y = 16;
            } else if (Math.abs(blockBottom - playerTop) < 10 && this.scene.engine.physics.gravity.y < 0) {
                this.#isGrounded = true;
                this.#isFlipping = false;
                this.body.vel = new Vector(this.body.vel.x, 0);
                this.floorslide.pos.y = -16;
            } else {
                if (!this.#isResetting && !this.#isFlipping) this.restartLevel();
            }
        }

        if (e.other.owner instanceof JumpPad) {
            this.body.vel.y = -1600;
            this.jumppadtrail.isEmitting = true;
        }

        if (e.other.owner instanceof Spike) {
            this.#isGrounded = true;
            this.lives--;
            this.scene.engine.ui.updateLives(this.lives);
            Resources.HitSfx.play();

            if (this.lives < 1) {
                this.restartLevel();
            }
        }
    }

}
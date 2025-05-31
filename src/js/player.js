import { Actor, CollisionType, Color, Keys, RadiusAroundActorStrategy, Vector } from "excalibur";
import { Resources } from "./resources";
import { Block } from "./block";
import { FloorSlide } from "./particles/floorslide";
import { JumpPad } from "./jumppad";
import { PadTrail } from "./particles/padtrail";
import { GravityPad } from "./gravitypad";
import { Obstacle } from "./obstacle";
import { JumpOrb } from "./jumporb";
import { SawBlade } from "./sawblade";
import { FlyPortal } from "./flyportal";
import { Fly } from "./particles/fly";
import { Finish } from "./finish";
import { Collectable } from "./collectable";

export class Player extends Actor {

    #speed = 535;
    #jumpStrength = 1150;
    #flyStrength = 500;

    #isGrounded = false;
    #isAlive = false;
    #isResetting = false;
    #isFlipping = false;
    #isFlying = false;
    #levelComplete = false;

    #isTouchingJumpOrb = false;
    #jumpBuffer = 0;

    lives = 3;
    coins = 0;
    score = 0;

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
        this.gravitypadtrail = new PadTrail(Color.Purple);
        this.addChild(this.gravitypadtrail);
        this.flyparticle = new Fly();
        this.addChild(this.flyparticle);

        this.on('collisionstart', (e) => this.collisionHandler(e));
        this.on('collisionend', (e) => {
            if (e.other.owner instanceof Block) {
                this.#isGrounded = false
            }
            if (e.other.owner instanceof JumpOrb) {
                this.#isTouchingJumpOrb = false;
            }
        })
    }

    onPreUpdate(engine, delta) {
        // Camera Logic
        if (this.body.vel.x > 0 && this.body.pos.x < 23750) {
            this.updateCameraPos();
        }
        if (this.body.pos.x >= 23750 && this.body.pos.x < 24000) {
            this.scene?.camera.strategy.radiusAroundActor(this, 1000);
        }

        // Update current score
        if (this.#isAlive) {
            this.score += delta / 10;
            this.score = Math.round(this.score);
            this.scene.engine.ui.updateScore(this.score);
        }

        // Keep Player at the same speed, even if
        // barely touched a wall.
        if (this.#isAlive && (this.body.vel.x < this.#speed || this.body.vel.x > this.#speed)) {
            this.body.vel = new Vector(this.#speed, this.body.vel.y);
        }

        // Restart the level if player falls out of
        // the world.
        if (this.#isAlive && (this.body.pos.y > 2000 || this.body.pos.y < -1000)) {
            this.restartLevel();
        }

        // Jump Logic
        if (engine.input.keyboard.isHeld(Keys.Space) && this.#isGrounded && this.#isAlive && !this.#isResetting && !this.#isFlying) {
            this.jump();
        }

        // Fly Logic
        if (engine.input.keyboard.isHeld(Keys.Space) && this.#isAlive && !this.#isResetting && this.#isFlying) {
            this.fly();
        }

        // Jump Orb Logic
        if (engine.input.keyboard.wasPressed(Keys.Space) && this.isActive && !this.#isResetting) {
            this.#jumpBuffer = 0.15;
            if (this.#isTouchingJumpOrb) {
                const flip = (this.scene.engine.physics.gravity.y > 0) ? 1 : -1;
                this.body.vel.y = -this.#jumpStrength * flip;
                this.jumppadtrail.isEmitting = true;
            }
        }
        if (this.#isTouchingJumpOrb && this.#jumpBuffer > 0) {
            const flip = (this.scene.engine.physics.gravity.y > 0) ? 1 : -1;
            this.body.vel.y = -this.#jumpStrength * flip;
            this.jumppadtrail.isEmitting = true;
            this.#jumpBuffer = 0;
        }
        if (this.#jumpBuffer > 0) {
            this.#jumpBuffer -= engine.clock.elapsed() / 1000;
        }

        // Start Game Logic
        if (engine.input.keyboard.wasPressed(Keys.Space) && !this.#isAlive && !this.#isResetting && !this.#levelComplete) {
            this.startGame();
        }

        // FloorSlide particle
        this.floorslide.isEmitting = this.#isGrounded && this.#isAlive && !this.#isFlying;
    }

    jump() {
        const flip = (this.scene.engine.physics.gravity.y > 0) ? 1 : -1;
        this.body.vel = new Vector(this.body.vel.x, -this.#jumpStrength * flip);
        this.#isGrounded = false;
    }

    fly() {
        const flip = (this.scene.engine.physics.gravity.y > 0) ? 1 : -1;

        this.body.vel = new Vector(this.body.vel.x, -this.#flyStrength * flip);
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
        this.#isFlying = false;
        this.lives = 3;
        this.coins = 0;

        this.flyparticle.isEmitting = false;

        this.body.useGravity = false;
        this.vel = Vector.Zero;
        this.scene.engine.physics.gravity = new Vector(this.scene.engine.physics.gravity.x, 4000);

        this.graphics.opacity = 0;

        this.handleHighScore();

        const sawblades = this.scene.engine.currentScene.actors.filter(child => child instanceof SawBlade);
        const collectables = this.scene.engine.currentScene.actors.filter(child => child instanceof Collectable);
        sawblades.forEach(blade => {
            blade.onPlayerDeath();
        });
        collectables.forEach(collectable => {
            collectable.onLevelRestart();
        });

        Resources.GameMusic.stop();
        Resources.DeathSfx.play();

        setTimeout(() => {
            this.pos = new Vector(250, 360);

            this.#isAlive = true;
            this.#isResetting = false;

            this.body.useGravity = true;
            this.score = 0;

            this.graphics.opacity = 1;

            sawblades.forEach(blade => {
                blade.onLevelRestart();
            });

            this.scene.engine.ui.updateLives(this.lives);
            this.scene.engine.ui.updateCoins(this.coins);
            Resources.GameMusic.play();
        }, 1500);
    }

    levelCompleted() {
        this.#isAlive = false;
        this.#isFlying = false;
        this.#levelComplete = true;

        this.flyparticle.isEmitting = false;

        this.graphics.opacity = 0;

        Resources.GameMusic.stop();
        Resources.VictorySfx.play();

        this.score = 5500;
        this.score += this.coins * 1500;
        this.scene.engine.ui.updateScore(this.score);

        this.handleHighScore();

        this.scene?.engine.ui.finishGame();
    }

    handleHighScore() {
        if (this.score > (localStorage.getItem('highscore') || 0)) {
            this.scene.engine.ui.updateHighScore(this.score);
        }
    }

    collisionHandler(e) {
        if (e.other.owner instanceof GravityPad) {
            const gravity = this.scene.engine.physics.gravity;
            this.scene.engine.physics.gravity = new Vector(gravity.x, gravity.y * -1);
            this.gravitypadtrail.isEmitting = true;

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
                this.gravitypadtrail.isEmitting = false;
                this.body.vel = new Vector(this.body.vel.x, 0);
                this.floorslide.pos.y = 16;
            } else if (Math.abs(blockBottom - playerTop) < 10 && this.scene.engine.physics.gravity.y < 0) {
                this.#isGrounded = true;
                this.#isFlipping = false;
                this.gravitypadtrail.isEmitting = false;
                this.body.vel = new Vector(this.body.vel.x, 0);
                this.floorslide.pos.y = -16;
            } else {
                if (!this.#isResetting && !this.#isFlipping) this.restartLevel();
            }
        }

        if (e.other.owner instanceof JumpPad) {
            const flip = (this.scene.engine.physics.gravity.y > 0) ? 1 : -1;
            this.body.vel.y = -1600 * flip;
            this.jumppadtrail.isEmitting = true;
        }

        if (e.other.owner instanceof JumpOrb) {
            this.#isTouchingJumpOrb = true;
        }

        if (e.other.owner instanceof Obstacle) {
            this.#isGrounded = true;
            this.lives--;
            this.scene.engine.ui.updateLives(this.lives);
            Resources.HitSfx.play();

            if (this.lives < 1) {
                this.restartLevel();
            }
        }

        if (e.other.owner instanceof FlyPortal) {
            this.#isFlying = !this.#isFlying;
            this.flyparticle.isEmitting = this.#isFlying;
        }

        if (e.other.owner instanceof Finish) {
            this.levelCompleted();
        }
    }

}
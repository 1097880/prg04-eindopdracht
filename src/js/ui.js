import { Actor, Color, Label, ScreenElement, Sprite, TextAlign, Vector } from "excalibur";
import { Resources } from "./resources";

export class UI extends ScreenElement {

    #player;
    #logo;
    #hearts;
    #coinCounter;

    #startMessage;
    #zoomTime = 0;
    #fading = false;
    #highScore;

    #lives;
    #coins;

    constructor(player) {
        super();
        this.#player = player;
        this.#lives = player.lives;
        this.#coins = player.coins;

        this.#highScore = localStorage.getItem('highscore') || 0;
    }

    onInitialize(engine) {
        this.#logo = new Actor({
            pos: new Vector(640, 200),
            scale: new Vector(0.9, 0.9)
        });
        this.#logo.graphics.use(Resources.Logo.toSprite());
        this.addChild(this.#logo);

        this.#startMessage = new Label({
            text: 'Press Space to start!',
            pos: new Vector(640, 350),
            font: Resources.PixelFont.toFont({
                size: 25,
                color: Color.Green,
                textAlign: TextAlign.Center
            })
        });
        this.addChild(this.#startMessage);

        this.highScoreLabel = new Label({
            text: `Highscore: ${this.#highScore}`,
            pos: new Vector(640, 50),
            font: Resources.PixelFont.toFont({
                size: 15,
                color: Color.White,
                textAlign: TextAlign.Center
            })
        });
        this.addChild(this.highScoreLabel);
        
        this.scoreLabel = new Label({
            text: '',
            pos: new Vector(640, 75),
            font: Resources.PixelFont.toFont({
                size: 15,
                color: Color.White,
                textAlign: TextAlign.Center
            })
        });
        this.addChild(this.scoreLabel);

        this.#hearts = new Actor({
            x: 50,
            y: -75,
            anchor: Vector.Zero
        })
        this.#hearts.heartImage = new Sprite({
            image: Resources.Heart,
            sourceView: {
                x: 0,
                y: 0,
                width: 64 * this.#lives,
                height: 64
            }
        });
        this.#hearts.graphics.use(this.#hearts.heartImage);
        this.addChild(this.#hearts);

        this.#coinCounter = new Actor({
            x: 1198,
            y: -75,
            anchor: Vector.Zero
        })
        this.#coinCounter.coinImage = new Sprite({
            image: Resources.Coin,
            sourceView: {
                x: 0,
                y: 0,
                width: -64 * this.#coins,
                height: 64
            }
        });
        this.#coinCounter.graphics.use(this.#coinCounter.coinImage);
        this.addChild(this.#coinCounter);
    }

    onPreUpdate(engine, delta) {
        if (this.#startMessage) {
            this.#zoomTime += delta / 1000
            const scale = 1 + 0.02 * Math.sin(this.#zoomTime * 5)
            this.#startMessage.scale = new Vector(scale, scale);
        }

        if (this.#fading && this.#startMessage) {
            this.#startMessage.opacity -= delta * 0.002;
            if (this.#startMessage.opacity < 0.01) {
                this.#startMessage.kill();
                this.#startMessage = null;
                this.#fading = false;
            }
        }
    }

    startGame() {
        this.#fading = true;

        this.#logo.actions.moveTo(new Vector(640, -100), 500);

        this.#hearts.actions.moveTo(new Vector(50, 50), 125);
        this.#coinCounter.actions.moveTo(new Vector(1198, 50), 125);

        this.updateCoins(this.#coins);
    }

    finishGame() {
        this.#hearts.actions.moveTo(new Vector(300, 360), 500);
        this.#coinCounter.actions.moveTo(new Vector(980, 360), 500);

        this.scoreLabel.actions.moveTo(new Vector(640, 225), 350);
        this.scoreLabel.scale = new Vector(2, 2);

        const coinBonus = new Label({
            text: `+${this.#player.coins * 1500} bonus!`,
            pos: new Vector(890, 340),
            font: Resources.PixelFont.toFont({
                size: 15,
                color: Color.White,
                textAlign: TextAlign.Center
            })
        });
        this.addChild(coinBonus);
    }

    updateLives(lives) {
        this.#lives = lives;
        this.#hearts.heartImage.sourceView.width = 64 * this.#lives;
        this.#hearts.heartImage.width = 64 * this.#lives;
    }

    updateCoins(coins) {
        this.#coins = coins;
        this.#coinCounter.coinImage.sourceView.width = -64 * this.#coins;
        this.#coinCounter.coinImage.width = - 64 * this.#coins;
    }

    updateScore(score) {
        this.scoreLabel.text = `Score: ${score}`;
    }

    updateHighScore(score) {
        localStorage.setItem('highscore', score);
        this.highScoreLabel.text = `Highscore: ${score}`;
    }

}
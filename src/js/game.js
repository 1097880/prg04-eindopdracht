import '../css/style.css';
import { DisplayMode, Engine, SolverStrategy, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Block } from './block.js';
import { UI } from './ui.js';
import { Spike } from './spike.js';
import { JumpPad } from './jumppad.js';
import { GravityPad } from './gravitypad.js';
import { SawBlade } from './sawblade.js';
import { JumpOrb } from './jumporb.js';
import { FlyPortal } from './flyportal.js';
import { Finish } from './finish.js';
import { Coin } from './coin.js';


export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                gravity: new Vector(0, 4000),
                solver: SolverStrategy.Arcade
            }
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("Starting game...");

        this.player = new Player();
        this.add(this.player);

        const LevelLayout = [
            [Block, 0, 720, 85, 2],
            [Block, 64 * 18, 592, 1, 2],
            [Block, 64 * 28, 592, 1, 2],
            [Spike, 64 * 37, 592, 3, false],
            [Block, 64 * 38, 592, 1, 2],
            [Spike, 64 * 42, 592, 1, false],
            [Spike, 64 * 46, 592, 3, false],
            [Block, 64 * 57, 592, 4, 1],
            [Block, 64 * 61, 400, 1, 2],
            [JumpPad, 64 * 62, 592],
            [Spike, 64 * 63, 592, 5, false],
            [Spike, 64 * 74, 592, 2, false],
            [JumpPad, 64 * 81, 592],
            [Block, 64 * 86, 464, 5, 1],
            [Block, 64 * 94, 400, 1, 1],
            [Block, 64 * 97, 272, 3, 1],
            [Block, 64 * 102, 144, 3, 1],
            [JumpPad, 64 * 104, 80],
            [Block, 64 * 110, 272, 3, 1],
            [Block, 64 * 114, 272, 1, 0.5],
            [Block, 64 * 116, 336, 3, 0.5],
            [Block, 64 * 120, 400, 5, 0.5],
            [Block, 64 * 128, 464, 5, 1],
            [Block, 64 * 136, 528, 10, 2],
            [Spike, 64 * 140, 400, 3, false],
            [Block, 64 * 148, 720, 30, 2],
            [GravityPad, 64 * 148, 592, false],
            [Spike, 64 * 150, 592, 16, false],
            [Block, 64 * 151, 272, 20, 2],
            [Block, 64 * 162, 400, 1, 2],
            [GravityPad, 64 * 164, 272, true],
            [GravityPad, 64 * 171, 592, false],
            [SawBlade, 64 * 170, 400, new Vector(-64 * 2, 0), 100],
            [Block, 64 * 173, 272, 21, 2],
            [Spike, 64 * 176, 336, 3, false, true],
            [Block, 64 * 183, 400, 1, 2],
            [Block, 64 * 187, 464, 1, 4],
            [Block, 64 * 189, 400, 1, 3],
            [Block, 64 * 192, 528, 1, 4],
            [GravityPad, 64 * 192, 528, true],
            [Block, 64 * 191, 848, 20, 2],
            [SawBlade, 64 * 196, 720],
            [SawBlade, 64 * 201, 592, new Vector(0, 128), 150],
            [SawBlade, 64 * 206, 592, new Vector(0, 192), 150],
            [Block, 64 * 219, 848, 4, 2],
            [JumpOrb, 64 * 215, 720],
            [JumpOrb, 64 * 227, 720],
            [JumpOrb, 64 * 231.5, 656],
            [JumpOrb, 64 * 235.5, 592],
            [Block, 64 * 240, 720, 1, 1],
            [GravityPad, 64 * 240, 656],
            [Block, 64 * 243, 144, 23, 2],
            [Spike, 64 * 253, 208, 6, false, true],
            [JumpOrb, 64 * 255, 272],
            [Spike, 64 * 262, 208, 3, false, true],
            [GravityPad, 64 * 265, 144, true],
            [Block, 64 * 265, 720, 120, 2],
            [Block, 64 * 265, 80, 120, 1],
            [FlyPortal, 64 * 270, 592],
            [SawBlade, 64 * 290, 400, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 300, 300, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 305, 200, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 306, 550, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 310, 300, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 315, 400, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 320, 550, new Vector(-1000, 0), 500],
            [SawBlade, 64 * 330, 200, new Vector(0, 200), 500],
            [SawBlade, 64 * 340, 550, new Vector(0, -200), 500],
            [SawBlade, 64 * 350, 350, new Vector(0, 200), 500],
            [SawBlade, 64 * 360, 350, new Vector(0, -200), 500],
            [Spike, 64 * 320, 592, 3, false, false],
            [Spike, 64 * 325, 592, 2, false, false],
            [Spike, 64 * 330, 592, 7, false, false],
            [Spike, 64 * 342, 592, 2, false, false],
            [Block, 64* 365, 350, 2, 2],
            [Block, 64 * 370, 450, 2, 2],
            [Block, 64 * 375, 250, 2, 2],
            [Block, 64 * 380, 550, 2, 2],
            [Finish, 64 * 385, 720, 3, 11],
            [Coin, 64 * 41.5, 528, Resources.Coin],
            [Coin, 64 * 121, 144, Resources.Coin],
            [Coin, 64 * 305, 250, Resources.Coin]
        ]

        for (const [object, x, y, par1, par2, par3] of LevelLayout) {
            const element = new object(x, y, par1, par2, par3);
            this.add(element);
        }

        this.ui = new UI(this.player);
        this.add(this.ui);

        Resources.MenuMusic.loop = true;
        Resources.MenuMusic.play(0.5);
    }
}

new Game();
import '../css/style.css';
import { Actor, BoundingBox, DisplayMode, Engine, SolverStrategy, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Block } from './block.js';
import { UI } from './ui.js';
import { Spike } from './spike.js';
import { JumpPad } from './jumppad.js';

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

        const player = new Player();
        this.add(player);

        const levelLayout = [
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
            [Spike, 64 * 140, 400, 3, false]
        ]

        for (const [object, x, y, par1, par2] of levelLayout) {
            const element = new object(x, y, par1, par2);
            this.add(element);
        }

        this.ui = new UI();
        this.add(this.ui);

        Resources.MenuMusic.loop = true;
        Resources.MenuMusic.play(0.5);
    }
}

new Game();
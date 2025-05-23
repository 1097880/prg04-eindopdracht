import '../css/style.css';
import { Actor, BoundingBox, DisplayMode, Engine, SolverStrategy, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Block } from './block.js';
import { UI } from './ui.js';
import { Spike } from './spike.js';

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
            [Block, 0, 720, 40, 2],
            [Block, 64 * 18, 592, 1, 2],
            [Block, 64 * 27, 592, 1, 2],
            [Spike, 64 * 37, 592, 1, false],
            [Block, 64 * 38, 592, 1, 2]
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
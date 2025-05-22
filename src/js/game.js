import '../css/style.css';
import { Actor, BoundingBox, DisplayMode, Engine, SolverStrategy, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Block } from './block.js';

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

        const block = new Block(0, 720, 40, 2);
        this.add(block);
        const block2 = new Block(960, 592, 1, 2);
        this.add(block2);
        const block3 = new Block(1216, 592, 1, 3);
        this.add(block3);
        const block4 = new Block(1472, 592, 1, 4);
        this.add(block4);
        const block5 = new Block(1472+256, 592, 1, 5);
        this.add(block5);
    }
}

new Game();
import '../css/style.css';
import { Actor, DisplayMode, Engine, SolverStrategy, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                gravity: new Vector(0, 800),
                solver: SolverStrategy.Realistic
            }
         });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("Starting game...");
        
        const player = new Player();
        this.add(player);
    }
}

new Game();
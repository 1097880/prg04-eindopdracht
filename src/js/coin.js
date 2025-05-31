import { Collectable } from "./collectable";

export class Coin extends Collectable {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    onPlayerCollide(e, player) {
        player.coins++;
        this.scene.engine.ui.updateCoins(player.coins);
    }
}
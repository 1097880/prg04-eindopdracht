import { ImageSource, Sound, Resource, Loader, ImageWrapping, FontSource } from 'excalibur';

const Resources = {
    PixelFont: new FontSource('fonts/PressStart.ttf', 'PressStart'),

    MenuMusic: new Sound('audio/menu.mp3'),
    GameMusic: new Sound('audio/game.mp3'),
    DeathSfx: new Sound('audio/death.mp3'),
    HitSfx: new Sound('audio/hit.mp3'),

    Player: new ImageSource('images/player.png'),
    Block: new ImageSource('images/block.png', { wrapping: ImageWrapping.Repeat }),
    Spike: new ImageSource('images/spike.png', { wrapping: ImageWrapping.Repeat }),
    SawBlade: new ImageSource('images/sawblade.png'),
    JumpPad: new ImageSource('images/jumppad.png'),
    GravityPad: new ImageSource('images/gravitypad.png'),

    Logo: new ImageSource('images/logo.png'),
    Heart: new ImageSource('images/heart.png', { wrapping: ImageWrapping.Repeat })
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }
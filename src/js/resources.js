import { ImageSource, Sound, Resource, Loader, ImageWrapping, FontSource } from 'excalibur';

const Resources = {
    PixelFont: new FontSource('fonts/PressStart.ttf', 'PressStart'),

    MenuMusic: new Sound('audio/menu.mp3'),
    GameMusic: new Sound('audio/game.mp3'),
    DeathSfx: new Sound('audio/death.mp3'),

    Player: new ImageSource('images/player.png'),
    Block: new ImageSource('images/block.png', { wrapping: ImageWrapping.Repeat }),
    Spike: new ImageSource('images/spike.png', { wrapping: ImageWrapping.Repeat }),

    Logo: new ImageSource('images/logo.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }
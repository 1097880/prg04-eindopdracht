import { ImageSource, Sound, Resource, Loader, ImageWrapping, FontSource } from 'excalibur';

const Resources = {
    PixelFont: new FontSource('fonts/PressStart.ttf', 'PressStart'),

    Player: new ImageSource('images/player.png'),
    Block: new ImageSource('images/block.png', { wrapping: ImageWrapping.Repeat }),

    Logo: new ImageSource('images/logo.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }
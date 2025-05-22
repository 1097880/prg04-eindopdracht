import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur';

const Resources = {
    Player: new ImageSource('images/player.png'),
    Block: new ImageSource('images/block.png', { wrapping: ImageWrapping.Repeat })
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }
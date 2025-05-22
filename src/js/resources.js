import { ImageSource, Sound, Resource, Loader } from 'excalibur';

const Resources = {
    Player: new ImageSource('images/player.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }
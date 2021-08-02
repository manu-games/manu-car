import * as PIXI from 'pixi.js'

export class Sprite{
    // TODO: Tipar..!
    public static textures:any = {}

    public static getTexture(nameResource:string){
        const loader = PIXI.Loader.shared
        const resource = loader.resources[nameResource];
        // console.log(resource)
        const texture = PIXI.Texture.from(nameResource);
        console.log(texture)

        return texture
    }
}

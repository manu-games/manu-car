import * as PIXI from 'pixi.js'
import {App} from './index'

export class Loader{
    // TODO: Tipar..!
    public static textures:any = {}

    public static load(){
        const loader = PIXI.Loader.shared
        loader.baseUrl = 'assets'
        loader.add('sprites/cars.json')

        loader.load(this.setup)
        loader.onComplete.add(this.doneLoading)
    }

    // TODO: Buscar una mejor alternativa..
    private static doneLoading(){
        App.setup()
    }

    private static setup(loader, resources){
        const sheet = resources['sprites/cars.json'].data
        const frames = sheet.frames

        Object.keys(frames).forEach(key =>{
            const texture = PIXI.Texture.from(key)
            Loader.textures[key] = texture
        })
    }
}

import * as PIXI from 'pixi.js'
import {Auto} from './Auto'

type WorldObject = Auto

export class GameApp{
    public static app: PIXI.Application
    private width:number
    private height:number
    private entidades: Array<WorldObject> = []

    public constructor(_width:number, _height:number){
        GameApp.app = new PIXI.Application({
            transparent: true,
            backgroundColor: 0x1099bb,
            width: _width,
            height: _height,
            resolution: 1,
            antialias: true
        })
        document.body.appendChild(GameApp.app.view)

        this.width = _width
        this.height = _height

        this.init()
        GameApp.app.ticker.add(delta => this.update(delta))
    }

    private init(){
        const velocidad = {vx:0, vy:0}
        const auto = new Auto(this.width/2, this.height/2, velocidad)

        this.entidades.push(auto)

        GameApp.app.stage.addChild(auto.getSprite())
    }

    private update(delta){
        this.entidades.forEach(entidad => {
            entidad.update(delta)
        })
    }

    public static getWidth():number{
        return GameApp.app.renderer.width
    }

    public static getHeight():number{
        return GameApp.app.renderer.height
    }
}



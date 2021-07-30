import * as PIXI from 'pixi.js'

export class GameApp{
    private app: PIXI.Application
    static stage: PIXI.Container

    public constructor(_width:number, _height:number){
        this.app = new PIXI.Application({
            transparent: true,
            backgroundColor: 0x1099bb,
            width: _width,
            height: _height,
            resolution: 1,
            antialias: true
        })

        GameApp.stage = this.app.stage
        document.body.appendChild(this.app.view)

    }
}

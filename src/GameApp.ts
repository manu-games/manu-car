import * as PIXI from 'pixi.js'
import {Auto, Rival, Jugador} from './Jugador'
import {Lib} from './Lib'

type WorldObject = Auto

export class GameApp{
    public static app: PIXI.Application
    private width:number
    private height:number
    private entidades: Array<WorldObject> = []
    public jugador:Jugador
    private rivales = []
    private cantidadRivales = 10
    private nivel:number
    private tiempoTranscurrido:number = 0

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

    public static getWidth():number{
        return GameApp.app.renderer.width
    }

    public static getHeight():number{
        return GameApp.app.renderer.height
    }

    private init():void{
        this.nivel = 1
        const velocidadInicial = 5
        this.jugador = new Auto(this.width/2, this.height/2, velocidadInicial)

        this.entidades.push(this.jugador)

        GameApp.app.stage.addChild(this.jugador.getSprite())
    }

    private update(delta:number):void{
        this.generarRivales()

        this.entidades.forEach( (entidad, index) => {
            entidad.update(delta, index)
        })

        this.detectarColisiones()
    }

    private detectarColisiones():void{
        this.rivales.forEach( (rival, index) =>{
            const hayColision = Lib.hayColisionEntre(rival, this.jugador)

            if(hayColision){
                console.log('boom')
            }

        })
    }

    private generarRivales():void{
        this.tiempoTranscurrido += 1

        const velocidadInicial = this.nivel
        const rival = new Rival(0, 0, velocidadInicial)
        const posX = Lib.getNumberBetween(0, GameApp.getWidth() - rival.getWidth())
        rival.setPosX(posX)

        if(this.tiempoTranscurrido % (100 / this.nivel) == 0){
            this.entidades.push(rival)
            this.rivales.push(rival)
            GameApp.app.stage.addChild(rival.getSprite())
        }
    }
}



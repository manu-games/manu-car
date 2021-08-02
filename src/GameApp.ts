import * as PIXI from 'pixi.js'
import {Auto, Rival, Jugador} from './Jugador'
import {Lib} from './Lib'
import {Loader} from './Loader'

type WorldObject = Auto

export class GameApp{
    public static app: PIXI.Application
    private width:number
    private height:number
    private entidades: Array<WorldObject> = []
    public jugador:Jugador
    private rivales = []
    private cantidadRivales = 10
    private nivel:number = 1
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

        Loader.load()

        // loader.load(this.setup)
        // loader.onComplete.add(this.setup)
        // this.setup()
    }

    public static getWidth():number{
        return GameApp.app.renderer.width
    }

    public static getHeight():number{
        return GameApp.app.renderer.height
    }

    public setup():void{
        const velocidadInicial = 5
        const textureSeleccionada = 1
        const texture = Loader.textures[`car_${textureSeleccionada}.png`]
        this.jugador = new Auto(texture, this.width/2, this.height/2, velocidadInicial)
        this.entidades.push(this.jugador)

        GameApp.app.stage.addChild(this.jugador.getSprite())

        GameApp.app.ticker.add(delta => this.update(delta))
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
        const textureSeleccionada = Lib.getNumberBetween(2,5)
        const texture = Loader.textures[`car_${textureSeleccionada}.png`]

        const rival = new Rival(texture, 0, 0, velocidadInicial)
        const posX = Lib.getNumberBetween(0, GameApp.getWidth() - rival.getWidth())
        rival.setPosX(posX)

        if(this.tiempoTranscurrido % (100 / this.nivel) == 0){
            this.entidades.push(rival)
            this.rivales.push(rival)
            GameApp.app.stage.addChild(rival.getSprite())
        }
    }
}



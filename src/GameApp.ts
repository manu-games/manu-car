import * as PIXI from 'pixi.js'
import {Auto, Rival, Jugador} from './Jugador'
import {Escenario} from './Escenario'
import {Lib} from './Lib'
import {Loader} from './Loader'
import {Sprite} from './Sprite'

type WorldObject = Auto | Escenario

export class GameApp{
    public static app: PIXI.Application
    private entidades: Array<WorldObject> = []
    public escenario:Escenario
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

        Loader.load()
        // TODO: Como creeria que deberia ser en realidad
        // loader.onComplete.add(this.setup)
    }

    public static getWidth():number{
        return GameApp.app.renderer.width
    }

    public static getHeight():number{
        return GameApp.app.renderer.height
    }

    public setup():void{
        // NOTA: es importante el orden en que se agregan al stage...
        this.generarEscenario()
        this.generarJugadorPrincipal()

        GameApp.app.ticker.add(delta => this.update(delta))
    }

    private update(delta:number):void{
        this.generarRivales()

        this.entidades.forEach(entidad => {
            entidad.update(delta)
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

    private generarEscenario():void{
        const roadTexture = Sprite.getTexture('sprites/road.png')
        this.escenario = new Escenario(roadTexture)

        this.entidades.push(this.escenario)
        GameApp.app.stage.addChild(this.escenario.getSprite())
    }

    private generarJugadorPrincipal():void{
        const velocidadInicial = 5
        const textureSeleccionada = 1
        const texture = Sprite.textures[`car_${textureSeleccionada}.png`]
        this.jugador = new Auto(texture, GameApp.getWidth()/2, GameApp.getHeight()/2, velocidadInicial)

        this.entidades.push(this.jugador)
        GameApp.app.stage.addChild(this.jugador.getSprite())
    }

    private generarRivales():void{
        this.tiempoTranscurrido += 1

        const velocidadInicial = this.nivel
        const textureSeleccionada = Lib.getNumberBetween(2,5)
        const texture = Sprite.textures[`car_${textureSeleccionada}.png`]

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



import * as PIXI from 'pixi.js'
import {ManuContainer} from './Pixi.mixin'
import {Auto, Rival, Jugador} from './Jugador'
import {Escenario, Autopista} from './Escenario'
import {Lib} from './Lib'
import {Loader} from './Loader'
import {Sprite} from './Sprite'

type WorldObject = Escenario | Jugador

export class GameApp{
    public static app: PIXI.Application
    public static nivel:number = 1
    private entidades: Array<WorldObject> = []
    public static escenario:Escenario
    public jugador:Jugador
    public static rivales: Jugador[]= []
    private cantidadRivales = 10
    private tiempoTranscurrido:number = 0
    public static velocidadAcelerada:number = 1

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
        GameApp.rivales.forEach( (rival, index) =>{
            const hayColision = Lib.hayColisionEntre(rival, this.jugador)

            if(hayColision){
                console.log('boom')
            }

        })
    }

    private generarEscenario():void{
        const roadTexture = Sprite.escenarioTextures['sprites/road.png']
        // const zonaJugable = new PIXI.Container()
        const zonaJugable = new ManuContainer()
        GameApp.escenario = new Autopista(roadTexture, zonaJugable)

        this.entidades.push(GameApp.escenario)
        GameApp.app.stage.addChild(GameApp.escenario.getSprite())
        GameApp.app.stage.addChild(GameApp.escenario.getZonaJugable())
    }

    private generarJugadorPrincipal():void{
        const textureSeleccionada = 1
        const texture = Sprite.autoTextures[`car_${textureSeleccionada}.png`]
        this.jugador = new Auto(texture, GameApp.getWidth()/2, GameApp.getHeight()/2, GameApp.velocidadAcelerada)

        this.entidades.push(this.jugador)
        // GameApp.app.stage.addChild(this.jugador.getSprite())
        GameApp.escenario.getZonaJugable().addChild(this.jugador.getSprite())
    }

    private generarRivales():void{
        this.tiempoTranscurrido += 1

        // TODO: Implementar un filter para elegir cualquiera que no sea el del jugador principal
        const textureSeleccionada = Lib.getNumberBetween(2,5)
        const texture = Sprite.autoTextures[`car_${textureSeleccionada}.png`]

        const rival = new Rival(texture, 0, 0, GameApp.velocidadAcelerada)

        const posX = Lib.getNumberBetween(0, GameApp.getWidth() - rival.getWidth())
        rival.setPosX(posX)

        if(this.tiempoTranscurrido % (100 / (GameApp.nivel*GameApp.velocidadAcelerada)) == 0){
            this.entidades.push(rival)
            GameApp.rivales.push(rival)
            // GameApp.app.stage.addChild(rival.getSprite())
            GameApp.escenario.getZonaJugable().addChild(rival.getSprite())
        }
    }
}



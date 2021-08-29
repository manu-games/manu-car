import * as PIXI from 'pixi.js'
import {ManuContainer} from './Pixi.mixin'
import {Auto, Rival, Jugador} from './Jugador'
import {Escenario, Autopista} from './Escenario'
import {Lib} from './Lib'
import {PositionGenerator} from './PositionGenerator'
import {Loader} from './Loader'
import {Sprite} from './Sprite'
import {TextPuntos} from './ComponenteWeb'

type WorldObject = Jugador | Rival

export class GameApp{
    public static app: PIXI.Application
    public static nivel:number = 1
    private entidades: Array<WorldObject> = []
    public static escenario:Escenario
    public static jugador:Jugador
    public static rivales: Rival[]= []
    private cantidadRivales = 0
    private tiempoTranscurrido:number = 0
    public static velocidadAcelerada:number = 1
    private puntos = 0

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

    public static getUltimoRival(): Jugador{
        return GameApp.rivales.slice(-1)[0]
    }

    public setup():void{
        // NOTA: es importante el orden en que se agregan al stage...
        this.generarEscenario()
        this.generarJugadorPrincipal()

        GameApp.app.ticker.add(delta => this.update(delta))
    }

    private update(delta:number):void{
        this.generarRivales()

        GameApp.escenario.update(delta)

        this.entidades.forEach(entidad => {
            entidad.update(delta)
        })

        this.detectarColisiones()
        this.calcularPuntos()
        this.validarRivalesEnZonaJugable()
    }

    private validarRivalesEnZonaJugable():void{
        GameApp.rivales = GameApp.rivales.filter(rival => rival.estaEnZonaJugable())
    }

    private calcularPuntos():void{
        const rivalesFueraDeZonaJugable = GameApp.rivales.filter(rival => !rival.estaEnZonaJugable())

        this.puntos += rivalesFueraDeZonaJugable.length * 10
        TextPuntos.setValor(this.puntos)
        // console.log(this.puntos)
    }

    private detectarColisiones():void{
        GameApp.rivales.forEach( (rival, index) =>{
            const hayColision = Lib.hayColisionEntre(rival, GameApp.jugador)

            if(hayColision){
                // console.log('boom')
            }

        })
    }

    private generarEscenario():void{
        const roadTexture = Sprite.escenarioTextures['sprites/road.png']
        // const zonaJugable = new PIXI.Container()
        const zonaJugable = new ManuContainer()
        GameApp.escenario = new Autopista(roadTexture, zonaJugable)

        // TODO: Da warning de violación con requestAnimationFrame
        GameApp.app.stage.addChild(GameApp.escenario.getSprite())
        GameApp.app.stage.addChild(GameApp.escenario.getZonaJugable())
    }

    private generarJugadorPrincipal():void{
        const textureSeleccionada = 1
        const texture = Sprite.autoTextures[`car_${textureSeleccionada}.png`]
        GameApp.jugador = new Auto(texture, GameApp.getWidth()/2, GameApp.getHeight()/2, GameApp.velocidadAcelerada)

        this.entidades.push(GameApp.jugador)
        // GameApp.app.stage.addChild(this.jugador.getSprite())
        GameApp.escenario.getZonaJugable().addChild(GameApp.jugador.getSprite())
    }

    private rivalesEnZonaDeSpawn(){
        return GameApp.rivales.filter(rival => rival.estaEnZonaDeSpawn())
    }

    private evitarColisionConOtrosRivales(rival: Rival){
        let posicionX = PositionGenerator.maxScaleConversion(GameApp.escenario.getZonaJugable().getWidth())
        let texture = rival.getTexture()

        if(GameApp.rivales.length > 1){
            for(let i=0; i < this.rivalesEnZonaDeSpawn().length; i++){
                const rivalAux = new Rival(texture, posicionX, 0, GameApp.velocidadAcelerada)
                const rivalEnZonaDeSpawn = this.rivalesEnZonaDeSpawn()[i]

                if(Lib.hayColisionEntre(rivalAux, rivalEnZonaDeSpawn)){
                    // Al cambiar i=-1 hacemos que el iterador empiece desde cero
                    i = -1
                    // Siempre que exista una colisión elegimos una nueva posición en el eje-x
                    posicionX = PositionGenerator.maxScaleConversion(GameApp.escenario.getZonaJugable().getWidth())
                }
            }
        }

        rival.setPosX(posicionX)
    }

    private generarRivales():void{
        this.tiempoTranscurrido++

        const tiempoEstimado = Math.floor(100 / (GameApp.nivel*GameApp.velocidadAcelerada)) // ms
        if(this.tiempoTranscurrido % tiempoEstimado == 0){
            const textureSeleccionada = Lib.getNumberBetween(2,5)
            const texture = Sprite.autoTextures[`car_${textureSeleccionada}.png`]

            const rival = new Rival(texture, 0, 0, GameApp.velocidadAcelerada)
            this.evitarColisionConOtrosRivales(rival)

            this.entidades.push(rival)
            GameApp.rivales.push(rival)
            // GameApp.app.stage.addChild(rival.getSprite())
            GameApp.escenario.getZonaJugable().addChild(rival.getSprite())
        }
    }
}



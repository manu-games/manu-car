import * as PIXI from 'pixi.js'
import {GameApp} from './GameApp'
import {ManuContainer} from './Pixi.mixin'

export abstract class Escenario{
    protected sprite: PIXI.TilingSprite
    protected velocidadAcelerada:number = 1
    protected velocidadAnimacion:number = 1
    protected zonaJugable: ManuContainer

    public getSprite(): PIXI.TilingSprite{
        return this.sprite
    }

    public setVelocidadAcelerada(velocidadAcelerada:number):void{
        this.velocidadAcelerada = velocidadAcelerada
    }

    public setVelocidadAnimacion(velocidadAnimacion:number):void{
        this.velocidadAnimacion = velocidadAnimacion
    }

    public setZonaJugable(zonaJugable: ManuContainer):void{
        this.zonaJugable = zonaJugable
    }

    public getZonaJugable(): ManuContainer{
        return this.zonaJugable
    }

    public update(delta:number):void{
        this.sprite.tilePosition.y += this.velocidadAnimacion * this.velocidadAcelerada
    }
}

export class Autopista extends Escenario{
    private lateralAutopista = 136

    public constructor(texture: PIXI.Texture, zonaJugable: ManuContainer){
        super()

        zonaJugable.myWidth = GameApp.getWidth() - this.lateralAutopista*2
        zonaJugable.myHeight = GameApp.getHeight()
        // desplazamos a la derecha para centrarlo al sprite del escenario
        zonaJugable.x = this.lateralAutopista
        this.zonaJugable = zonaJugable

        this.sprite = new PIXI.TilingSprite(
            texture,
            GameApp.getWidth(),
            GameApp.getHeight()
        )

        this.velocidadAnimacion = (GameApp.nivel / 2) * this.velocidadAcelerada

    }
}

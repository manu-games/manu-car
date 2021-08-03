import * as PIXI from 'pixi.js'
import {GameApp} from './GameApp'

export class Escenario{
    private sprite: PIXI.TilingSprite
    private velocidadAcelerada:number = 1
    private velocidadAnimacion:number = 1

    public constructor(texture: PIXI.Texture){
        this.sprite = new PIXI.TilingSprite(
            texture,
            GameApp.getWidth(),
            GameApp.getHeight()
        )

        this.velocidadAnimacion = (GameApp.nivel / 2) * this.velocidadAcelerada
    }

    public getSprite(): PIXI.TilingSprite{
        return this.sprite
    }

    public setVelocidadAcelerada(velocidadAcelerada:number):void{
        this.velocidadAcelerada = velocidadAcelerada
    }

    public setVelocidadAnimacion(velocidadAnimacion:number):void{
        this.velocidadAnimacion = velocidadAnimacion
    }

    public update(delta:number):void{
        this.sprite.tilePosition.y += this.velocidadAnimacion * this.velocidadAcelerada
    }
}

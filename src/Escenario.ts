import * as PIXI from 'pixi.js'
import {GameApp} from './GameApp'

export class Escenario{
    private sprite: PIXI.TilingSprite

    public constructor(texture: PIXI.Texture){
        this.sprite = new PIXI.TilingSprite(
            texture,
            GameApp.getWidth(),
            GameApp.getHeight()
        )
    }

    public getSprite(): PIXI.TilingSprite{
        return this.sprite
    }

    public update(delta:number):void{
        this.sprite.tilePosition.y += 0.5
    }
    // streetSprite.tileScale.set(1.5, 1.7)
    // app.stage.addChild(streetSprite)
}

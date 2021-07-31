import * as PIXI from 'pixi.js'
import {Accion} from './Accion'
import {GameApp} from './GameApp'

export abstract class Jugador{
    protected sprite: PIXI.Sprite
    protected texture: PIXI.Texture
    protected velocidad = {
        vx: 0,
        vy: 0
    }

    public setTexture(_texture: PIXI.Texture):void{
        this.texture = _texture
    }

    public setSprite(_sprite: PIXI.Sprite):void{
        this.sprite = _sprite
    }

    public getSprite(){
        return this.sprite
    }

    public update(delta:number):void{
        console.log(Accion.key)
        // - SI trata de salir del canvas hacia la der => lo detenemos ahi
        if(this.sprite.x + this.sprite.width >= GameApp.getWidth()){
            this.sprite.x = GameApp.getWidth() - this.sprite.width
        }
        // - SI trata de salir del canvas hacia la izq => lo detenemos ahi
        else if(this.sprite.x <= 0){
            this.sprite.x = 1
        }

        // - SI trata de salir del canvas hacia arriba => lo detenemos ahi
        if(this.sprite.y < 0){
            this.sprite.y = 1
        }
        // - Si trata de salir del canvas hacia abajo => lo detenemos ahi
        else if(this.sprite.y + this.sprite.height >= GameApp.getHeight()){
            this.sprite.y = GameApp.getHeight()-this.sprite.height
        }

        this.sprite.x += this.velocidad.vx * delta

        this.sprite.y += this.velocidad.vy * delta
    }

    protected setupKeyboard(keyLeft:string, keyRight:string, keyUp:string, keyDown:string):void{
        let left = Accion.keyboard(keyLeft)
        let up = Accion.keyboard(keyUp)
        let right = Accion.keyboard(keyRight)
        let down = Accion.keyboard(keyDown)

        left.press = () => {
            this.velocidad.vx = -5
        }
        left.release = () => {
            this.velocidad.vx = 0
        }

        right.press = () => {
            this.velocidad.vx = 5
        }
        right.release = () => {
            this.velocidad.vx = 0
        }

        up.press = () => {
            this.velocidad.vy -= 5
        }
        up.release = () => {
            this.velocidad.vy = 0
        }

        down.press = () => {
            this.velocidad.vy += 5
        }
        down.release = () => {
            this.velocidad.vy = 0
        }

    }
}

export class Auto extends Jugador{
    public constructor(x:number, y:number, velocidad){
        super()

        const texture = PIXI.Texture.WHITE
        const sprite = PIXI.Sprite.from(texture)

        sprite.x = x
        sprite.y = y
        sprite.width = 50
        sprite.height = 90
        sprite.tint = 0x333333

        this.velocidad = velocidad
        this.sprite = sprite
        this.texture = texture

        this.setupKeyboard('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')
    }

}

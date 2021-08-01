import * as PIXI from 'pixi.js'
import {Accion} from './Accion'
import {GameApp} from './GameApp'

export abstract class Jugador{
    protected sprite: PIXI.Sprite
    protected texture: PIXI.Texture

    public centerX:number
    public centerY:number
    public halfWidth:number
    public halfHeight:number

    protected velocidadInicial
    protected velocidad = {vx: 0, vy: 0}

    public setTexture(_texture: PIXI.Texture):void{
        this.texture = _texture
    }

    public setSprite(_sprite: PIXI.Sprite):void{
        this.sprite = _sprite
    }

    public setPosX(posX:number):void{
        this.sprite.x = posX
    }

    public getPosX():number{
        return this.sprite.x
    }

    public getPosY():number{
        return this.sprite.y
    }

    public getWidth():number{
        return this.sprite.width
    }

    public getHeight():number{
        return this.sprite.height
    }

    public getSprite(){
        return this.sprite
    }

    public update(delta:number, index:number):void{
        // - SI trata de salir del canvas hacia la der => lo detenemos ahi
        if(this.sprite.x > GameApp.getWidth()-this.getWidth()/2){
            this.sprite.x = GameApp.getWidth() - this.getWidth()/2
        }
        // - SI trata de salir del canvas hacia la izq => lo detenemos ahi
        else if(this.sprite.x < this.getWidth()/2){
            this.sprite.x = this.getWidth()/2
        }

        // - SI trata de salir del canvas hacia arriba => lo detenemos ahi
        if(this.sprite.y < GameApp.getHeight()/2){
            this.sprite.y = GameApp.getHeight()/2
        }
        // - Si trata de salir del canvas hacia abajo => lo detenemos ahi
        else if(this.sprite.y > GameApp.getHeight()-this.getHeight()/2){
            this.sprite.y = GameApp.getHeight()-this.getHeight()/2
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
            this.velocidad.vx = -this.velocidadInicial
        }
        left.release = () => {
            this.velocidad.vx = 0
        }

        right.press = () => {
            this.velocidad.vx = this.velocidadInicial
        }
        right.release = () => {
            this.velocidad.vx = 0
        }

        up.press = () => {
            this.velocidad.vy = -this.velocidadInicial
        }
        up.release = () => {
            this.velocidad.vy = 0
        }

        down.press = () => {
            this.velocidad.vy = this.velocidadInicial
        }
        down.release = () => {
            this.velocidad.vy = 0
        }

    }
}

export class Auto extends Jugador{
    public constructor(x:number, y:number, velocidadInicial:number){
        super()

        const texture = PIXI.Texture.WHITE
        const sprite = PIXI.Sprite.from(texture)

        sprite.anchor.set(0.5)

        sprite.x = x
        sprite.y = y
        sprite.width = 50
        sprite.height = 90
        sprite.tint = 0x333333

        this.velocidadInicial = velocidadInicial
        this.sprite = sprite
        this.texture = texture

        this.setupKeyboard('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')
    }

}

export class Rival extends Jugador{
    colisionado:boolean = false

    public constructor(x:number, y:number, velocidadInicial:number){
        super()

        const texture = PIXI.Texture.WHITE
        const sprite = PIXI.Sprite.from(texture)

        sprite.anchor.set(0.5)

        sprite.x = x
        sprite.y = y
        sprite.width = 50
        sprite.height = 90
        sprite.tint = 0x333333

        this.velocidadInicial = velocidadInicial
        this.sprite = sprite
        this.texture = texture

        // this.setupKeyboard('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')
    }

    public update(delta:number, index:number):void{
        // para reutilizar comportamiento de la super clase abstracta
        // y además agregarle comportamiento extra
        // super.update(delta)

        if(this.sprite.y + this.sprite.height >= GameApp.getHeight()){
            // this.remover(index)
            // this.sprite.destroy()
        }

        this.velocidad.vx = 0
        this.velocidad.vy = this.velocidadInicial

        this.sprite.x += this.velocidad.vx * delta
        this.sprite.y += this.velocidad.vy * delta
    }

    private remover(index:number):void{
        // GameApp.rivales.slice(index, 1)
        // if(sprite instanceof PIXI.DisplayObject){
        //     // sprite.destroy()
        // }
    }
}

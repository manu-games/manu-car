import * as PIXI from 'pixi.js'
import {ManuContainer} from './Pixi.mixin'
import {Accion} from './Accion'
import {GameApp} from './GameApp'

export abstract class Jugador{
    protected sprite: PIXI.Sprite
    protected texture: PIXI.Texture

    public centerX:number
    public centerY:number
    public halfWidth:number
    public halfHeight:number

    public velocidadAcelerada
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

    public setVelocidadAcelerada(velocidadAcelerada:number):void{
        this.velocidadAcelerada = velocidadAcelerada
    }

    public setVelocidadInicial(velocidadInicial:number){
        this.velocidadInicial = velocidadInicial
    }

    public update(delta:number):void{
        this.acotarMovimientosEnX(GameApp.escenario.getZonaJugable())
        this.acotarMovimientosEnY(GameApp.escenario.getZonaJugable())

        this.sprite.x += this.velocidad.vx * delta
        this.sprite.y += this.velocidad.vy * delta
    }

    public acotarMovimientosEnX(zona: ManuContainer){
        // - SI trata de salir del canvas hacia la der => lo detenemos ahi
        if(this.sprite.x > zona.getWidth() - this.getWidth()/2){
            this.sprite.x = zona.getWidth() - this.getWidth()/2
        }
        // - SI trata de salir del canvas hacia la izq => lo detenemos ahi
        if(this.sprite.x < this.getWidth()/2){
            this.sprite.x = this.getWidth()/2
        }
    }

    public acotarMovimientosEnY(zona: ManuContainer){
        // - SI trata de salir del canvas hacia arriba => lo detenemos ahi
        if(this.sprite.y < this.getHeight()/2){
            this.sprite.y = this.getHeight()/2 + 2
        }
        // - Si trata de salir del canvas hacia abajo => lo detenemos ahi
        if(this.sprite.y > zona.getHeight()-this.getHeight()/2){
            this.sprite.y = zona.getHeight()-this.getHeight()/2-2
        }
    }

    protected setupAbilitiesKeys(keyVelocidadTurbo:string){
        let velocidadTurbo = Accion.keyboard(keyVelocidadTurbo)

        velocidadTurbo.press = () => {
            GameApp.escenario.setVelocidadAcelerada(4)
            // modifica la velocidad en
            // 1. la cantidad de rivales creados
            // 2. la velocidad de cada nuevo rival
            GameApp.velocidadAcelerada = 4
            // modifica la velocidad de los rivales ya creados
            GameApp.rivales.forEach(rival => {
                 rival.setVelocidadAcelerada(4)
            })
        }

        velocidadTurbo.release = () => {
            GameApp.escenario.setVelocidadAcelerada(1)
            GameApp.velocidadAcelerada = 1
            GameApp.rivales.forEach(rival => {
                rival.setVelocidadAcelerada(1)
            })
        }
    }

    protected setupMovementKeys(keyLeft:string, keyRight:string, keyUp:string, keyDown:string):void{
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
    velocidadInicial = 4

    public constructor(texture: PIXI.Texture, x:number, y:number, velocidadAcelerada:number){
        super()

        // const texture = PIXI.Texture.WHITE
        const sprite = PIXI.Sprite.from(texture)

        sprite.anchor.set(0.5)

        sprite.x = x
        sprite.y = y
        sprite.width = 200
        sprite.height = 339
        sprite.scale.set(0.3)
        // sprite.tint = 0x333333

        this.sprite = sprite
        this.texture = texture

        this.setupAbilitiesKeys('Control')
        this.setupMovementKeys('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')
    }

}

export class Rival extends Jugador{
    colisionado:boolean = false
    velocidadInicial = 5
    velocidadAcelerada = 2

    public constructor(texture: PIXI.Texture, x:number, y:number, velocidadAcelerada:number){
        super()

        // const texture = PIXI.Texture.WHITE
        const sprite = PIXI.Sprite.from(texture)

        sprite.anchor.set(0.5)

        sprite.x = x
        sprite.y = y
        sprite.width = 200
        sprite.height = 339
        sprite.scale.set(0.3)
        sprite.rotation = Math.PI // los rotamos 180º
        // sprite.tint = 0x333333

        this.sprite = sprite
        this.texture = texture
        this.velocidadAcelerada = velocidadAcelerada
    }

    public setVelocidadAcelerada(velocidadAcelerada:number):void{
        this.velocidadAcelerada = velocidadAcelerada
    }

    public update(delta:number):void{
        // para reutilizar comportamiento de la super clase abstracta
        // y además agregarle comportamiento extra
        // super.update(delta)

        this.velocidad.vx = 0
        // this.velocidad.vy = this.velocidadInicial * this.velocidadAcelerada
        this.velocidad.vy = GameApp.nivel * this.velocidadAcelerada

        this.acotarMovimientosEnX(GameApp.escenario.getZonaJugable())
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

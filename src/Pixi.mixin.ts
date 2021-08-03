import * as PIXI from 'pixi.js'

export class ManuContainer extends PIXI.Container{
    public myWidth:number
    public myHeight:number

    public getWidth():number{
        return this.myWidth
    }

    public getHeight():number{
        return this.myHeight
    }
}

export class Accion{
    public static key:string

    private static upHander(key: any): void{
        key.upHandler = event => {
            if (event.key === key.value) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
                this.key = key.value
                event.preventDefault();
            }
        };

        const upListener = key.upHandler.bind(key);
        window.addEventListener("keyup", upListener, false);
    }

    private static downHandler(key:any): void{
        key.downHandler = event => {
            if (event.key === key.value) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
                this.key = key.value
                event.preventDefault();
            }
        };

        const downListener = key.downHandler.bind(key);
        window.addEventListener("keydown", downListener, false);
    }

    // TODO: Desacoplar
    public static keyboard(_value: string): any{
        Accion.key = _value

        let key = {
            value : _value,
            isDown : false,
            isUp : true,
            press : undefined,
            release : undefined,

            downHandler: undefined,
            upHandler: undefined,
            unsubscribe: undefined
        }

        this.upHander(key)
        this.downHandler(key)

        return key;
    }
}

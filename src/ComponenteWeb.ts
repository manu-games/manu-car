interface ComponenteWeb{
    getTextButton():any
    setValor(valor:any):void
}

export class TextPuntos implements ComponenteWeb{
    private static getTextButton():any{
        return document.querySelector('#score')
    }

    public static setValor(puntos:any):void{
        TextPuntos.getTextButton().innerHTML = puntos
    }
}

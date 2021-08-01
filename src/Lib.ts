import {Jugador} from './Jugador'

export class Lib{
    public static hayColisionEntre(jugadorA:Jugador, jugadorB:Jugador):boolean{
        let combinedHalfWidths, combinedHalfHeights, vx, vy;

        // Calculamos la distancia entre los sprites, la distancia entre ambos puntos resulta en un vector (algebraicamente)
        const distanciaEnEjeX = Lib.centroEjeX(jugadorA) - Lib.centroEjeX(jugadorB)
        const distanciaEnEjeY = Lib.centroEjeY(jugadorA) - Lib.centroEjeY(jugadorB)

        // - Calculamos la mitad de ancho y la mitad del alto, como si calcularamos el radio de una circuferencia
        // - Sumamos la mitad de ambos para luego comparar si se tocan
        combinedHalfWidths = jugadorA.getWidth()/2 + jugadorB.getWidth()/2    // <-- esto seria como sumar los radios en el eje-x
        combinedHalfHeights = jugadorA.getHeight()/2 + jugadorB.getHeight()/2 // <-- esto seria como sumar los radios en el eje-y

        // - Si la distancia de los centros de ambos sprites es menor a la suma sus alturas => se tocan en el eje Y
        // - Si la distancia de los centros de ambos sprites es menor a la suma sus anchos => se tocan en el eje X
        //
        // - Si la sumatoria de la alturas de ambos es mayor a la distancia de sus centros,
        // entonces sus bordes no se tocan, no hay colisión (al menos en el eje-Y).
        return Math.abs(distanciaEnEjeX) < combinedHalfWidths && Math.abs(distanciaEnEjeY) < combinedHalfHeights
    }

    private static centroEjeX(jugador:Jugador){
        return jugador.getPosX() + jugador.getWidth() / 2
    }

    private static centroEjeY(jugador:Jugador){
        return jugador.getPosY() + jugador.getHeight() / 2
    }

    public static getNumberBetween(min:number, max:number):number{
        return Math.floor(Math.random() * (max - min) + min)
    }
}

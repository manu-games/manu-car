export class PositionGenerator{
    public static maxScaleConversion(maxWidth:number):number{
        // 1. el + convierte a number
        // 2. el toFixed(2) acorta a 2 decimales
        //         return Math.round(Math.random() * (max - min) + min)

        // TODO: Mejorar Xd
        // const valorMinimoOptimo = 2
        // const valorMaximoOptimo = 5
        // let valorDeVarianza = +(Math.random() * (valorMaximoOptimo-valorMinimoOptimo)+valorMinimoOptimo).toFixed(2) // ensancha ó achica el ancho de la campana de gauss

        let valorDeVarianza = 1
        let valor = this.randomG(valorDeVarianza)
        let porcentajeEscala = valor*100

        return Math.ceil((maxWidth*porcentajeEscala)/100)
    }

    private static randomG(v){
        var r = 0;

        for(var i = v; i > 0; i --)
            r += Math.random();

        return r / v;
    }
}

/*
  let maxWidth = 750 // px
  let valores = []
  for(let i=0; i< 100; i++) valores.push(PositionGenerator.maxScaleConversion(maxWidth))
  console.log(valores.join('\n'))
*/

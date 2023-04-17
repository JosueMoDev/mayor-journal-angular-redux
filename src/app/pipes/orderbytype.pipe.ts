import { Pipe, PipeTransform } from '@angular/core';
import { IngresosEgresos } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'orderbytype'
})
export class OrderbytypePipe implements PipeTransform {

  transform(items: IngresosEgresos[]): IngresosEgresos[] {
    return items.sort((a, b) => {
      if (a.tipo === 'ingreso') { return -1 }
      else { return 1}
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateIE } from '../ingreso-egreso.reducer';

import { ChartData, ChartType } from 'chart.js';

import { IngresosEgresos } from 'src/app/models/ingreso-egreso.model';



@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  total_ingresos: number = 0;
  total_egresos: number = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos',  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<AppStateIE> 
  ) { }

  ngOnInit() {
    this.store.select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items))
    
  }

  generarEstadistica( items: IngresosEgresos[]) {
    items.map(item => {
      (item.tipo === 'ingreso')
        ? this.total_ingresos = this.total_ingresos + item.monto
        : this.total_egresos = this.total_egresos + item.monto
    })

    this.doughnutChartData.datasets =  [
      { data: [ this.total_ingresos, this.total_egresos ] },
    ]
  }

}

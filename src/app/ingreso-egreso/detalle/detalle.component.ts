import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresosEgresos } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateIE } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  ingresosEgresos: IngresosEgresos[] = [];
  itemsSubscription: Subscription

  constructor(
    private store: Store<AppStateIE>,
    private ieService: IngresoEgresoService 
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('ingresoEgreso').subscribe(({ items }) => this.ingresosEgresos = items);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
  borrar(uid: string) { 
    this.ieService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Detalle Eliminado correctamente!',
          timer: 2500,
          showConfirmButton:false
        
        })
      })
      .catch(err => { 
        Swal.fire({
          icon: 'error',
          title: 'Opps algo salio mal!',
          timer: 2500,
          showConfirmButton:false
        
        })
      })
  }

}

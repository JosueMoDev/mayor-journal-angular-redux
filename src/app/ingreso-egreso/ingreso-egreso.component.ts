import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// REDUX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';

import Swal from 'sweetalert2';

import { IngresosEgresos } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  uiSubscription: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgreso: IngresoEgresoService,
    private store : Store <AppState>
  ) { }

  ngOnInit() {
   this.ingresoEgresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
   })
   this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  guardar() { 
    if (this.ingresoEgresoForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresosEgresos(descripcion, monto, this.tipo);

    this.ingresoEgreso.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Movimiento realizado con exito',
          showConfirmButton: false,
          timer:3000
        })
        this.store.dispatch(ui.stopLoading());
        this.ingresoEgresoForm.reset();
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Opps algo salio mal',
          text:err.message,
          showConfirmButton: false,
          timer:3000
        })
      });
  }

}

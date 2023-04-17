import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../ingreso-egreso/ingreso-egreso.actions'
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresosEgresos } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  dashboardSubscription: Subscription;
  itemsSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.dashboardSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        // @ts-ignore
       this.itemsSubscription = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
         .subscribe((items: IngresosEgresos[]) => this.store.dispatch(actions.setItems({ items } )))
      })
  }
  ngOnDestroy(){
    this.dashboardSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

}

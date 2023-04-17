import { createAction, props } from '@ngrx/store';
import { IngresosEgresos } from 'src/app/models/ingreso-egreso.model';

export const setItems = createAction('[Egreso & Ingreso] Set Items',
props<{ items: IngresosEgresos[] }>()

);
export const unSetItems = createAction('[Egreso & Ingreso] Unset Items');


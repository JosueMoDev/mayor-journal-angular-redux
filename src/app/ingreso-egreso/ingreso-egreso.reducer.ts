import { createReducer, on } from '@ngrx/store';
import { IngresosEgresos } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresosEgresos[],
}

export interface AppStateIE extends AppState{
    
    ingresoEgreso: State
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(actions.unSetItems, state => ({ ...state, items:[]}))
    

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
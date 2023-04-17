import { createReducer, on } from '@ngrx/store';
import * as authaction  from './auth.actions';
import { Usuario } from '../models/user.model';

export interface State {
   user: Usuario
}

export const initialState: State = {
   user: null
}

const _authReducer = createReducer(initialState,

    on(authaction.setUser, (state, { user }) => ({ ...state, user: { ...user} })),
    on(authaction.unSetUser, state => ({ ...state, user: null })),

);

export const  authReducer = (state, action) => _authReducer(state, action);
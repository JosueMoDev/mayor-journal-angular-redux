import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {Subscription} from "rxjs";

import { Usuario } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as action from '../auth/auth.actions';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscription: Subscription;
  _user: Usuario;

  get user() { 
    return { ...this._user}
  }

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }
  
  initAuthListener(){
    this.auth.authState.subscribe((user => {
      if (user) {
         // @ts-ignore
         this.subscription = this.firestore.doc(`${user.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch( action.setUser({ user }) );
          })
      }else {
        this.subscription?.unsubscribe();
        this.store.dispatch(action.unSetUser());
        this.store.dispatch(ieActions.unSetItems())
        this._user = null;
      }
    }))
  }

  crearUsuario (nombre: string, correo: string, password: string) { 
    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then(({user}) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser })
        
      });
  }
  startLogin(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password)
  }
  logOut() { 
    this.auth.signOut();
  }
  
  isAuth():any{ 
    return this.auth.authState
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

import { IngresosEgresos } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private auth: AuthService,

  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresosEgresos) { 
    return this.fireStore.doc(`${this.auth.user.uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) { 
    return this.fireStore.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        // @ts-ignore
        map(snapshot => snapshot.map(
          ({ payload }) => ({
            uid: payload.doc.id,
            ...payload.doc.data() as any
          })))
      );
  }

  borrarIngresoEgreso(item: string) { 
    return this.fireStore.doc(`${this.auth.user.uid}/ingreso-egreso/items/${item}`).delete();
  }
}

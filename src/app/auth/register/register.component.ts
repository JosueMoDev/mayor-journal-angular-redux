import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';


import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui =>  this.loading = ui.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe(); 
  }
  
  crearUsuario() {
    if (this.registerForm.invalid) return;

    this.store.dispatch( ui.isLoading())
    Swal.fire({
      title: 'Por favor espere!',
      didOpen: () => { Swal.showLoading(Swal.getDenyButton()) }
    })
    const { nombre, correo, password } = this.registerForm.value;

    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/']);
        Swal.close();
      })
      .catch(
        error => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title:'Opps algo salio mal',
            text: error.message,
            timer: 2500,
            showConfirmButton:false
        })}
      );
  }
}

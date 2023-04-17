import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';


import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  startLogin() { 
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { correo, password } = this.loginForm.value;

    this.authService.startLogin(correo, password)
      .then(
        () => {
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/'])
        }
      )
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title:'Opps algo salio mal',
          text: error.message,
          timer: 2500,
          showConfirmButton:false
      })});
  }

}

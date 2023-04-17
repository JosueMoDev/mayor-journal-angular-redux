import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router : Router
  ) { }
  canActivate(): Observable<boolean>  {
    return this.authService.isAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login'])
          Swal.fire({
            title: 'Opps debes iniciar sesion',
            icon: 'warning',
            showConfirmButton: false,
            timer:2500
          })
        }
      })
    );
  }
  canLoad(): Observable<boolean>  {
    return this.authService.isAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login'])
          Swal.fire({
            title: 'Opps debes iniciar sesion',
            icon: 'warning',
            showConfirmButton: false,
            timer:2500
          })
        }
      }),take(1)
    );
  }
  
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  sideSubscription: Subscription;
  username: string;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.sideSubscription = this.store.select('user').subscribe(({user}) => this.username = user?.nombre )
  }
  ngOnDestroy() {
    this.sideSubscription.unsubscribe()
  }

  logout() { 
    this.authService.logOut()    
  }

}

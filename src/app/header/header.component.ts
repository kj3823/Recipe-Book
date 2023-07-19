import {Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core'
import {DataStorageService} from '../shared/data-storage-service';

import {AuthService} from '../auth/auth.service';
import{Subscription} from 'rxjs';
@Component({
  selector:'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
collapsed = true;
userSubscription:Subscription
  isAuthenticated:boolean = false;
constructor(private dataService:DataStorageService, private authService:AuthService) {
}

//User Subscription will exist (not null) if loggedIm;
ngOnInit() {
  this.userSubscription = this.authService.userData
    .subscribe(user => {
      this.isAuthenticated = user !== null;
    })
}

ngOnDestroy() {
  this.userSubscription.unsubscribe();
}

  onSaveData()
  {
    this.dataService.storeRecipes()
  }
  onFetchData()
  {
    this.dataService.fetchRecipes().subscribe(); //we don't care about the response.
  }

  onLogout()
  {
    this.authService.logout();
  }
}

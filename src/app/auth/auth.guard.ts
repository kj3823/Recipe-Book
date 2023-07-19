import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Router, UrlTree} from '@angular/router';

import {AuthService} from './auth.service';
@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private authService:AuthService, private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |  boolean  {
    return this.authService.userData.pipe(take(1), map(user => { // only listens to the user value once.
      if(user !== null)
      {
        return true;
      }
      return this.router.createUrlTree(['/auth']); //returns a URLTree where the user is not loggedIN.
    }))
  }
}

import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take, exhaustMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
  constructor(private authService:AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userData
      .pipe(
        take(1),
        exhaustMap(user => {
          if(user == null) //a token is not required for signup and login.. user we get is null here.
          {
            return next.handle(req);
          }
        return next.handle(req.clone({ //remember HTTP request are immutable.
          params: new HttpParams().set('auth', user.Token)
      }))
    }))
  }
}

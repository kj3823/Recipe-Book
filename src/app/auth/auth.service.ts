import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from "../../environments/environment";

export interface AuthResponseData{
  idToken:string
  email:string
  refreshToken:string
  expiresIn:string
  localId:string
  registered ?:boolean //can also be undefined (optional, only applies for login)
}

@Injectable({
  providedIn:'root'
})
export class AuthService
{
  logoutTimer:any;
  userData = new BehaviorSubject<User>(null); //allows us to get access to the previous user object before subscribe is called. (initial value of null)
  constructor(private http:HttpClient, private router:Router) {
  }
  signUp(email:string, password:string)
  {
    return this.http //allows for us to know the state by returning
      .post
        <AuthResponseData>
      ("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKey,
        {
        email:email,
          password:password,
          returnSecureToken:true //should always be true, for firebase.
        })
        .pipe(catchError(this.handleError)) //parameter passed under the hood, since reference is called.
  }

  logIn(email:string, password:string)
  {
    return this.http.post<AuthResponseData>
    ("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKey, {
      email:email,
      password:password,
      returnSecureToken:true
    })
      .pipe(tap(responseData => { //tap allows us to tap into the responseData without blocking it or changing it.
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
        }),
        catchError(this.handleError)) //parameter passed under the hood, since reference is called.
  }

  private handleError(errorResponse:HttpErrorResponse)
  {
    let errorMessage = "An unknown error occurred";
    if(!errorResponse.error || !errorResponse.error.error) //used in case of network error. Response field will not occur.
    {
      return throwError(errorMessage); //wraps our error as an observable.
    }
    switch (errorResponse.error.error.message) //format of error message
    {
      case "EMAIL_EXISTS": {
        errorMessage = "This email already Exists!"
        break;
      }
      case "EMAIL_NOT_FOUND": {
        errorMessage = "This user does not exist!"
        break;
      }
      case "INVALID_PASSWORD" : {
        errorMessage = "Incorrect Password!";
        break;
      }
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email:string, userId:string,_token:string, expiresIn:string)
  {
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
    //gets time in milliseconds since JS was created, we add oru expiresIn (sec) by converting it to an integer, then multiplying it by 100 to ms.
    const newUser = new User(
      email,
      userId,
      _token,
      expirationDate
    )
    this.userData.next(newUser); // new User created.
    this.autoLogout(+ expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(newUser)) //coverts JSON to string, storing the token
  }

  autoLogin()
  {
    const userData: {email:string, id:string, _token:string, expirationDate:string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData) //no token
    {
      return;
    }
    const loadedUser:User = new User(userData.email, userData.id, userData._token, new Date(userData.expirationDate))
    if(loadedUser.Token) //getter, return null if token expiration date is passed.
    {
      this.userData.next(loadedUser);//newUser
      const expirationDuration = new Date(userData.expirationDate).getTime() - new Date().getTime(); //calculates difference in ms
      this.autoLogout(expirationDuration);
    }
  }

  logout()
  {
    // localStorage.clear(); //clears all data
    localStorage.removeItem('userData');
    if(this.logoutTimer) //timer is active
    {
      clearTimeout(this.logoutTimer); //clears it;
    }
    this.logoutTimer = null;
    this.userData.next(null) // no user exists.
    this.router.navigate(['/auth'])
  }

  autoLogout(expirationDuration:number) //in ms
  {
    console.log(expirationDuration);
    this.logoutTimer = setTimeout(() =>{
      this.logout();
    }, expirationDuration)
  }
}

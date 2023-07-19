import {Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core'
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';

import {AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';

import {AuthResponseData} from './auth.service';

import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";

@Component({
  selector:'app-auth',
  templateUrl:'auth.component.html'
})
export class AuthComponent implements OnDestroy
{
  isLoginMode:boolean = true;
  isLoading:boolean = false;
  authObservable:Observable<AuthResponseData>;
  error:string = null; //stores our errorMessage

  private errorSubscription:Subscription

  @ViewChild(PlaceholderDirective, {static:false}) alertHost:PlaceholderDirective; //can also be used to look for a property. (appPlaceholder)

  constructor(private authService:AuthService, private router:Router, private ComponentFactoryResolver:ComponentFactoryResolver) {
  }

  onsSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode; //inverses the currently stored value.
  }
  onSubmit(authForm:NgForm)
  {
    if(!authForm.valid)
    {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    if(this.isLoginMode)
    {
      this.authObservable = this.authService.logIn(email, password);
    }
    else
    {
      this.authObservable = this.authService.signUp(email, password)
    }
    //Common code to both signup and LogIN

    this.authObservable.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']); //programmatic navigation
    },
    errorMessage => { //error handling done in auth service.
      console.log(errorMessage);
      this.isLoading = false;
      this.showErrorAlert(errorMessage);
      // this.error = errorMessage; (for ngIf method only)
    })
    authForm.reset();
  }

  onHandleError()
  {
    this.error =null;
  }

  private showErrorAlert(message:string) //dynamically creates a component
{
  // const alertComponent = new AlertComponent(); // incorrect way of creating a component
  const alertComponentFactory :ComponentFactory<AlertComponent> = this.ComponentFactoryResolver.resolveComponentFactory(AlertComponent); //correct way of creating a component
  const hostViewContainerRef = this.alertHost.viewContainerRef;
  hostViewContainerRef.clear(); //clears everything on that view.

  const createdComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);

  createdComponentRef.instance.message = message; //will have the properties of AlertComponent.

  this.errorSubscription =createdComponentRef.instance.close.subscribe(() => { //okay to subscribe, exception to to use EventEmitter with @Output.
    hostViewContainerRef.clear();
    this.errorSubscription.unsubscribe();
  });


}

  ngOnDestroy()
  {
    if(this.errorSubscription)
    {
      this.errorSubscription.unsubscribe();
    }
  }
}

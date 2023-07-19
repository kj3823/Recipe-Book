import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {CoreModule} from "../core.module";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations:[
    AuthComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path:'', component:AuthComponent}]) //for lazy-loading
  ]
})
export class AuthModule
{

}

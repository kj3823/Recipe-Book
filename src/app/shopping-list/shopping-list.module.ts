import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports:[
    RouterModule.forChild([{path:'', component:ShoppingListComponent}]),//path changed for lazy-loading
    FormsModule,
    SharedModule //loading spinner, commonModule
  ]
  // providers:[LoggingService]
})

export class ShoppingListModule
{

}

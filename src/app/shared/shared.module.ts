import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder.directive";
import {DropdownDirective} from "./dropdown-directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[ //These can only be imported only once. CANNOT BE DECLARED ANYWHERE ELSE.
    AlertComponent,
  LoadingSpinnerComponent,
  PlaceholderDirective,
  DropdownDirective
  ],
  imports:[
    CommonModule
  ],
  exports:[ //Since we want to use these features in other module,s we need to export these.
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents:[AlertComponent] //used when we are creating components using code, not required in Angular 9+
})
export class SharedModule
{

}

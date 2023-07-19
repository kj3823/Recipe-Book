import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector:'[appPlaceholder]' //we need directive selector for this
})
export class PlaceholderDirective
{
  constructor(public viewContainerRef:ViewContainerRef) { //gives access to the DOM, where this directive is needed to be used.
  }
}

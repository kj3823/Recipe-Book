import {Directive, HostListener, HostBinding, ElementRef } from '@angular/core'
@Directive({
  selector:'[appDropdown]'
})
export class DropdownDirective
{
  @HostBinding('class.open') isOpen = false; //attaches the class.open class
  @HostListener('document:click', ['$event'])toggleOpen(event:Event)
  {
    // this.isOpen = !this.isOpen;
    console.log(this.reference.nativeElement, event.target)
    this.isOpen = this.reference.nativeElement.contains(event.target) ? !this.isOpen :false
  }
  constructor(private reference:ElementRef) {
  }
}

import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnInit {
  constructor(private _element: ElementRef) { }

  ngOnInit() {
   setTimeout(() => {
     this._element.nativeElement.focus();
   }, 0);
  }
}

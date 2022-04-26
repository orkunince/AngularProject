import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitleH1]'
})
export class TitleH1Directive implements OnInit {

  //dışarıdan parametre alımı
  @Input() appTitleH1 = ''

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    // this.elementRef.nativeElement.style.backgroundColor=this.appTitleH1
    //this.elementRef.nativeElement.innerHTML='Producttttt'
    //console.log(this.appTitleH1)
    this.elementRef.nativeElement.outerHTML = '<h1 class="text-2xl underline decoration-3 decoration-amber-500"> '+this.appTitleH1+' </h1>'

  }


}

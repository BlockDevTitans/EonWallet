import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWizardStep2]'
})
export class WizardDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

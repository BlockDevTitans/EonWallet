import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWizardStep]'
})
export class WizardDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

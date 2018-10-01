import { Component, OnInit, ViewChild, ComponentFactoryResolver, Directive, Input, ElementRef, ViewContainerRef, EventEmitter, Type, Output } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { WizardDirective } from '../../directives/wizardDirective.directive';
import { NetworkSelectionComponent } from './wallet/network-selection/network-selection.component';
import { SummaryComponent } from './wallet/summary/summary.component';


export interface IWizard {
  visibility: EventEmitter<Boolean>;
}


export class WizardStep {
  constructor(public component: Type<IWizard>, public data: any) { }
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  private steps: WizardStep[] = [new WizardStep(NetworkSelectionComponent, []), new WizardStep(SummaryComponent, [])];

  private stepPointer: number = 0;


  @ViewChild(WizardDirective) adHost: WizardDirective;

  constructor(public electronService: ElectronService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    let viewToLoad = this.steps[this.stepPointer];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(viewToLoad.component);
    let viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.visibility.subscribe(v => {
      this.next();
    })
  }

  next() {
    this.stepPointer = this.stepPointer + 1;
    this.loadComponent();
  }
}

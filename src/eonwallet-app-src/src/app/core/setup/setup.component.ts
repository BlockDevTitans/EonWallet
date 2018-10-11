import { Component, OnInit, ViewChild, ComponentFactoryResolver, Directive, Input, ElementRef, ViewContainerRef, EventEmitter, Type, Output, AfterViewInit, AfterContentInit } from '@angular/core';
import { WizardDirective } from '../../directives/wizardDirective.directive';
import { KeyConfigurationComponent } from './wallet/key-configuration/key-configuration.component';
import { NetworkSelectionComponent } from './wallet/network-selection/network-selection.component';
import { SummaryComponent } from './wallet/summary/summary.component';
import { SecurityComponent } from './wallet/security/security.component';
import { ElectronService } from '../../providers/electron.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



export class  WizardData {
  networkSelection:string;
  name: string;
}
export interface IWizard {
  visibility: EventEmitter<Boolean>;
  data: WizardData;
}


export class WizardStep {
  constructor(public component: Type<IWizard>, public data: any) { }
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements AfterContentInit{
  @ViewChild('aws', {read: ViewContainerRef}) aws: ViewContainerRef;


  ngAfterContentInit(): void {
    console.log('adhost',this.aws);
  this.loadComponent();
  }

  private steps: WizardStep[] = [new WizardStep(NetworkSelectionComponent, []),
  new WizardStep(KeyConfigurationComponent, []),
  new WizardStep(SecurityComponent, []),
  new WizardStep(SummaryComponent, [])];

  private stepPointer: number = 0;


  @ViewChild('WizardDirective') adHost: WizardDirective;

  
  constructor(public activeModal: NgbActiveModal,public electronService: ElectronService, private componentFactoryResolver: ComponentFactoryResolver) { }



  data: WizardData = new WizardData();
  loadComponent() {
    

    let viewToLoad = this.steps[this.stepPointer];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(viewToLoad.component);
    let viewContainerRef = this.aws;

    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.data;
    
    componentRef.instance.visibility.subscribe(v => {
      this.data = componentRef.instance.data;
      console.log('fetching data from comp', this.data);
      this.next();
    })
  }

  next() {
    this.stepPointer = this.stepPointer + 1;
    this.loadComponent();
  }
}

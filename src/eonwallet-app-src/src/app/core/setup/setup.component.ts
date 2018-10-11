import { Component, OnInit, ViewChild, ComponentFactoryResolver, Directive, Input, ElementRef, ViewContainerRef, EventEmitter, Type, Output } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { WizardDirective } from '../../directives/wizardDirective.directive';
import { NetworkSelectionComponent } from './wallet/network-selection/network-selection.component';
import { SummaryComponent } from './wallet/summary/summary.component';
import { KeyConfigurationComponent } from './wallet/key-configuration/key-configuration.component';
import { SecurityComponent } from './wallet/security/security.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from '../../test/test.component';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {


  constructor(private modalService: NgbModal, public electronService: ElectronService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
  }

  open(content) {
   let v =  this.modalService.open(TestComponent, {size: 'lg', centered: true,ariaLabelledBy: 'modal-basic-title'});
  console.log(v);
  
  }


  
}

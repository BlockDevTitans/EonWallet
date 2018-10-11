import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WizardData, IWizard } from '../../../../test/test.component';
import { ElectronService } from '../../../../providers/electron.service';

@Component({
  selector: 'app-key-configuration',
  templateUrl: './key-configuration.component.html',
  styleUrls: ['./key-configuration.component.scss']
})
export class KeyConfigurationComponent implements OnInit,    IWizard {
  ngOnInit(): void {
    console.log('KeyConfigurationComponent',this.data);
  }
  data:WizardData;
  
  @Output()
  visibility = new EventEmitter<Boolean>();

  constructor(){
   }

  generateNewKey(){
     this.visibility.emit(true);
  }
}

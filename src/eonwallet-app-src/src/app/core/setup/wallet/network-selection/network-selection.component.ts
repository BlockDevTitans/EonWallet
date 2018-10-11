import { Component, Output, EventEmitter } from '@angular/core';

import { ElectronService } from '../../../../providers/electron.service';
import { WizardData, IWizard } from '../../setup.component';


@Component({
  selector: 'app-network-selection',
  templateUrl: './network-selection.component.html',
  styleUrls: ['./network-selection.component.scss']
})
export class NetworkSelectionComponent implements IWizard {
  data: WizardData;

  @Output()
  visibility = new EventEmitter<Boolean>();

  constructor(public electronService: ElectronService) { }

  setNetwork(network: number) {
    this.data = this.data || new WizardData();
    console.log('data is',this.data);
    let str = network === 1 ? "main" : "testnet";
    this.electronService.sendCommand("settings.SetNetwork", [str], (res) => {
      this.electronService.sendCommand("settings.Save", null, () => {
      
        this.data.networkSelection = str;
        this.visibility.emit(true);
      });
    });
  }
}

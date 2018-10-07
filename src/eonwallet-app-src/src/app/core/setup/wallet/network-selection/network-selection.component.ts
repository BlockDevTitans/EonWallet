import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WizardData, IWizard } from '../../setup.component';
import { ElectronService } from '../../../../providers/electron.service';


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
    let str = network === 1 ? "main" : "testnet";
    this.electronService.sendCommand("settings.SetNetwork", [str], (res) => {
      this.electronService.sendCommand("settings.Save", null, () => {
      
        this.data.networkSelection = str;
        this.visibility.emit(true);
      });
    });
  }
}

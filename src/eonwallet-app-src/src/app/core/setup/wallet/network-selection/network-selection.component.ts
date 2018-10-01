import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWizard } from '../../setup.component';


@Component({
  selector: 'app-network-selection',
  templateUrl: './network-selection.component.html',
  styleUrls: ['./network-selection.component.scss']
})
export class NetworkSelectionComponent implements OnInit, IWizard {

@Output()
visibility = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }
  setNetwork(network: number){
    console.log('set network');
      let str = network === 1? "main" : "testnet";
      this.visibility.emit(true);
      //this.electronService.sendCommand("settings.SetNetwork", [ str ], null);
      //this.electronService.sendCommand("settings.Save", null, null);
  
  
    }

}

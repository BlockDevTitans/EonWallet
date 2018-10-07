import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IWizard, WizardData } from '../../setup.component';
import { ElectronService } from '../../../../providers/electron.service';

export class Account {
  name:string;
  
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, IWizard {
  data:any;
  state:any;
  public:string;
  name:string;
  
  @Output()
  visibility = new EventEmitter<Boolean>();

  constructor(public electronService: ElectronService) { }

  ngOnInit() {
    console.log(this.data);
    this.public = (<any>this.data.accountdetails.accountid);
    this.state = JSON.stringify(this.data);
    this.name = this.data.name;
    
  //   this.electronService.sendCommand("wallet.GetState", null, (returnValue) => { 
  //     alert();
  //     self.state.name = returnValue.name;
  //     console.log('888',returnValue);
  // });
  
  }

}

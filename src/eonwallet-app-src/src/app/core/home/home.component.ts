import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{

  nodesList = undefined;

  constructor(public electronService: ElectronService, private translate: TranslateService)
  {

  }

  ngOnInit()
  {

  }

  public getNodeList(): void
  {
    this.electronService.sendCommand("wallet.ListNodes", ['test', 103], (res) =>
    {
      this.nodesList = res;
    });
  }

}

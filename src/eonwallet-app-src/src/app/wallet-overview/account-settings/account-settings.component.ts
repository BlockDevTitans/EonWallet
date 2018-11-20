import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  requiresPassword = true;
  currentAccount: string;

  constructor(private rpc: ElectronService, private accountService: AccountService) { }
  KeyDetails: any = {};

  ngOnInit() {
    this.accountService.CurrentAccount.subscribe(str => {
      this.currentAccount = str;
    });
  }

  doSomething(password: string) {
    this.rpc.sendCommand('wallet.GetPrivateAccountDetails', [this.currentAccount, password], (returnValue: any) => {
      this.KeyDetails = returnValue;
      this.requiresPassword = false;
    });
  }
}

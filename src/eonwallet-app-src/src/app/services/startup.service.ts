import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ElectronService } from '../providers/electron.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService implements CanActivate {

  constructor(private rpc: ElectronService, private router: Router, private accountService: AccountService) {

    alert('registering for events within the wallet');

    this.rpc.registerForEvents('wallet', (result) => {

      console.log('event fired', result);
    });

    this.canActivate().then((res) => {
      console.log('*************', res);

    });

    this.rpc.sendCommand('wallet.GetState', [], (returnValue: Array<any>) => {
      // this.rpc.sendCommand('wallet.AddWallet', ['name', 'test'], (returnV) => {
      //   console.log(returnV);
      // });
    });

    this.rpc.sendCommand('wallet.GetAccountInformation', ['EON-ZPAX2-EMFJ5-HKBTX'],
      (returnValue) => { console.log('getAccountInfo', returnValue); },
      () => { alert('error'); });
  }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {

      this.rpc.sendCommand('wallet.IsNewSetup', null, (returnValue) => {
        if (returnValue === false) {
          this.router.navigate([`overview`]);
          this.accountService.init();
        }

        resolve(returnValue);

      }
      );
    });
  }
}

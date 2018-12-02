import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ElectronService } from '../providers/electron.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService implements CanActivate {

  constructor(private rpc: ElectronService, private router: Router, private accountService: AccountService) {
    this.rpc.registerForEvents('wallet', (result) => {
      console.log(result);
      alert('event fired');
    });
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

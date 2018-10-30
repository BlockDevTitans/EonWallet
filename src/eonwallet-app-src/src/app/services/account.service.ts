import { Injectable } from '@angular/core';
import { IAccount } from '../models/account';
import { reject } from 'q';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public accounts: IAccount[] = [
    { accountId: 'Test', name: 'Fred' },
    { accountId: 'John', name: 'Test' }
  ];



  public subject = new Subject();
  public exists = new Subject();

  constructor(private rpc: ElectronService, private spinnerService: Ng4LoadingSpinnerService) {
  }


  public create(name: string, password: string): Promise<IAccount> {
    return new Promise((resolve) => {
      this.spinnerService.show();
      this.rpc.sendCommand('wallet.AddWallet', [name, password], (returnValue) => {
        console.log(returnValue);
        this.spinnerService.hide();
        this.exists.next(false);
        resolve();
      });
    });
  }


  //       this.accounts.push(account);
  // this.subject.next(this.accounts);
  // resolve();
  // });
  // }

  public all(): Promise<IAccount[]> {
    return new Promise((resolve) => {
      resolve(this.accounts);
    });
  }
}

import { Injectable } from '@angular/core';
import { IAccount } from '../models/account';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _accounts: BehaviorSubject<Array<any>> = new BehaviorSubject(Array([]));
  private _exists: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public readonly Accounts: Observable<Array<any>> = this._accounts.asObservable();
  public readonly exists: Observable<boolean> = this._exists.asObservable();


  constructor(private rpc: ElectronService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  public init(): Promise<void> {
    return new Promise((resolve) =>
      this.rpc.sendCommand('wallet.Wallets', [], (returnValue: Array<any>) => {
        console.log(returnValue);
        const res = returnValue.map(each => <IAccount>{
          accountId: each.accountdetails.accountid,
          name: each.name
        });
        this._accounts.next(res);
        resolve();
      }));
  }

  public create(name: string, password: string): Promise<IAccount> {
    return new Promise((resolve) => {
      this.spinnerService.show();
      this.rpc.sendCommand('wallet.AddWallet', [name, password], (returnValue) => {
        console.log(returnValue);
        this.spinnerService.hide();
        this._exists.next(false);
        resolve();
      });
    });
  }
}

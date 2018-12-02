import { Injectable } from '@angular/core';
import { IAccount, WalletAccount } from '../models/account';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from '../providers/electron.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _accounts: BehaviorSubject<Array<any>> = new BehaviorSubject(Array([]));
  private _exists: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _accountDetails: BehaviorSubject<WalletAccount> = new BehaviorSubject(null);

  private _currentAccount: BehaviorSubject<string> = new BehaviorSubject('');

  public readonly Accounts: Observable<Array<any>> = this._accounts.asObservable();
  public readonly exists: Observable<boolean> = this._exists.asObservable();
  public readonly CurrentAccount: Observable<string> = this._currentAccount.asObservable();
  public readonly AccountDetail: Observable<WalletAccount> = this._accountDetails.asObservable();

  constructor(private rpc: ElectronService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  public init(): Promise<void> {
    return new Promise((resolve) => {


      this.rpc.sendCommand('wallet.Wallets', [], (returnValue: Array<any>) => {
        console.log(returnValue);
        const res = returnValue.map(each => <IAccount>{
          accountId: each.accountdetails.accountid,
          name: each.name
        });
        if (res.length > 0) {
          alert('greater than zero');
          const currentAccount = res[0].accountId;
          this._currentAccount.next(currentAccount);
          const accountDetails = { accountId: currentAccount };
          this.rpc.sendCommand('wallet.GetAccountInformation', ['EON-8Y5K8-49GEA-T7UFR'], (retValue) => {
            console.log('return value = ', retValue);
            const wa: WalletAccount = {
              total: retValue.amount,
              deposited: '0'

            };
            this._accountDetails.next(wa);

          });


        }
        this._accounts.next(res);
        resolve();
      });
    });
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

import { Injectable, EventEmitter } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { State } from '../models/state.model';
import { IWallet } from '../models/wallet.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAccount } from '../models/account';

export interface IStateUpdateModel {
  state: State;
  index?: number;
}
@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private _walletsArray: Array<IWallet> = new Array<IWallet>();
  private _wallets: BehaviorSubject<Array<IWallet>> = new BehaviorSubject(this._walletsArray);

  public onStateUpdate: EventEmitter<IStateUpdateModel> = new EventEmitter();
  public readonly Accounts: Observable<Array<any>> = this._wallets.asObservable();

  constructor(private rpc: ElectronService) {
    this.Accounts.subscribe(x => this.checkIfAuthorised(this._wallets.value));

    this.rpc.registerForEvents('wallet', (result: Array<IWallet>) => {
      this.checkIfAuthorised(this._walletsArray);
    });
  }

  public create(name: string, password: string): Promise<IAccount> {
    return new Promise((resolve) => {
      this.rpc.sendCommand('wallet.AddWallet', [name, password], (returnValue) => {
        this._walletsArray.push(returnValue);
      });
    });
  }

  private checkIfAuthorised(result: any) {
    if (!result || result.length === 0) { return; }
    result.forEach((v, index) => {
      this.rpc.sendCommand('wallet.GetAccountInformation', [v.accountdetails.accountid],
        (retValue) => {
          console.log('getAccountIynfo', result);
        },
        (e) => {
          if (e.Message === 'Unauthorized') {
            this.onStateUpdate.emit({ state: State.Unauthorised, index: index });
          }
        });
    });
  }

  public getAccount(index: number): IWallet {
    return this._wallets.value[index];
  }

  public init() {
    this.rpc.sendCommand('wallet.GetState', [], (returnValue: any) => {
      if (returnValue.Wallets.length === 0) {
        this.onStateUpdate.emit({ state: State.New_Account, index: 0 });
        return;
      }
      returnValue.Wallets.forEach((element, index) => {
        const wallet = Object.assign({}, element);
        this._walletsArray.push(wallet);
        this.rpc.sendCommand('wallet.GetAccountInformation', [wallet.accountdetails.accountid],
          (retValue) => { console.log('getAccountInfo', returnValue); },
          (e) => {
            if (e.Message === 'Unauthorized') {
              this.onStateUpdate.emit({ state: State.Unauthorised, index: index });
            }
          });
      });
    });
  }
}

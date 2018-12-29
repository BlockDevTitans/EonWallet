import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ElectronService } from '../providers/electron.service';
import { AccountService } from './account.service';
import { State } from '../models/state.model';
import { IWallet } from '../models/wallet.model';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IStateUpdateModel {
  state: State;
  index?: number;
}
@Injectable({
  providedIn: 'root'
})
export class StartupService {

  public onStateUpdate: EventEmitter<IStateUpdateModel> = new EventEmitter();
  private _wallets: BehaviorSubject<Array<IWallet>> = new BehaviorSubject(Array<IWallet>());
  public readonly Accounts: Observable<Array<any>> = this._wallets.asObservable();

  constructor(private rpc: ElectronService) {
    this.rpc.registerForEvents('wallet', (result: Array<IWallet>) => {
      this._wallets.next(result);
      console.log('event fired', result);
    });
  }

  public getAccount(index: number): IWallet {
    console.log('**,', this._wallets.value, index);
    return this._wallets.value[index];
  }

  public init() {
    this.rpc.sendCommand('wallet.GetState', [], (returnValue: any) => {
      console.log('wallet,getstate ->', returnValue);
      if (returnValue.Wallets.length === 0) {
        alert('its a new wallet');
        this.onStateUpdate.emit({ state: State.New_Account });
        return;
      }

      this._wallets.next(returnValue.Wallets);

      returnValue.Wallets.forEach(((v, index) => {
        this.rpc.sendCommand('wallet.GetAccountInformation', [v.accountdetails.accountid],
          (retValue) => {
            console.log('getAccountIynfo', returnValue);
          },
          (e) => {
            if (e.Message === 'Unauthorized') {
              this.onStateUpdate.emit({ state: State.Unauthorised, index: index });
            }
          });
      }));
      // returnValue.forEach((v) => {
      //   console.log(v.accountdetails);
      //   this.rpc.sendCommand('wallet.GetAccountInformation', [v.accountdetails.accountid],
      //     (retValue) => { console.log('getAccountInfo', returnValue); },
      //     (e) => {
      //       console.log('***********', e);
      //       if (e.Message === 'Unauthorized') {
      //         this.onStateUpdate.emit(State.Unauthorised);
      //       }
      //     });
      // });
      // this.rpc.sendCommand('wallet.AddWallet', ['name', 'test'], (returnV) => {
      //   console.log(returnV);
      // });
    });
  }
}

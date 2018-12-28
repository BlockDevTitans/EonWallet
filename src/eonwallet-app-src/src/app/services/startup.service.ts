import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ElectronService } from '../providers/electron.service';
import { AccountService } from './account.service';
import { State } from '../models/state.model';
import { IWallet } from '../models/wallet.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService implements CanActivate {

  public onStateUpdate: EventEmitter<State> = new EventEmitter();
  private _wallets: BehaviorSubject<Array<IWallet>> = new BehaviorSubject(Array<IWallet>());
  public readonly Accounts: Observable<Array<any>> = this._wallets.asObservable();

  constructor(private rpc: ElectronService, private router: Router, private accountService: AccountService) {
    this.rpc.registerForEvents('wallet', (result: Array<IWallet>) => {
      this._wallets.next(result);
      console.log('event fired', result);
    });

  }

  public init() {
    this.rpc.sendCommand('wallet.GetState', [], (returnValue: any) => {
      console.log('wallet,getstate ->', returnValue);
      if (returnValue.Wallets.length === 0) {
        this.onStateUpdate.emit(State.New_Account);
        return;
      }
      returnValue.Wallets.forEach((v => {
        this.rpc.sendCommand('wallet.GetAccountInformation', [v.accountdetails.accountid],
          (retValue) => {
            console.log('getAccountInfo', returnValue);
          },
          (e) => {
            if (e.Message === 'Unauthorized') {
              this.onStateUpdate.emit(State.Unauthorised);
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

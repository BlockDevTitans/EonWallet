import { Injectable } from '@angular/core';
import { IAccount } from '../models/account';
import { reject } from 'q';
import { Subject } from 'rxjs';
import { ElectronService } from '../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public accounts: IAccount[] = [
    { accountId: 'Test', name: 'Fred' },
    { accountId: 'John', name: 'Test' }
  ];

  public subject = new Subject();

  constructor(rpc: ElectronService) { }

  public create(account: IAccount): Promise<IAccount> {
    return new Promise((resolve) => {
      this.accounts.push(account);
      this.subject.next(this.accounts);
      resolve();
    });
  }

  public all(): Promise<IAccount[]> {
    return new Promise((resolve) => {
      resolve(this.accounts);
    });
  }
}

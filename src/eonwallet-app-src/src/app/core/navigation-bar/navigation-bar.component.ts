import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

import { IAccount } from '../../models/account';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '0px',
        display: 'none',
        overflow: 'hidden'
      })),
      state('out', style({
        overflow: 'hidden'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ])
  ]
})
export class NavigationBarComponent implements OnInit {

  menuState = 'in';
  accounts: IAccount[];
  showDefaultAccount = false;
  defaultAccount: IAccount;

  public constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.Accounts.subscribe((newAccounts: IAccount[]) => {
      this.accounts = newAccounts;
      this.defaultAccount = this.accounts[0];
    });

    this.accountService.exists.subscribe((newAccount: boolean) => {
      this.showDefaultAccount = !newAccount;
    });

    this.accountService.init();
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

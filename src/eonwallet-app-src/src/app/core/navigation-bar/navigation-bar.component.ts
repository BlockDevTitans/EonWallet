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
        height: 'calc( 100% - 86px)',
        overflow: 'auto'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ])
  ]
})
export class NavigationBarComponent implements OnInit {

  menuState = 'in';
  accounts: IAccount[];

  public constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.subject.subscribe((newAccounts: IAccount[]) => {
      this.accounts = newAccounts;
    });

    this.accountService.all().then((accounts) => {
      this.accounts = accounts;
    });
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

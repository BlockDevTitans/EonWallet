import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
  showNewAccount = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  newAccount(event) {
    this.showNewAccount = true;
  }

  createAccount() {
    this.accountService.create({
      accountId: 'new', name: 'new'
    });
  }

  cancelCreation() {
    this.showNewAccount = false;
  }
}

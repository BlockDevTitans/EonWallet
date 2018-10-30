import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  @Input() showNewAccount = false;
  @Input() allowCancel = true;
  meterReadingForm: FormGroup;


  constructor(private accountService: AccountService, private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.meterReadingForm = new FormGroup({
      accountName: new FormControl(''),
      password: new FormControl('')
    });
  }


  newAccount(event) {
    this.showNewAccount = true;
  }

  createAccount() {
    console.log(this.meterReadingForm);
    this.accountService.create(this.meterReadingForm.value.accountName, this.meterReadingForm.value.password).then(() => {
      this.router.navigate([`overview`]);
    });
  }

  cancelCreation() {
    this.showNewAccount = false;
  }
}

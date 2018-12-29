import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { State } from '../../models/state.model';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
  meterReadingForm: FormGroup;

  constructor(private accountService: AccountService, private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    alert('new wallet comp called');
    // this.accountService.onStateUpdate.subscribe((e: State) => {
    //   console.log('***', e);
    //   if (e === State.Unauthorised) {
    //     alert('unauthorised');
    //   }
    // });

    this.meterReadingForm = new FormGroup({
      accountName: new FormControl(''),
      password: new FormControl('')
    });
  }

  createAccount() {
    console.log(this.meterReadingForm);
    this.accountService.create(this.meterReadingForm.value.accountName, this.meterReadingForm.value.password).then(() => {
      this.router.navigate([`overview`]);
    });
  }
}

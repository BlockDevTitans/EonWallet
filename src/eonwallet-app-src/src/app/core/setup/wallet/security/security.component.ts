import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWizard, WizardData } from '../../setup.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidator, ParentErrorStateMatcher } from '../../../../validators/password.validator';
import { ElectronService } from '../../../../providers/electron.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, IWizard {
  data:WizardData;
  accountDetailsForm: FormGroup;

  @Output()
  visibility = new EventEmitter<any>();

  account_validation_messages = {
    'accountName': [
      { type: 'required', message: 'Account name is required' },
      { type: 'minlength', message: 'Account name must be at least 5 characters long' },
      { type: 'maxlength', message: 'Account name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your Account name must contain only numbers and letters' },
      ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  }

  constructor(private fb: FormBuilder, public electronService: ElectronService) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      accountName: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required]
      ))
    });
  }

  next(data) {
  
    this.electronService.sendCommand("wallet.AddWallet", [data.accountName, data.password], (returnValue) => { 
      this.data = returnValue;
    this.visibility.emit(true) });
  
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  meterReadingForm: FormGroup;
  @Output() PasswordEntered = new EventEmitter<string>();

  constructor() { }


  ngOnInit() {
    this.meterReadingForm = new FormGroup({
      password: new FormControl('')
    });
  }

  onConfirmClick() {
    const password = this.meterReadingForm.value.password;
    this.PasswordEntered.emit(password);

  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
  showChoice = true;
  showImport = false;
  showNewAccount = false;

  constructor() { }

  createNewAccount() {
    this.showChoice = false;
    this.showNewAccount = true;
  }



}

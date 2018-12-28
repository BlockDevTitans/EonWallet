import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-setup-page',
  templateUrl: './new-setup-page.component.html',
  styleUrls: ['./new-setup-page.component.scss']
})
export class NewSetupPageComponent implements OnInit {
  showChoice = true;
  showImport = false;
  showNewAccount = false;
  constructor() { }

  ngOnInit() {

  }

}

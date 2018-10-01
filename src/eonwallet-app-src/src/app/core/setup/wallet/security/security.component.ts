import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWizard } from '../../setup.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit,  IWizard {

  @Output()
  visibility = new EventEmitter<Boolean>();
  

  constructor() { }

  ngOnInit() {
  }

  next(){
    this.visibility.emit(true);
  }
}

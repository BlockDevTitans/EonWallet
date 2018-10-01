import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWizard } from '../../setup.component';

@Component({
  selector: 'app-key-configuration',
  templateUrl: './key-configuration.component.html',
  styleUrls: ['./key-configuration.component.scss']
})
export class KeyConfigurationComponent implements OnInit, IWizard {

  @Output()
  visibility = new EventEmitter<Boolean>();


  constructor() { }

  ngOnInit() {
  }

  next(){
    this.visibility.emit(true);
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IWizard } from '../../setup.component';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, IWizard {
 
  @Output()
  visibility = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }

}

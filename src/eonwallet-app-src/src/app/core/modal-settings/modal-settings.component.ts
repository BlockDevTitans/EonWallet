import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss']
})
export class ModalSettingsComponent implements OnInit {

  model: any = {};
  
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

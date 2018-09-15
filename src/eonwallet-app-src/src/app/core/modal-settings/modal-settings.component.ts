import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss']
})
export class ModalSettingsComponent {

  model: any = {};

  constructor(public activeModal: NgbActiveModal,public electronService: ElectronService) { }

  generate() {
    this.electronService.sendCommand("seed.Generate", [], (res) =>
    {
      this.model.seed = res;
    });
  }
}

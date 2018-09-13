import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSettingsComponent } from '../modal-settings/modal-settings.component';



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(private modalService: NgbModal) { }

  myFunc(){
    this.modalService.open(ModalSettingsComponent);
  }
}

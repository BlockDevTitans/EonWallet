import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SetupComponent } from '../core/setup/setup.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  showChoice = true;
  showImport = false;
  showNewAccount = false;

  constructor(private modalService: NgbModal) { }


  open() {
    // let v =  this.modalService.open(SetupComponent, {size: 'lg', centered: true,ariaLabelledBy: 'modal-basic-title'});
    // console.log(v);
  }

  createNewAccount() {
    this.showChoice = false;
    this.showNewAccount = true;
  }



}

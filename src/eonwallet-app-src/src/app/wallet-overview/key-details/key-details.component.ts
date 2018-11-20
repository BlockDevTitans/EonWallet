import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-key-details',
  templateUrl: './key-details.component.html',
  styleUrls: ['./key-details.component.scss']
})
export class KeyDetailsComponent implements OnInit {

  @Input() Keys: any;
  constructor() { }

  ngOnInit() {
  }

}

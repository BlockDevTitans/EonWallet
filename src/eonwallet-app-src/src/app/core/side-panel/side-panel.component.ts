import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {

  @Input() title: string;
  @Input() collaspedIcon: string;
  @Input() expandedIcon: string;
  @Input() isExpanded = false;

  @Output() filterSelected: EventEmitter<void> = new EventEmitter<void>();

  onFilterClick() {
    this.filterSelected.emit();
  }
}

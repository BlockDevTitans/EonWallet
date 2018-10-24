import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '0px',
        display: 'none',
        overflow: 'hidden'
      })),
      state('out', style({
        height: 'calc( 100% - 86px)'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ])
  ]
})
export class NavigationBarComponent {
  menuState = 'in';

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

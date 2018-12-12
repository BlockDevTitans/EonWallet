import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  // @Input() logo: string;
  // @Input() menu: IHearderMenuItem[];
  // @Input() toolsmenu: any[];
  // @Input() selectedMenuItem: any;
  // @Input() user: any;
  // @Input() userMenu: IUserMenuItem[];
  // @Input() showLogout: boolean;

  // @Output() menuItemClicked: EventEmitter<any> = new EventEmitter();
  // @Output() toolItemClicked: EventEmitter<any> = new EventEmitter();
  // @Output() userMenuItemClicked: EventEmitter<any> = new EventEmitter();
  // @Output() logout: EventEmitter<any> = new EventEmitter();

  isValid = true;
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
    // if (!this.menu) {
    //   this.isValid = false;
    // }

    // if (this.showLogout) {
    //   this.userMenu = this.userMenu || [];
    //   const logoutOption: IUserMenuItem = {
    //     icon: 'fa-sign-out',
    //     title: 'Logout'
    //   };
    //   this.userMenu.push(logoutOption);
    // }
  }

  onMenuSelect(item: any) {
    // if (this.selectedMenuItem !== item) {
    //   this.selectedMenuItem = item;
    //   this.menuItemClicked.emit(item);
    // }
  }

  onToolItemClicked(item: any) {
    // this.toolItemClicked.emit(item);
  }

  onUserMenuClick(item: string) {
    // if (item === 'Logout') {
    //   this.logout.emit();
    // } else {
    //   this.userMenuItemClicked.emit(item);
    // }
  }
}

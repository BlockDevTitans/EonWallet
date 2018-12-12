import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  createNewWallet() {
    this.router.navigate([`/account-creation`], { relativeTo: this.route });
  }
}

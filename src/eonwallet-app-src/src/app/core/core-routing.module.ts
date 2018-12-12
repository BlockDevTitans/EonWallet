import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletOverviewComponent } from '../wallet-overview/wallet-overview.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { UnauthorisedComponent } from '../unauthorised/unauthorised.component';

// import { WalletModule } from '../wallet/wallet.module';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    // canActivate: [StartupService]
  },
  {
    path: 'account-creation',
    component: UnauthorisedComponent
  },
  {
    path: 'overview',
    component: WalletOverviewComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

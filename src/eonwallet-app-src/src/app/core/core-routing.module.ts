import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletOverviewComponent } from '../wallet-overview/wallet-overview.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { UnauthorisedComponent } from '../unauthorised/unauthorised.component';
import { NewSetupPageComponent } from '../new-setup-page/new-setup-page.component';
import { NewAccountComponent } from '../new-setup-page/new-account/new-account.component';

// import { WalletModule } from '../wallet/wallet.module';

const routes: Routes = [
  {
    path: '',
    component: UnauthorisedComponent
  },
  {
    path: 'account-creation',
    component: NewAccountComponent
  },
  {
    path: 'unauthorised/:index',
    component: UnauthorisedComponent,
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: UnauthorisedComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

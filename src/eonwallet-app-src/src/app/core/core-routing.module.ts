import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '../overview/overview.component';
import { WalletOverviewComponent } from '../wallet-overview/wallet-overview.component';
import { StartupService } from '../services/startup.service';

// import { WalletModule } from '../wallet/wallet.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    canActivate: [StartupService]
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

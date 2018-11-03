import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletOverviewComponent } from '../wallet-overview/wallet-overview.component';
import { StartupService } from '../services/startup.service';
import { SetupComponent } from '../account-creation-process/setup.component';

// import { WalletModule } from '../wallet/wallet.module';

const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
// import { WalletModule } from '../wallet/wallet.module';

const routes: Routes = [

  // {
  //   path: 'wallet',
  //   loadChildren: () => WalletModule
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

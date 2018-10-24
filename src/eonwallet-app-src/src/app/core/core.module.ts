import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';

import { WizardDirective } from '../directives/wizardDirective.directive';
import { NetworkSelectionComponent } from './setup/wallet/network-selection/network-selection.component';
import { SummaryComponent } from './setup/wallet/summary/summary.component';
import { KeyConfigurationComponent } from './setup/wallet/key-configuration/key-configuration.component';
import { SecurityComponent } from './setup/wallet/security/security.component';

import { OverviewComponent } from '../overview/overview.component';
import { SetupComponent } from './setup/setup.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@NgModule({
  entryComponents: [SetupComponent, NetworkSelectionComponent, KeyConfigurationComponent, SecurityComponent, SummaryComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [OverviewComponent, SideMenuComponent,
    WizardDirective,
    NotFoundComponent, MessageComponent, NavigationBarComponent, HomeComponent, OverviewComponent],
  exports: [
    RouterModule,
    MessageComponent,
    CommonModule,
    NavigationBarComponent
  ]
})
export class CoreModule { }

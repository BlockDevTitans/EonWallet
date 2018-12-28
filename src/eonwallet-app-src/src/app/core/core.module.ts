import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';

import { WizardDirective } from '../directives/wizardDirective.directive';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    WizardDirective,
    NavigationBarComponent,
    HomeComponent
  ],
  exports: [
    RouterModule,
    CommonModule,
    NavigationBarComponent
  ]
})
export class CoreModule { }

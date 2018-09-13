import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ModalSettingsComponent } from './modal-settings/modal-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [
    ModalSettingsComponent
  ],
  declarations: [ModalSettingsComponent,NotFoundComponent, MessageComponent,NavigationBarComponent, HomeComponent],
  exports: [
    ModalSettingsComponent,ModalSettingsComponent,
    RouterModule,
    MessageComponent,
    CommonModule,
    NavigationBarComponent
  ]
})
export class CoreModule { }

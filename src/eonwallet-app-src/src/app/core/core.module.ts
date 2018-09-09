import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [NotFoundComponent, MessageComponent,NavigationBarComponent],
  exports: [
    RouterModule,
    MessageComponent,
    CommonModule,
    NavigationBarComponent
  ]
})
export class CoreModule { }

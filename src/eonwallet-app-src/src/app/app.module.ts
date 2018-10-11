import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { NetworkSelectionComponent } from './core/setup/wallet/network-selection/network-selection.component';
import { SummaryComponent } from './core/setup/wallet/summary/summary.component';
import { KeyConfigurationComponent } from './core/setup/wallet/key-configuration/key-configuration.component';
import { SecurityComponent } from './core/setup/wallet/security/security.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient)
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  entryComponents:[TestComponent],
  declarations: [
    AppComponent,
    WebviewDirective,
    NetworkSelectionComponent,
    SummaryComponent,
    SecurityComponent,
    KeyConfigurationComponent,
    TestComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletOverviewComponent } from './wallet-overview/wallet-overview.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TransactionHistoryComponent } from './wallet-overview/transaction-history/transaction-history.component';
import { AccountSettingsComponent } from './wallet-overview/account-settings/account-settings.component';
import { PasswordComponent } from './wallet-overview/password/password.component';
import { KeyDetailsComponent } from './wallet-overview/key-details/key-details.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    WebviewDirective,
    WalletOverviewComponent,
    TransactionHistoryComponent,
    AccountSettingsComponent,
    PasswordComponent,
    KeyDetailsComponent,
    PortfolioComponent
  ],
  exports: [],
  imports: [
    TabsModule.forRoot(),
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    }),
    TabsModule.forRoot()
  ],

  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }

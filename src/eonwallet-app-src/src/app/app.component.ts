import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { StartupService, IStateUpdateModel } from './services/startup.service';
import { State } from './models/state.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  eoncoreSettings = undefined;
  isLoading = true;

  constructor(public electronService: ElectronService, private translate: TranslateService,
    private startupService: StartupService, private router: Router) {

    translate.setDefaultLang('en');
    this.startupService.onStateUpdate.subscribe((e: IStateUpdateModel) => {
      console.log('***', e);
      if (e.state === State.Unauthorised) {
        console.log('is unauthrised!');
        this.router.navigate(['unauthorised', e.index]);
      }
      if (e.state === State.New_Account) {
        this.router.navigate(['account-creation']);
      }
      this.isLoading = false;
    });

    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);

      electronService.sendCommand('settings.GetState', null, (res) => {
        if (res != null) {
          this.eoncoreSettings = res;
          this.parseSettings();
        }
      });

      electronService.registerForEvents('settings', (args) => {
        if (args != null) {
          this.eoncoreSettings = args;
          this.parseSettings();
        }
      });

    } else {
      console.log('Mode web');
    }

    setTimeout(() => this.init(), 2000);
  }

  private init() {
    this.startupService.init();
  }

  private log(message: string): void {
    process.stdout.write(message);
  }

  private parseSettings(): void {
    this.translate.use(this.eoncoreSettings.Language);
  }

}

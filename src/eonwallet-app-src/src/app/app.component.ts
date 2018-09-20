import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  eoncoreSettings = undefined;

  constructor(public electronService: ElectronService, private translate: TranslateService)
  {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron())
    {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);

      electronService.sendCommand("settings.GetState", null, (res) =>
      {
        if (res != null)
        {
          this.eoncoreSettings = res;
          this.parseSettings();
        }
      });

      electronService.registerForEvents("settings", (args) =>
      {
        if (args != null)
        {
          this.eoncoreSettings = args;
          this.parseSettings();
        }
      });

    }
    else
    {
      console.log('Mode web');
    }
  }

  private log(message: string): void
  {
    process.stdout.write(message);
  }

  private parseSettings(): void
  {
    this.translate.use(this.eoncoreSettings.Language);
  }

}

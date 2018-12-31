import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartupService } from '../services/startup.service';
import { IWallet } from '../models/wallet.model';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html',
  styleUrls: ['./unauthorised.component.scss']
})
export class UnauthorisedComponent implements OnInit, OnDestroy {
  private sub: any;
  wallet: IWallet = null;


  constructor(private route: ActivatedRoute, private startupService: StartupService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('params', params);
      const id = +params['index'];
      console.log('unauth account index', id);
      this.wallet = this.startupService.getAccount(id);
      //  console.log('my wallet', this.wallet, this.wallet.accountdetails, this.wallet.accountdetails.publickey);
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubcribe();
  }

}

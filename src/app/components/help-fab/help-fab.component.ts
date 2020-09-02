import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { TrackingService } from '../../../services/tracking.service';
import { LoaderService } from '../../providers/loader.service';
import { Storage } from '@ionic/storage';
import { SessionData } from '../../models/active-packages';
@Component({
  selector: 'app-help-fab',
  templateUrl: './help-fab.component.html',
  styleUrls: ['./help-fab.component.scss'],
})
export class HelpFabComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  constructor(private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService, private loading: LoaderService,
    private trackService: TrackingService,  private storage: Storage){
    this._ngxZendeskWebwidgetService.identify({
      name: '',
      email: '',
    });
  }
NavMethod() {
  this.loadPackages();
  //alert("Under Development");
  //this._ngxZendeskWebwidgetService.activate();
}

  ngOnInit() { }

  loadPackages() {
    this.storage.get('_activePackages').then((value) => {
      if (value !== '' && value !== undefined && value !== null){
      this.trackService.setPackagestoSession(value);
      this.trackService.refreshTrackingDetails(SessionData.packages.All);
    }
   });
  }
}

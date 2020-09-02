import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/services/tracking.service';
import { SessionData } from 'src/app/models/active-packages';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-footertab',
  templateUrl: './footertab.component.html',
  styleUrls: ['./footertab.component.scss'],
})
export class FootertabComponent implements OnInit {
public currentpage: string;
  constructor(private navCtrl: NavController,private route: ActivatedRoute,private router: Router,private loading: LoaderService,
              private trackService: TrackingService,  private storage: Storage) {
    this.currentpage = this.router.url;
  }
  NavMethod(nav: string) {
    switch(nav) {
      case 'actpck':
          this.navCtrl.navigateForward(`/active-packages`);
          break;
          case 'home':
              this.navCtrl.navigateForward(`/home`);
              break;
              case 'history':
                  this.navCtrl.navigateForward(`/history`);
                  break;
                  case 'settings':
                      this.navCtrl.navigateForward(`/settings`);
                      break;
                      case 'help':
                          this.navCtrl.navigateForward(`/help`);
                          break;
    }
  }
  ngOnInit() {}

  loadPackages() {
    this.storage.get('_activePackages').then((value) => {
      if (value !== '' && value !== undefined && value !== null){
      this.trackService.setPackagestoSession(value);
      this.trackService.refreshTrackingDetails(SessionData.packages.All);
    }
   });
  }
}

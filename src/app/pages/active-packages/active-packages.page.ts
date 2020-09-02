import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { NavController, AlertController } from '@ionic/angular';
import { TrackingService } from 'src/services/tracking.service';
import { ActivePackages, SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationExtras, Router } from '@angular/router';
import { QueryParams } from 'src/app/models/QueryParams';
import { SocialSharingComponent } from 'src/app/components/social-sharing/social-sharing.component';

@Component({
  selector: 'app-active-packages',
  templateUrl: './active-packages.page.html',
  styleUrls: ['./active-packages.page.scss'],
})
export class ActivePackagesPage implements OnInit {
// tslint:disable-next-line: max-line-length
  constructor(private trackService: TrackingService, private router: Router ,private loading: LoaderService, public alertController: AlertController, private navCtrl: NavController , private storage: Storage) {}
  public searchTerm = '';
  public sortbyDate = 'Date Created';
  public sessionData: any;
  public daySelect = 'All';
  public dateSelected: any = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  public sortBy = '1';
  public activeItems: Array<ActivePackages> = [];
  readyToLoad = false;
 @ViewChild(SocialSharingComponent) social: SocialSharingComponent;

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loading.present('Loading Records...');
    this.loadPackages();
  }
  retrackAll(){
    if (this.sessionData !== '' && this.sessionData !== undefined && this.sessionData !== null){
      this.trackService.refreshTrackingDetails(this.sessionData.packages.All);
    }
  }
  searchPackages() {
    if (this.searchTerm === '' || this.searchTerm === undefined || this.searchTerm === null){
      this.refreshList();
    } else {
    switch (this.daySelect) {
      case 'All':
          this.activeItems = this.trackService.filterItems(SessionData.packages.All, this.searchTerm);
          break;
        case 'Today':
            this.activeItems = this.trackService.filterItems(SessionData.packages.Today, this.searchTerm);
            break;
          case 'Yesterday':
              this.activeItems = this.trackService.filterItems(SessionData.packages.Yesterday, this.searchTerm);
              break;
            case 'ThisWeek':
                this.activeItems = this.trackService.filterItems(SessionData.packages.ThisWeek, this.searchTerm);
                break;
              case 'LastWeek':
                  this.activeItems = this.trackService.filterItems(SessionData.packages.LastWeek, this.searchTerm);
                  break;
                  default:
                      this.activeItems = this.trackService.filterItems(SessionData.packages.All, this.searchTerm);
                      break;
     }
   }
  }
  loadPackages() {
      this.storage.get('_activePackages').then((value) => {
        if (value !== '' && value !== undefined && value !== null){
        this.trackService.setPackagestoSession(value);
        this.sessionData = SessionData;
        this.activeItems = SessionData.packages.All;
        this.segmentChanged();
        this.sortByDates();
      }
        this.readyToLoad = true;
        this.loading.dismiss();
     });
  }
  refreshList(showLoader: boolean = false) {
    if (showLoader) { this.loading.present('Refreshing...'); }
    // tslint:disable-next-line: only-arrow-functions
    this.searchTerm = '';
    this.dateSelected = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    setTimeout(()=>{
      this.loadPackages();
   }, 800);
  }
  segmentChanged() {
    switch (this.daySelect) {
      case 'All':
          this.activeItems = SessionData.packages.All;
          break;
        case 'Today':
            this.activeItems = SessionData.packages.Today;
            break;
          case 'Yesterday':
              this.activeItems = SessionData.packages.Yesterday;
              break;
            case 'ThisWeek':
                this.activeItems = SessionData.packages.ThisWeek;
                break;
              case 'LastWeek':
                  this.activeItems = SessionData.packages.LastWeek;
                  break;
                  default:
                      this.activeItems = SessionData.packages.All;
                      break;
    }
  }
  showDetail(key: any){
    this.navCtrl.navigateForward(`/details/${key}`);
  }
  sortByDates() {
    switch (this.sortBy) {
      case '1':
          this.sortbyDate = 'Date Created';
          break;
      case '2':
          this.sortbyDate = 'Expected By';
          break;
      case '3':
          this.sortbyDate = 'Last Updated';
          break;
      default:
          this.sortbyDate = 'Date Created';
          break;
    }
  }
  searchByDate() {
    if(this.sessionData !== undefined && this.sessionData !== null){
      this.activeItems = this.trackService.filterDatewise(SessionData.packages.All, this.dateSelected);
    }
  }

  archive(key: string) {
  this.presentConfirm(key, 'Archive', 'Do you want to archive the package?', 'arc');
  }
  
  retrack(key: string) {
    this.presentConfirm(key, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
  }

  share() {
    //this.social.presentActionSheet();
    this.social.presentActionSheet2();
  }

delete(key: string) {
  this.presentConfirm(key, 'Delete', 'Do you want to delete the package?', 'del');
 }
 locate(key: string) {
  this.storage.get('_activePackages').then(aData => {
    let val1 = aData.find(item => item.trackingNo === key);
    if (val1 !== undefined && val1 !== '' && val1 !== null && val1.scans.length > 0) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
            scans: JSON.stringify(val1.scans)
        }
    };
      this.router.navigate(['show-map'], navigationExtras);
    } else {
      this.loading.presentToast('Warning', 'No Scans to Locate.');
    }
  });
}

 MarkasDelievered(key: string) {
  this.presentConfirm(key, 'Mark as Delivered', 'Do you want to mark the package delivered?', 'masd');
 }
 editPackages(key: string) {
  this.navCtrl.navigateForward(`/edit-package/${key}`);
}
// tslint:disable-next-line: variable-name
async presentConfirm(key: string ,_header: string, _message: string, _opration: string) {
  try {
  const alert = await this.alertController.create({
    header: _header,
    message: _message,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          switch (_opration)
          {
            case 'arc':
                this.loading.present('Archiving...');
                this.storage.get('_activePackages').then(tData => {
                    if (tData == null) {
                    tData = []; }
                    // tslint:disable-next-line: max-line-length
                    const index = tData.findIndex(item => item.trackingNo === key.trim());
                    if (index >= 0) {
                      // tslint:disable-next-line: no-shadowed-variable
                      const record: any = tData.find(item => item.trackingNo === key.trim());
                      tData.splice(index, 1);
                      this.storage.set('_activePackages', tData);
                      this.storage.get('_archivePackages').then(aData => {
                          if (aData == null) {
                          aData = []; }
                          const index1 = aData.findIndex(item => item.trackingNo === key.trim());
                          if (index1 >= 0) { aData.splice(index1, 1); }
                          aData.push(record);
                          this.storage.set('_archivePackages', aData).then(() => {
                          // this.loading.dismiss();
                          this.refreshList();
                       });
                     });
                    }
                  });
                break;
                case 'del':
                    this.loading.present('Deleting...');
                    this.storage.get('_activePackages').then(tData => {
                        if (tData == null) {
                        tData = []; }
                        // tslint:disable-next-line: max-line-length
                        const index = tData.findIndex(item => item.trackingNo === key.trim());
                        if (index >= 0) {
                          tData.splice(index, 1);
                          this.storage.set('_activePackages', tData).then(() => {
                            // this.loading.dismiss();
                            this.refreshList();
                         });
                         }
                      });
                    break;
                    case 'masd':
                        this.loading.present('Processing...');
                        this.storage.get('_activePackages').then(tData => {
                            if (tData == null) {
                            tData = []; }
                            // tslint:disable-next-line: max-line-length
                            const index = tData.findIndex(item => item.trackingNo === key.trim());
                            if (index >= 0) {
                              const record: any = tData.find(item => item.trackingNo === key.trim());
                              tData.splice(index, 1);
                              record.Trackingheader.Status = 'Delivered';
                              tData.push(record);
                              this.storage.set('_activePackages', tData).then(() => {
                                // this.loading.dismiss();
                                this.refreshList();
                             });
                             }
                          });
                        break;
                        case 'rtrck':
                            const queryParam = new QueryParams();
                            const record = key.split('-');
                            console.log(record);
                            if(record.length === 2){
                              queryParam.TrackingNo = record[0];
                              queryParam.Carrier = record[1];
                              queryParam.Description = '';
                              queryParam.Residential = 'false';
                              this.trackService.getTrackingDetails(queryParam);
                            } else {
                              this.loading.presentToast('error', 'Invalid Packages to retract.');
                            }
                            break;

          }
        }
      }
    ]
  });
  await alert.present();
} catch (error) {
  this.trackService.logError(error,'presentConfirm-activePackage');
  this.loading.presentToast('Error', 'Something went wrong!');
}
}

}

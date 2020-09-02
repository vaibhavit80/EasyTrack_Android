import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { TrackingService } from 'src/services/tracking.service';
import { ActivePackages, SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { QueryParams } from 'src/app/models/QueryParams';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public searchTerm = '';
  public sortbyDate = 'Date Created';
  public dateSelected: any = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  public sortBy = '1';
  public archiveItems: Array<ActivePackages> = [];
  readyToLoad = false;
  loaderToShow: any;
// tslint:disable-next-line: max-line-length
  constructor(private trackService: TrackingService , private loading: LoaderService,public alertController: AlertController, private navCtrl: NavController , private storage: Storage) {}

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loading.present('Loading Records...');
    this.loadPackages();
  }
  setFilteredItems() {
    if (this.searchTerm === '' || this.searchTerm === undefined || this.searchTerm === null){
      this.refreshList();
    } else {
    this.archiveItems = this.trackService.filterItems(this.archiveItems , this.searchTerm);
    }
  }
  loadPackages() {
    this.storage.get('_archivePackages').then((value) => {
      if (value !== '' && value !== undefined && value !== null){
      this.trackService.setarchivePackagestoSession(value);
      this.archiveItems = SessionData.packages.Archive;
      this.sortByDates();
      }
      this.readyToLoad = true;
      this.loading.dismiss();
   });
}
refreshList(showLoader: boolean = false) {
  if (showLoader) { this.loading.present('Refreshing...'); }
  // tslint:disable-next-line: only-arrow-functions
  setTimeout(()=>{
    this.loadPackages();
}, 800);
}

  delete(key: string) {
    this.presentConfirm(key, 'Delete', 'Do you want to delete the package?', 'del');
   }
   retrack(key: string) {
    this.presentConfirm(key, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
   }
  showDetail(key: any) {
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
    this.archiveItems = this.trackService.filterDatewise(SessionData.packages.Archive, this.dateSelected);
}

async presentConfirm(key: string ,_header: string,_message: string, _opration: string) {
  try{ 
    let alert = await this.alertController.create({
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
            case 'rtrck':
                this.storage.get('_archivePackages').then(tData => {
                    if (tData == null) {
                    tData = []; }
                    // tslint:disable-next-line: max-line-length
                    const index = tData.findIndex(item => item.trackingNo === key.trim());
                    if (index >= 0) {
                      const record: any = tData.find(item => item.trackingNo === key.trim());
                      tData.splice(index, 1);
                      this.storage.set('_archivePackages', tData).then(() => {
                      const queryParam = new QueryParams();
                      queryParam.TrackingNo = record.Trackingheader.TrackingNo;
                      queryParam.Carrier = record.Trackingheader.CarrierCode;
                      queryParam.Description = record.ResultData.Description;
                      queryParam.Residential = record.ResultData.Residential;
                      this.trackService.getTrackingDetails(queryParam, 'actpck');
                     });
                     }
                  });
                break;
                case 'del':
                    this.loading.present('Deleting...');
                    this.storage.get('_archivePackages').then(tData => {
                        if (tData == null) {
                        tData = []; }
                        // tslint:disable-next-line: max-line-length
                        const index = tData.findIndex(item => item.trackingNo === key.trim());
                        if (index >= 0) {
                          tData.splice(index, 1);
                          this.storage.set('_archivePackages', tData).then(() => {
                            // this.loading.dismiss();
                            this.refreshList();
                         });
                         }
                      });
                    break;
          }
        }
      }
    ]
   });
    await alert.present();
  } catch (error) {
    this.trackService.logError(JSON.stringify(error),'presentConfirm-history-page');
    this.loading.presentToast('Error', 'Something went wrong!');
}
}
}

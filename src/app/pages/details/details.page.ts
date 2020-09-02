import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, PopoverController, AlertController } from '@ionic/angular';
import { TrackingHeader } from 'src/app/models/TrackingHeader';
import { TrackingScans } from 'src/app/models/TrackingScans';
import { Storage } from '@ionic/storage';
import { TrackingResult } from 'src/app/models/TrackingResult';
import { TrackingService } from 'src/services/tracking.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { QueryParams } from 'src/app/models/QueryParams';
import { ActivePackages } from 'src/app/models/active-packages';
import { SocialSharingComponent } from 'src/app/components/social-sharing/social-sharing.component';
import { PopoverDetailPage } from '../popover-detail/popover-detail.page';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  constructor(private route: ActivatedRoute, private storage: Storage,private trackService: TrackingService ,
              private loading: LoaderService, public alertController: AlertController,private router: Router,
              private navCtrl: NavController, public popoverCtrl: PopoverController) {}
  hasData: any = false;
  item: ActivePackages;
  isActive: boolean = false;
  isArchive: boolean = false;
  trackingScans: Array<TrackingScans> =[];
  trackingResult: TrackingResult;
  trackingheader: TrackingHeader;
  trackNo: any ;
  packType: any = '_activePackages' ;
  selectedData: any;
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverDetailPage,
      event: ev, 
      componentProps: { 'trackNo': this.trackNo,
      'Popover': this.popoverCtrl
      },
      translucent: true
  });
    popover.onDidDismiss().then((data) => {
      if(data != null) {
        switch(data.data){
          case 'archive':
            this.archive();
          break;
          case 'MarkasDelievered':
            this.MarkasDelievered();
          break;
          case 'locate':
            this.locate();
          break;
          case 'gotoSettings':
            this.gotoSettings();
          break;
          case 'delete':
            this.delete();
          break;
          case 'share':
            this.share();
          break;  
        }
    }
  });
    return await popover.present();
  }
  @ViewChild(SocialSharingComponent) social: SocialSharingComponent;
  ngOnInit() {
    this.trackNo = this.route.snapshot.paramMap.get('any');
  }
  ionViewWillEnter(){
    this.loading.present('Loading Details.');
    this.item = new ActivePackages();
    this.trackingheader = new TrackingHeader();
    this.trackingResult = new TrackingResult();
    this.trackingScans = new Array<TrackingScans>();
    this.storage.get('_activePackages').then(tData => {
      let val = tData.find(item => item.trackingNo === this.trackNo);
      if(val !== undefined && val !== '' && val !== null){
      this.isActive = true;
      this.isArchive = false;
      this.trackingScans = val.scans;
      this.trackingResult = val.ResultData;
      this.trackingheader = val.Trackingheader;
      this.item.TrackingNo = val.Trackingheader.TrackingNo;
      this.item.Carrier = val.Trackingheader.CarrierCode;
      this.item.Status = val.Trackingheader.Status;
      this.hasData = true;
      this.loading.dismiss();
    } else {
        this.storage.get('_archivePackages').then(aData => {
        let val1 = aData.find(item => item.trackingNo === this.trackNo);
        if(val1 !== undefined && val1 !== '' && val1 !== null) {
        this.isActive = false;
        this.isArchive = true;
        this.trackingScans = val1.scans;
        this.trackingResult = val1.ResultData;
        this.trackingheader = val1.Trackingheader;
        this.item.TrackingNo = val1.Trackingheader.TrackingNo;
        this.item.Carrier = val1.Trackingheader.CarrierCode;
        this.item.Status = val1.Trackingheader.Status;
        this.hasData = true;
        this.loading.dismiss();
      } else{
        this.hasData = false;
        this.loading.dismiss();
      }
        if(this.isActive){
        this.packType = '_activePackages';
        }
        if(this.isArchive){
          this.packType = '_archivePackages';
          }
      });
    }
    });
  }
 share() {
  this.social.presentActionSheet2();
 }
  goBack() {
    this.navCtrl.pop();
  }
 gotoActivePackages() {
    this.loading.dismiss();
    if(this.isActive){
    this.navCtrl.navigateForward('/active-packages');
    }
    if(this.isArchive){
      this.navCtrl.navigateForward('/history');
      }
  }
  archive() {
    this.presentConfirm(this.trackNo, 'Archive', 'Do you want to archive the package?', 'arc');
   }
   retrack() {
    this.presentConfirm(this.trackNo, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
   }
   delete() {
     this.presentConfirm(this.trackNo, 'Delete', 'Do you want to delete the package?', 'del');
    }
    locate() {
      if (this.trackingScans !== undefined  && this.trackingScans !== null && this.trackingScans.length > 0) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
              scans: JSON.stringify(this.trackingScans)
          }
      };
        this.router.navigate(['show-map'], navigationExtras);
        } else {
          this.loading.presentToast('Warning', 'No Scans to Locate.');
        }
    }

    MarkasDelievered() {
     this.presentConfirm(this.trackNo, 'Mark as Delivered', 'Do you want to mark the package delivered?', 'masd');
    }

  editPackages() {
    this.navCtrl.navigateForward(`/edit-package/${this.trackNo}`);
  }


  gotoSettings() {
    this.navCtrl.navigateForward('/settings');
    }

  gotoHelp() {
    this.navCtrl.navigateForward('/help');
   }

  refPackages() {
    this.presentConfirm(this.trackNo, 'Re-Track', 'Do you want to Re-Track the package?', 'rtrck');
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
                case 'arc':
                    this.loading.present('Archived...');
                    this.storage.get('_activePackages').then(tData => {
                        if (tData == null) {
                        tData = []; }
                        // tslint:disable-next-line: max-line-length
                        const index = tData.findIndex(item => item.trackingNo === key.trim());
                        if (index >= 0) {
                          const record: any = tData.find(item => item.trackingNo === key.trim());
                          tData.splice(index, 1);
                          this.storage.set('_activePackages', tData);
                          this.storage.get('_archivePackages').then(aData => {
                              if (aData == null) {
                              aData = []; }
                              const index1 = aData.findIndex(item => item.trackingNo === key.trim());
                              if (index1 >= 0) {aData.splice(index1, 1);}
                              aData.push(record);
                              this.storage.set('_archivePackages', aData).then(() => {
                                this.gotoActivePackages();
                             });
                            });
                         }
                      });
                    break;
                    case 'del':
                        this.loading.present('Deleting...');
                        this.storage.get(this.packType).then(tData => {
                            if (tData == null) {
                            tData = []; }
                            // tslint:disable-next-line: max-line-length
                            const index = tData.findIndex(item => item.trackingNo === key.trim());
                            if (index >= 0) {
                              tData.splice(index, 1);
                              this.storage.set(this.packType, tData).then(() => {
                                  this.gotoActivePackages();
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
                                    this.gotoActivePackages();
                                 });
                                }
                              });
                            break;
                            case 'rtrck':
                             // this.loading.present('Re-Tracking...');
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
              }
            }
          }
        ]
      });
        await alert.present();
    } catch (Exception) {
      this.trackService.logError(JSON.stringify(Exception),'presentConfirm-details');
      this.loading.presentToast('Error', 'Something went wrong!');
    } finally {
      this.loading.dismiss();
    }
    }
}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrackingService } from './../../../services/tracking.service';
import { EditPackage } from 'src/app/models/EditPackage';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoaderService } from 'src/app/providers/loader.service';
import { HelperService } from 'src/app/providers/helper.service';
@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.page.html',
  styleUrls: ['./edit-package.page.scss'],
})
export class EditPackagePage implements OnInit {
// tslint:disable-next-line: variable-name
  edit_package_Form: FormGroup;
  responseData: any;
  TrackingNo: string;
  Carrier: string;
  trackNo:any;
  constructor(private route: ActivatedRoute,
              public formBuilder: FormBuilder,
              private storage: Storage, private navCtrl: NavController,
              private trackingService: TrackingService, private loadService: LoaderService, private helpService: HelperService) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
      this.loadService.present('Loading data');
      this.trackNo = this.route.snapshot.paramMap.get('any');
      const record = this.trackNo.split('-');
      if(record.length === 2) {
            this.TrackingNo = record[0];
            this.Carrier = this.helpService.GetCarrierName(record[1]);
          } else {
            this.loadService.presentToast('error', 'Invalid Packages to Edit.');
            this.goBack();
          }
      this.fillForm();
    }
    editPackageDetails(value) {
      try{
      this.loadService.present('Updating Package.');
      const packgeDetails = new EditPackage();
      let id = localStorage.getItem("deviceID");
         if (id !== 'null' && id !== null && id !== undefined && id !== '') {
                  packgeDetails.deviceId = id;
                  packgeDetails.TrackingNo = this.TrackingNo;
                  packgeDetails.isDelivered = value.chkDL;
                  packgeDetails.isDamaged = value.chkDM;
                  packgeDetails.isNofinaldeliveredstatus = value.chkNF;
                  packgeDetails.isOutforDelivery = value.chkOD;
                  packgeDetails.isPickUpscan = value.chkPS;
                  packgeDetails.isWeatherDelay = value.chkWD;
                  this.trackingService.editPackageDetails(packgeDetails).subscribe(data => {
                // tslint:disable-next-line: no-debugger
                if(data.Error === true)
                {
                  this.loadService.dismiss();
                  this.trackingService.logError(JSON.stringify(data.Message),'editPackageDetails');
                  this.loadService.presentToast('Error', data.Message);
                  return;
                }
                // Tracking Response
                this.storage.get('_editPackages').then(tData => {
                  if (tData == null) {tData = []; }
        // tslint:disable-next-line: max-line-length
                  const index = tData.findIndex(item =>  item.TrackingNo === this.trackNo);
                  if (index >= 0) {tData.splice(index, 1); }
                  const record: EditPackage = packgeDetails;
                  record.TrackingNo = this.trackNo;
                  tData.push(record);
                  this.storage.set('_editPackages', tData);
                  this.loadService.presentToast('Info', 'Package updated successfully');
                  this.loadService.dismiss();
                });
              },
              error => {
                this.trackingService.logError(JSON.stringify(error),'editPackageDetails');
                this.loadService.presentToast('Error', 'Something went wrong with API!');
                this.loadService.dismiss();
              });
        } else {
          this.loadService.presentToast('Error', 'No device Id found.');
          return;
        }

    } catch (Exception) {
      this.trackingService.logError(JSON.stringify(Exception),'editPackageDetails');
      this.loadService.presentToast('Error', 'Something went wrong!');
      this.loadService.dismiss();
    }
    }
    goBack() {
      this.navCtrl.pop();
    }
    refreshPackage() {
      this.loadService.present('Reloading...');
      this.fillForm();
    }
    fillForm() {

          this.storage.get('_editPackages').then(result => {
            let editpack: EditPackage;
            if (result === null || result === undefined) {
              editpack = new EditPackage();
             } else {
              editpack = result.find(item => item.TrackingNo === this.trackNo);
              if (editpack === null || editpack === undefined) {
                editpack = new EditPackage();
               }
           }
            this.edit_package_Form = this.formBuilder.group({
            chkPS : new FormControl(editpack.isPickUpscan),
            chkOD : new FormControl(editpack.isOutforDelivery),
            chkDL : new FormControl(editpack.isDelivered),
            chkNF : new FormControl(editpack.isNofinaldeliveredstatus),
            chkDM : new FormControl(editpack.isDamaged),
            chkWD : new FormControl(editpack.isWeatherDelay)
          });
          // tslint:disable-next-line: align
          this.loadService.dismiss();
      });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/services/tracking.service';
import { Configuration } from 'src/app/models/configuration';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
// tslint:disable-next-line: variable-name
  setting_Form: FormGroup;
  constructor(private trackService: TrackingService, private router: Router, private storage: Storage,
              public formBuilder: FormBuilder, private loadingController: LoaderService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.fillForm();
  }
  saveSettings(value){
    try {
      this.loadingController.present('Saving Configuration.');
      let _config = new Configuration();
      let id = localStorage.getItem("deviceID");
         if (id !== 'null' && id !== null && id !== undefined && id !== '') {
          _config.deviceid = id;
          _config.days = value.archiveDays;
          _config.delivered = value.Delivered;
          _config.pickUpscan = value.PickUp;
          _config.outforDelivery = value.OutforDelivery;
          _config.nofinaldeliveredstatus = value.NFDeliveryStaus;
          _config.isDamaged = value.Damages ? 1 : 0;
          _config.isWeatherDelay = value.Weather ? 1 : 0;
          this.trackService.saveDeviceConfiguration(_config).subscribe(data => {
            // tslint:disable-next-line: no-debugger
            if(data.Error === true)
            {
              this.loadingController.dismiss();
              this.trackService.logError(JSON.stringify(data.Message),'saveSettings');
              this.loadingController.presentToast('Error',data.Message);
              return;
            }
            // Tracking Response
            this.storage.set('_deviceConfig', _config);
            this.loadingController.presentToast('Info', 'Settings saved successfully');
            this.loadingController.dismiss();
          },
          error => {
            this.trackService.logError(JSON.stringify(error),'saveSettings');
            this.loadingController.presentToast('Error', 'Something went wrong in API request');
            this.loadingController.dismiss();
          });
        } else {
          this.loadingController.presentToast('Error', 'No device id found.');
          this.loadingController.dismiss();
        }

    } catch (Exception) {
      this.trackService.logError(JSON.stringify(Exception),'saveSettings');
      this.loadingController.presentToast('Error', 'Something went wrong!');
      this.loadingController.dismiss();
    }
  }

  refresh(config = new Configuration()) {
      this.setting_Form = this.formBuilder.group({
      PickUp: new FormControl(config.pickUpscan),
      OutforDelivery: new FormControl(config.outforDelivery),
      Delivered : new FormControl(config.delivered),
      NFDeliveryStaus: new FormControl(config.nofinaldeliveredstatus),
      Damages: new FormControl(config.isDamaged === 1 ? true : false),
      Weather: new FormControl(config.isWeatherDelay === 1 ? true : false),
      archiveDays: new FormControl(config.days)
    });
  }
  fillForm() {
    this.storage.get('_deviceConfig').then(result => {
      let config  = new Configuration();
      if (result !== null && result !== undefined) {
        config = result;
      }
      this.refresh(config);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { SessionData } from 'src/app/models/active-packages';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/services/tracking.service';
import { FcmService } from 'src/services/fcm.service';
import { QueryParams } from 'src/app/models/QueryParams';
@Component({
  selector: 'app-url-changer',
  templateUrl: './url-changer.page.html',
  styleUrls: ['./url-changer.page.scss'],
})
export class UrlChangerPage implements OnInit {

  apiType = '';
  apiUrl = '';
  constructor(private navCtrl: NavController,
    private trackService: TrackingService,
    public loadingController: LoaderService, 
    private fcm: FcmService,
    private storage: Storage) {
    debugger;
    let id = localStorage.getItem("deviceID");
      if (id !== 'null' && id !== null && id !== undefined && id !== '') {
        this.loadingController.presentToast('alert', 'DeviceId - '+ id);
      } else {
        this.trackService.GenerateDeviceID();
      }
      let deviceToken = localStorage.getItem("deviceToken");
      if (deviceToken !== 'null' && deviceToken !== null && deviceToken !== undefined && deviceToken !== '') {
        this.loadingController.presentToast('alert', 'DeviceToken - '+ deviceToken);
      } else {
        this.fcm.notificationSetup();
      }
    this.apiType = SessionData.apiType;
    this.apiUrl = SessionData.apiURL;
    if(this.apiType === 'P'){
      this.apiUrl = environment.api_Url_Prod ; 
      this.apiType = 'P'; 
     }else if(this.apiType === 'B'){
      this.apiUrl = environment.api_Url_Beta ; 
      this.apiType = 'B'; 
     }else {
      this.apiUrl = this.apiUrl ; 
      this.apiType = 'C'; 
     }
     this.trackService.saveToken();
  }
  onTypeChange(){
    if(this.apiType === 'P'){
      this.apiUrl = environment.api_Url_Prod ; 
     }else if(this.apiType === 'B'){
      this.apiUrl = environment.api_Url_Beta ; 
     }else {
      this.apiUrl = SessionData.apiURL; 
     }
  }
  ngOnInit() {
  }
  saveUrl(){
    try{
      if(this.apiUrl === null || this.apiUrl === undefined || this.apiUrl === '' ){
          this.loadingController.presentToast('Error', 'Invalid API url');
      }else{
          this.storage.set('apiData', {
            apiURL : this.apiUrl,
            apiType : this.apiType
          });
          SessionData.apiURL = this.apiUrl ; 
          SessionData.apiType = this.apiType; 
          this.trackService.saveToken();
          this.loadingController.presentToast('alert', 'API url successfully updated.');
          this.navCtrl.pop();
     }
  }catch(Exception){

  }
  }
  dismiss() {
    this.navCtrl.pop();
  }
}

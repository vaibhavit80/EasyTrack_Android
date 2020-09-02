//import { FCM } from '@ionic-native/fcm/ngx';
import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { TrackingService } from './tracking.service';
import { QueryParams } from 'src/app/models/QueryParams';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';
import { SessionData } from 'src/app/models/active-packages';

@Injectable()
export class FcmService {
  queryParam: QueryParams;

  constructor(private firebase: FirebaseX,
    private storage: Storage,
    private trackService: TrackingService,
    private afs: AngularFirestore,
    private device: Device,
   // private fcm: FCM,
    private platform: Platform) { }

  async getToken() {
    let token;

    debugger;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    if (!token) return;
    localStorage.setItem("deviceToken", token);
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;
    localStorage.setItem("deviceToken", token);
    const devicesRef = this.afs.collection('devices');
    this.trackService.logError('Token'+ token , 'SaveToken');
    //alert(token);
    const data = {
      token,
      userId: localStorage.getItem("deviceID")
    };

    return devicesRef.doc(token).set(data);
  }

  subscribetoMessage(topic) {
    this.firebase.subscribe(topic);
  }

  unsubscribetoMessage(topic) {
    this.firebase.unsubscribe(topic);
  }

  refreshToken() {
    return this.firebase.onTokenRefresh();
  }

  onNotifications() {
    return this.firebase.onMessageReceived();
  }

  public notificationSetup() {
    if (this.platform.is('cordova')) {
      this.getToken();
      this.refreshToken().subscribe(token => {
        localStorage.setItem("deviceToken", token);
      });
    }

    this.subscribetoMessage(this.device.uuid);

    this.onNotifications().subscribe(msg => {

      // if (this.platform.is('ios')) {
      this.storage.get('apiData').then(aData => {
        if (aData !== null && aData !== undefined) {
          SessionData.apiURL = aData.apiURL;
          SessionData.apiType = aData.apiType;
        }
      });
      let notification: string;
      notification = msg.aps.alert.body;
      let message = notification.split(',');
      let trackingNoMessage = message[0].split(':');
      let carrierMessage = message[5].split(':');
      let trackingNo = trackingNoMessage[1].trim();
      let carrier = carrierMessage[1].trim();
      //let recordKey = trackingNo + '-' + carrier;

      try {
        this.queryParam = new QueryParams();
        this.queryParam.TrackingNo = trackingNo;
        this.queryParam.Carrier = carrier;
        this.queryParam.Description = '';
        this.queryParam.Residential = 'false';
        this.trackService.getTrackingDetails(this.queryParam);
      } catch (Exception) {
        this.trackService.logError(JSON.stringify(Exception), 'notificationSetup()');
        // this.loadingController.presentToast('Error', JSON.stringify(Exception));
      }
      // }
    });

    this.unsubscribetoMessage(this.device.uuid);
  }
}

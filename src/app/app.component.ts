import { Component } from '@angular/core';
import { Platform, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage';
import * as uuid from 'uuid';
import { TrackingService } from 'src/services/tracking.service';

import { FcmService } from 'src/services/fcm.service';
import { Network } from '@ionic-native/network/ngx';
import { LoaderService } from './providers/loader.service';
import { QueryParams } from './models/QueryParams';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Active Packages',
      url: '/active-packages',
      icon: 'logo-dropbox'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'logo-buffer'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'construct'
    }
    // ,{
    //   title: 'Help',
    //   url: '/help',
    //   icon: 'help-circle'
    // }
    // ,{
    //   title: 'Help',
    //   url: '/help',
    //   icon: 'help-circle'
    // }
  ];

  queryParam: QueryParams;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController: LoaderService,
    private storage: Storage,
    private trackService: TrackingService,
    private fcm: FcmService,
    private network: Network,
    private iab: InAppBrowser
  ) {
    this.splashScreen.show();

    this.initializeApp();
  }



  initializeApp() {
    if (this.platform.is('android')) {
      this.initializeAndroidApp();
    }
    else {
      this.initializeOtherApps();
    }
    // this.platform.ready().then(() => {
    //   this.platform.resume.subscribe(async () => {
    //     let trackNo = localStorage.getItem("intent");
    //     if (trackNo !== null && trackNo !== undefined && trackNo !== '') {
    //      // this.navCtrl.navigateForward('/home');
    //     }
    //   });
    //   this.platform.pause.subscribe(async () => {
    //     this.navCtrl.navigateForward('/home');
    //   });
    //   if (this.platform.is('cordova') || this.platform.is('android') || this.platform.is('ios')) {

    //   this.network.onDisconnect().subscribe(()=>
    //   {
    //     setTimeout(()=>
    //     {
    //       this.loadingController.presentToast('dark', 'Please check your Internet Conenction');
    //     }, 2000);
    //   });
    //   this.network.onConnect().subscribe(()=>
    //   {
    //     setTimeout(()=>
    //     {
    //       this.loadingController.presentToast('dark', 'Internet is Now Connected');
    //     }, 2000);
    //   });
    //   this.statusBar.backgroundColorByHexString('#7606a7');
    //   this.fcm.notificationSetup();
    //   this.trackService.GenerateDeviceID();

    // }else{
    //   localStorage.setItem("deviceID",, 'browser');
    // }
    // this.trackService.saveToken();
    // });
  }

  initializeOtherApps() {
    this.platform.ready().then(() => {
      this.platform.resume.subscribe(async () => {
        let trackNo = localStorage.getItem("intent");
        if (trackNo !== null && trackNo !== undefined && trackNo !== '') {
          // this.navCtrl.navigateForward('/home');
        }
      });
      this.platform.pause.subscribe(async () => {
        this.navCtrl.navigateForward('/home');
      });
      if (this.platform.is('cordova') || this.platform.is('android') || this.platform.is('ios')) {

        this.network.onDisconnect().subscribe(() => {
          setTimeout(() => {
            this.loadingController.presentToast('dark', 'Please check your Internet Conenction');
          }, 2000);
        });
        this.network.onConnect().subscribe(() => {
          setTimeout(() => {
            this.loadingController.presentToast('dark', 'Internet is Now Connected');
          }, 2000);
        });
        this.statusBar.backgroundColorByHexString('#7606a7');
        this.trackService.GenerateDeviceID();
        this.fcm.notificationSetup();
      } else {
        localStorage.setItem("deviceID", 'browser');
      }
      this.trackService.saveToken();
    });
  }

  initializeAndroidApp() {
    this.platform.resume.subscribe(async () => {
      let trackNo = localStorage.getItem("intent");
      if (trackNo !== null && trackNo !== undefined && trackNo !== '') {
        // this.navCtrl.navigateForward('/home');
      }
    });
    this.platform.pause.subscribe(async () => {
      this.navCtrl.navigateForward('/home');
    });
    if (this.platform.is('cordova')) {

      this.network.onDisconnect().subscribe(() => {
        setTimeout(() => {
          this.loadingController.presentToast('dark', 'Please check your Internet Conenction');
        }, 2000);
      });
      this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          this.loadingController.presentToast('dark', 'Internet is Now Connected');
        }, 2000);
      });
      this.statusBar.backgroundColorByHexString('#7606a7');
      this.fcm.notificationSetup();
      this.trackService.GenerateDeviceID();

    } else {
      localStorage.setItem("deviceID", 'browser');
    }
    this.trackService.saveToken();
  }

  openUrl() {
    this.platform.ready().then(() => {
      let browser = this.iab.create('https://shipmatrix.com/');
    });
  }

}
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './pages/shared/shared.module';
import { PopoverDetailPage } from './pages/popover-detail/popover-detail.page';
import { PopoverDetailPageModule } from './pages/popover-detail/popover-detail.module';
import { IonicStorageModule } from '@ionic/storage';
import { AppConfigService } from 'src/services/appConfigServices';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoaderService } from './providers/loader.service';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ngxZendeskWebwidgetModule, ngxZendeskWebwidgetConfig } from 'ngx-zendesk-webwidget';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { FcmService } from 'src/services/fcm.service';
import { Network } from '@ionic-native/network/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { ZBar } from '@ionic-native/zbar/ngx';
import { UrlChangerPage } from './pages/url-changer/url-changer.page';
import { UrlChangerPageModule } from './pages/url-changer/url-changer.module';
import { HomePageModule } from './pages/home/home.module';
import { FCM } from '@ionic-native/fcm/ngx';

const config = {
  apiKey: "AIzaSyB-31B97WmwEKjgyOk731wuYFP2vjDDxI8",
  authDomain: "easytrack-9ff9c.firebaseapp.com",
  databaseURL: "https://easytrack-9ff9c.firebaseio.com",
  projectId: "easytrack-9ff9c",
  storageBucket: "easytrack-9ff9c.appspot.com",
  messagingSenderId: "874399430634"
};

export class ZendeskConfig extends ngxZendeskWebwidgetConfig{
  accountUrl = 'shipmatrix.zendesk.com';
  beforePageLoad(zE){
    zE.setLocale('en');
    zE.hide();
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [PopoverDetailPage],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    ngxZendeskWebwidgetModule.forRoot(ZendeskConfig),
    PopoverDetailPageModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AppRoutingModule, SharedModule, IonicStorageModule.forRoot({
      name: '__mydb',
driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],  providers: [AppConfigService, LoaderService, BarcodeScanner, SocialSharing, Device, StatusBar,
    SplashScreen,
    NativeGeocoder,
    FirebaseX,
    FCM,
    //ZBar,
    FcmService,
    Network,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
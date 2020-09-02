import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(private iab: InAppBrowser,
    private navCtrl: NavController) 
    { 
      this.navCtrl.navigateForward(`/home`);
    }

  ngOnInit() {
    const browser = this.iab.create('src/app/ZendeskSupportPage/ZendeskSupport.html');

    //browser.executeScript(...);

    // // browser.insertCSS(...);
    browser.on('loadstop').subscribe(event => {
    browser.insertCSS({ code: "body{color: red;" });
    });

    browser.close();
  }

}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SocialSharingService } from 'src/app/providers/social-sharing.service';
import { ActionSheetController } from '@ionic/angular';
import { ActivePackages } from 'src/app/models/active-packages';
import { HelperService } from 'src/app/providers/helper.service';

@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.component.html',
  styleUrls: ['./social-sharing.component.scss'],
})
export class SocialSharingComponent implements OnInit {
  @Input() Key: ActivePackages;
  message: string;
  image: string;
  url: string;
  subject: string;
  constructor(public actionSheetCtrl: ActionSheetController, public social: SocialSharingService,
    public helper: HelperService) { }
  ngOnInit() {
    const carrierName = this.helper.GetCarrierName(this.Key.Carrier);
    this.url = '';
    this.image = '';
    this.message = 'Tracking Number: ' + this.Key.TrackingNo + '\n Carrier: ' + carrierName + '\n Status: ' + this.Key.Status;
    this.subject = 'Package Status';
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share',
      buttons: [{
        text: 'Share on Whatsup',
        role: 'destructive',
        cssClass: 'action-whatsup',
        icon: 'logo-whatsapp',
        handler: () => {
          this.social.share(
            'com.whatsapp',
            'Whatsapp',
            'whatsapp',
            this.message,
            this.subject,
            this.image,
            this.url
          );
        }
      }, {
        text: 'Send an Email',
        role: 'destructive',
        cssClass: 'action-twitter',
        icon: 'logo-google',
        handler: () => {
          this.social.share(
            'com.google.android.gm',
            'Gmail',
            'gmail',
            this.message,
            this.subject,
            this.image,
            this.url
          );
        }
      }
      ]
    });
    actionSheet.present();
  }

  async presentActionSheet2() {
    this.social.share2(
      this.message,
      this.subject,
      this.image,
      this.url
    );
  }
}

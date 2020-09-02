import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LoaderService } from './loader.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocialSharingService {

  constructor(private socialSharing: SocialSharing,
    private platform: Platform,
    private loadService: LoaderService) {
  }

  share(packageName: string,
    appName: string,
    social: string,
    message: string,
    subject: string,
    image: string,
    url: string) {
    try {
      this.platform.ready().then(() => {
        if (social === 'facebook') {
          this.socialSharing
            .canShareVia(
              packageName,
              message,
              subject,
              image,
              url
            )
            .then(() => {
              this.socialSharing
                .shareViaFacebook(message, image, url)
                .catch(err => {
                  this.loadService.presentToast('Error',
                    'There was a problem please try later'
                  );
                });
            })
            .catch(err => {
              this.loadService.presentToast('warning', appName + ' is not installed on device.');
            });
        } else if (social === 'whatsapp') {
          this.socialSharing
            .canShareVia(
              packageName,
              message,
              subject,
              image,
              url
            )
            .then(() => {
              this.socialSharing
                .shareViaWhatsApp(message, image, url)
                .catch(err => {
                  this.loadService.presentToast('Error',
                    'There was a problem please try later'
                  );
                });
            })
            .catch(err => {
              this.loadService.presentToast('warning', appName + ' is not installed on device.');
            });
        } else if (social === 'instagram') {
          this.socialSharing
            .canShareVia(
              packageName,
              message,
              subject,
              image,
              url
            )
            .then(() => {
              this.socialSharing
                .shareViaInstagram(message, image)
                .catch(err => {
                  this.loadService.presentToast('Error',
                    'There was a problem please try later'
                  );
                });
            })
            .catch(err => {
              this.loadService.presentToast('warning', appName + ' is not installed on device.');
            });
        } else if (social === 'twitter') {
          this.socialSharing
            .canShareVia(
              packageName,
              message,
              subject,
              image,
              url
            )
            .then(() => {
              this.socialSharing
                .shareViaTwitter(message, image, url)
                .catch(err => {
                  this.loadService.presentToast('Error',
                    'There was a problem please try later.'
                  );
                });
            })
            .catch(err => {
              this.loadService.presentToast('warning', appName + ' is not installed on device.');
            });
        } else if (social === 'gmail') {
          this.socialSharing
            .canShareVia(
              packageName,
              message,
              subject,
              image,
              url
            )
            .then(() => {
              this.socialSharing
                .shareViaEmail(message, subject, null)
                .catch(err => {
                  this.loadService.presentToast('Error',
                    'There was a problem please try later.'
                  );
                });
            })
            .catch(err => {
              this.loadService.presentToast('warning', appName + ' is not installed on device.');
            });
        } else if (social === 'sms') {
          this.socialSharing
            .canShareVia(
              packageName,
              message,
              subject,
              image,
              url
            )
            .then(() => {
              this.socialSharing
                .shareViaSMS(message, null)
                .catch(err => {
                  this.loadService.presentToast('Error',
                    'There was a problem please try later.'
                  );
                });
            })
            .catch(err => {
              this.loadService.presentToast('warning', appName + ' is not installed on device.');
            });
        } else {
          this.socialSharing
            .share(message, subject, image, url)
            .catch(err => {
              this.loadService.presentToast('Error', 'There was a problem please try later');
            });
        }
      });
    } catch (error) {
      this.loadService.presentToast('error', 'Something went wrong!');
    }
  }

  share2(message: string,
    subject: string,
    image: string,
    url: string) {
    try {
      this.socialSharing.share(
        message,
        subject,
        image,
        url
      )
    } catch (error) {
      this.loadService.presentToast('error', 'Something went wrong!');
    }
  }



}

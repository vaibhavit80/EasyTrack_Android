import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;

  constructor(public toastController: ToastController,public loadingController: LoadingController,
              public alertController: AlertController) { }

  async present(msgdata: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msgdata
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  waitLoader(msgdata: string , waitTime: number) {
   this.loadingController.create({
      message: msgdata,
      duration: waitTime
    }).then(a => {
      a.present();
    });
  }

  async presentAlert(_header: any, _message: any) {
    const alert = await this.alertController.create({
      header: _header,
      message: _message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentToast(msgtype = 'dark', message) {
    const toast = await this.toastController.create({
      message,
      color: msgtype.toLowerCase() === 'error' ? 'danger' : (msgtype.toLowerCase() === 'warning' ? 'dark' :
                              (msgtype.toLowerCase() === 'info' ? 'dark' : 'dark')),
      showCloseButton: true,
      position: msgtype.toLowerCase() === 'error' ? 'top' : (msgtype.toLowerCase() === 'warning' ? 'top' :
      (msgtype.toLowerCase() === 'info' ? 'bottom' : 'bottom')),
      closeButtonText: 'close',
      duration: 4000
    });
    toast.present();
  }
}

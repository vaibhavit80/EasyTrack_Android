import { Component, OnInit, ViewChild, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
//import { Result } from '@zxing/library';
//import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingService } from 'src/services/tracking.service';
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit {

  constructor(private route: ActivatedRoute, private trackService: TrackingService,private navCtrl: NavController, private loading: LoaderService) {
    this.loading.present('Waiting for Camera..');
  }
 ngOnInit()    {
  // this.getLocations();
 }
  goBack() {
    this.navCtrl.pop();
  }
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
isFailed: boolean = false;
errorMsg: string = '';
  // formatsEnabled: BarcodeFormat[] = [
  //   BarcodeFormat.CODE_128,
  //   BarcodeFormat.DATA_MATRIX,
  //   BarcodeFormat.EAN_13,
  //   BarcodeFormat.QR_CODE,
  // ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  clearResult(): void {
    this.qrResultString = null;
  }

  scanError(resultString: any){
    this.isFailed = true;
    this.errorMsg = resultString;
    this.trackService.logError(JSON.stringify(resultString),'BarCode Scanner');
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.loading.dismiss();
    this.availableDevices = devices; 
    this.hasDevices = Boolean(devices && devices.length);
   
  }

  onCodeResult(resultString: any) {
    this.isFailed = false;
    this.qrResultString = resultString;
      this.navCtrl.navigateForward(`/home/${resultString}`);
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  
  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  
  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}

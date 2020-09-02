import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { IonicModule } from '@ionic/angular';

import { BarcodeScannerPage } from './barcode-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: BarcodeScannerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    //ZXingScannerModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BarcodeScannerPage]
})
export class BarcodeScannerPageModule {}

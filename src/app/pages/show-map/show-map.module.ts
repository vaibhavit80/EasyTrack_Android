import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { ShowMapPage } from './show-map.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ShowMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsDe_IUsnRI4GtTyTFT26fV5PkkU1knso'
    })
  ],
  declarations: [ShowMapPage]
})
export class ShowMapPageModule {}

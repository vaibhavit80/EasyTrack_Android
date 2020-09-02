import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivePackagesPage } from './active-packages.page';
import { SharedModule } from '../shared/shared.module';
import { OrderByPipe } from 'src/app/pipe/order-by.pipe';

const routes: Routes = [
  {
    path: '',
    component: ActivePackagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),SharedModule
  ],
  declarations: [ActivePackagesPage,OrderByPipe]
})
export class ActivePackagesPageModule {}

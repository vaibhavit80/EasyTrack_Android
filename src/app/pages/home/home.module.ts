import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';
import { UrlChangerPage } from '../url-changer/url-changer.page';
import { UrlChangerPageModule } from '../url-changer/url-changer.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),SharedModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

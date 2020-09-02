import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootertabComponent } from 'src/app/components/footertab/footertab.component';
import { IonicModule } from '@ionic/angular';
import { SocialMediaLinksComponent } from 'src/app/components/social-media-links/social-media-links.component';
import { FormsModule } from '@angular/forms';
import { HelpFabComponent } from 'src/app/components/help-fab/help-fab.component';
import { SocialSharingComponent } from 'src/app/components/social-sharing/social-sharing.component';

@NgModule({
  declarations: [FootertabComponent, SocialMediaLinksComponent, HelpFabComponent, SocialSharingComponent],
  entryComponents: [FootertabComponent, SocialMediaLinksComponent, HelpFabComponent, SocialSharingComponent],
  imports: [ IonicModule,
    CommonModule, FormsModule
  ],
  exports: [FootertabComponent, SocialMediaLinksComponent, HelpFabComponent, SocialSharingComponent]
})
export class SharedModule { }

import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-detail',
  templateUrl: './popover-detail.page.html',
  styleUrls: ['./popover-detail.page.scss'],
})
export class PopoverDetailPage implements OnInit {

  trackNo: any ;
  pop: PopoverController;
  DeliveredDate :any;
  constructor(
    private navParams: NavParams
  ) { }
 
  ngOnInit() {
    this.trackNo = this.navParams.data.trackNo;
    this.pop = this.navParams.data.Popover;
  }
  async closeModal(data : any) {
    await this.pop.dismiss(data);
  }  

  archive() {
    this.closeModal('archive');
  }

  MarkasDelievered() {
    this.closeModal('MarkasDelievered');
  }

  locate() {
    this.closeModal('locate');
  }

  gotoSettings() {
    this.closeModal('gotoSettings');
  }

  delete() {
    this.closeModal('delete');
  }

  share() {
    this.closeModal('share');
  }


}

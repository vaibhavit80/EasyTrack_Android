

import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoaderService } from 'src/app/providers/loader.service';
import { TrackingScans } from 'src/app/models/TrackingScans';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MapLocations } from 'src/app/models/MapLocations';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TrackingService } from 'src/services/tracking.service';
declare var google;
@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.page.html',
  styleUrls: ['./show-map.page.scss'],
})
export class ShowMapPage implements OnInit {

  @ViewChild('map') 
  mapContainer: ElementRef;
  map: any;
  trackingScans: Array<TrackingScans> =[];
  height = 0;
  lat: any;
  lng: any;
  isLoaded = false;
  isError = false;
  locations: Array<MapLocations> = [];

  constructor(private route: ActivatedRoute,private navCtrl: NavController, private loading: LoaderService,
              public platform: Platform, private trackService: TrackingService , public nativeGeocoder: NativeGeocoder) {
        this.loading.present('Loading Map');
        this.route.queryParams.subscribe(params => {        
        this.trackingScans = JSON.parse(params.scans);
        this.height = platform.height() - 56;
        this.getLocations();
      });
    }

  ngOnInit()    {
   // this.getLocations();
  }

  markersArray = [];
  displayGoogleMap(loc:any) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
      disableDefaultUI: true,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
  }

  addMarkersToMap(loc: any) {
    let marker = new google.maps.Marker({
      map: this.map,
      position: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
      title: loc.location,
      icon: {
        url: loc.url
      }
    });
  
    //store the marker object drawn in global array
    this.markersArray.push(marker);
  }

  goBack() {
    this.navCtrl.pop();
  }

  reloadMap(){
    this.loading.present('Reloading Map');
    this.isLoaded = false;
    this.isError = false;
    this.getLocations();
    //this.loading.dismiss();
  }

  getLocations() {
    
    try{
      this.locations = new Array<MapLocations>();
      let min = new Date(Math.min.apply(null,this.trackingScans.map(function(e){return new Date(e.scanDateTime)})));
      let max = new Date(Math.max.apply(null,this.trackingScans.map(function(e){return new Date(e.scanDateTime)})));
      //alert(min +'-'+max);
      for(let scan of this.trackingScans){
        if(scan.location !== undefined && scan.location !== null && scan.location !== '')
{        this.nativeGeocoder.forwardGeocode(scan.location)
        .then((coordinates: NativeGeocoderResult[]) => {
              const locs = new MapLocations();
              locs.latitude = coordinates[0].latitude;
              locs.longitude = coordinates[0].longitude;
              locs.location = scan.location;
              if(scan.scanDateTime !== undefined && scan.scanDateTime !== null && scan.scanDateTime !== ''){
              var scantime = new Date(scan.scanDateTime);
                      if( scantime.getTime() === max.getTime()){
                        locs.url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                        //.getalert(JSON.stringify(locs));
                      }else if( scantime.getTime() === min.getTime()){
                        locs.url = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                       // alert(JSON.stringify(locs));
                      }
                      else{
                        locs.url = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                        //alert(JSON.stringify(locs));
                      }
                      
              }
              else{
                locs.url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                //alert(JSON.stringify(locs));
              }
              //this.trackService.logError(JSON.stringify(locs),'Location');
              this.locations.push(locs);
              if(this.locations.length === 1){
               this.displayGoogleMap(locs);
              }
              this.addMarkersToMap(locs);
             // i = i+1;
              this.isError = false;
              this.loading.dismiss();
        })
        .catch((error: any) =>  {
 //i=i+1;
          this.isError = true;
              this.loading.dismiss();
              this.trackService.logError(scan.location + ' - ' +JSON.stringify(error),'Map Viewer');
              //this.goBack();
              //if(i === this.trackingScans.length - 1) {}//query
        });
      }
      }
    }
    catch (Exception) {
      this.isError = true;
      this.loading.dismiss();
      this.trackService.logError(JSON.stringify(Exception),'Map Viewer');
      this.loading.presentToast('Error', 'Something went wrong!');
      
    }
    finally{
      //this.loadmap();
    }
  }
}

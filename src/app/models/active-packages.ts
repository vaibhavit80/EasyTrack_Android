import { environment } from 'src/environments/environment';
//import { Storage } from '@ionic/storage';
export class ActivePackages {
    TrackingNo: string;
    Status: string;
    Carrier: string;
    DateCreated: string;
    ExpectedDate: string;
    LastUpdated: string;
    Key: any;
    ImgUrl: any;
}
export class Packages {
    All: Array<ActivePackages> = [];
    Today: Array<ActivePackages> = [];
    Yesterday: Array<ActivePackages> = [];
    ThisWeek: Array<ActivePackages> = [];
    LastWeek: Array<ActivePackages> = [];
    Archive: Array<ActivePackages> = [];
}
export class FilteringDates {
    Today: Date;
    Yesterday: Date;
    ThisWeek: any;
    LastWeek: any;
}

export class SessionData {

    static packages: Packages = new Packages();
    static filteringDates: FilteringDates = new FilteringDates();
    static apiURL: string = environment.api_Url_Prod;
    static apiType: string = "P";
    
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_Url_Prod: 'https://demo.easytrackapp.com/smtrackingapi/api/',
  api_Url_Beta: 'http://10.1.10.46/smtrackingapi/api/',
  savePreferances: 'SavePreferences',
  saveConfiguration: 'SaveConfigure',
  logErrorMessage: 'LogErrorMessage',
  saveDeviceID: 'SaveGsmRegistration',
  // tslint:disable-next-line: max-line-length
  trackingAPI: 'Tracking?TrackingNo=@TrackingNo&Carrier=@Carrier&Description=@Description&Residential=@Residential&DeviceNo=@DeviceNo&AppUser=ShipMatrixApp&AppPwd=ShipMatrixApp&RegistrationId=@RegistrationId',
  firebase: {
    apiKey: "AIzaSyBANb1Wp2bBADBy8VwHbe3Rvy0-EkM2TdU",
    authDomain: "easytrack-9ff9c.firebaseapp.com",
    databaseURL: "https://easytrack-9ff9c.firebaseio.com",
    projectId: "easytrack-9ff9c",
    storageBucket: "easytrack-9ff9c.appspot.com",
    messagingSenderId: "874399430634",
    appId: "1:874399430634:ios:5099bcfa4d3fb5df2da493"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

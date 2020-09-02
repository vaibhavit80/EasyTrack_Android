import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  
  GetCarrierCode(TrackingNo) {
    debugger;
    let CarrierCode = '';
    // Pattern patt = Pattern.compile('^[a-zA-Z]');
    if (TrackingNo  ===  '') {
      CarrierCode = '';
      return '';
    }


     
     
    let trackingLength = TrackingNo.length;
    //logic for Ontrac

   
    switch (trackingLength)
    {
      case 9: // FedEx Freight
        CarrierCode = 'R';
        break;
      case 12: // FedEx Express,FedEx Freight,Purolator
            let check = this.CheckFXXCheckDigit(TrackingNo);
            if (check === true) {
          CarrierCode = 'F';
        }else if(TrackingNo.match('[B]\d\d\d\d\d\d\d\d\d\d\d') || TrackingNo.match('[C]\d\d\d\d\d\d\d\d\d\d\d\d\d\d') || TrackingNo.match('[D]\d\d\d\d\d\d\d\d\d\d\d\d\d\d'))
        {
          CarrierCode =  "O";
        } else {
          CarrierCode = 'P';
        }
            break;
      case 15: // FedEx Ground
      if(TrackingNo.match('[B]\d\d\d\d\d\d\d\d\d\d\d') || TrackingNo.match('[C]\d\d\d\d\d\d\d\d\d\d\d\d\d\d') || TrackingNo.match('[D]\d\d\d\d\d\d\d\d\d\d\d\d\d\d'))
        {
          CarrierCode =  "O";
        } else {
          CarrierCode = 'R';
        }
       // CarrierCode = 'R';
        break;
      case 18: // UPS
      if (TrackingNo.substring(0, 2).toUpperCase()  ===  "1Z" && this.UPS_CheckDigit(TrackingNo)) {
        CarrierCode = "U";
      } else {
        CarrierCode = "U";
      }
        break;
      case 11:
        if (TrackingNo.match('[a-zA-Z]\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d')) {
          CarrierCode = 'U';
        } else {
          CarrierCode = 'P';
        }
        break;
      case 20: // FedEx smart post
        CarrierCode = 'R';
        break;
      case 10: // DHL
       if (this.CheckDHLCheckDigit(TrackingNo)) {
          CarrierCode = 'D';
       } else {
         CarrierCode = 'P';
       }
          break;
      case 13: // DHL
        if (TrackingNo.match('[a-zA-Z][a-zA-Z][0-9]{9}[a-zA-Z][a-zA-Z]')) {
          CarrierCode = 'S';
        }
        break;

      case 22:
      case 30:
            if(this.USPS_CheckDigit(TrackingNo))
              CarrierCode = "S";
      break;  
	  
	  case 34:
	  case 35:
			CarrierCode = 'F';
      break;
      default:
        if (TrackingNo.length > 18) {
          CarrierCode = 'S';
        } else {
          CarrierCode = '';
        }
        break;
    }
    return CarrierCode;
  }
  GetCarrierName(carrierCode) {
     switch (carrierCode) {
       case 'U':
         return 'UPS';
        case 'S':
          return 'USPS';
        case 'D':
          return 'DHL';
        case 'F':
          return 'FedEx Express';
        case 'R':
          return 'FedEx Ground';
        case 'P':
          return 'Purulator';
        case 'O':
          return 'OnTrac';
        default:
          return 'Invalid';
     }
  }
  GetUPSServiceType(TrackingNo) {
      let ServiceType = TrackingNo.substring(0,2);
      if ('01'  ===  ServiceType || '24'  ===  ServiceType
          || '44' === ServiceType || 'A2' === ServiceType
          || 'A3' === ServiceType || 'AC' === ServiceType
          || 'AD' === ServiceType || '09' === ServiceType
          || '22' === ServiceType || '25' === ServiceType
          || '28' === ServiceType || '47' === ServiceType
          || '58' === ServiceType || '59' === ServiceType
          || '60' === ServiceType || '84' === ServiceType) {
        ServiceType = 'Next Day Air';

      } else if ('02' === ServiceType || '35' === ServiceType
          || 'A6' === ServiceType || '11' === ServiceType
          || '36' === ServiceType || '37' === ServiceType
          || '52' === ServiceType || '70' === ServiceType
          || '87' === ServiceType || 'AG' === ServiceType) {
        ServiceType = '2nd Day Air';

      } else if ('03' === ServiceType || 'A8' === ServiceType
          || 'AJ' === ServiceType || 'AN' === ServiceType
          || 'AP' === ServiceType || 'AR' === ServiceType
          || '26' === ServiceType || '42' === ServiceType
          || '43' === ServiceType || '72' === ServiceType
          || '78' === ServiceType || '90' === ServiceType) {
        ServiceType = 'Ground';

      } else if ('14' === ServiceType || '55' === ServiceType
          || '66' === ServiceType || '69' === ServiceType
          || '75' === ServiceType || '76' === ServiceType
          || '85' === ServiceType || '92' === ServiceType
          || '96' === ServiceType) {
        ServiceType = 'Worldwide Express';

      } else if ('00' === ServiceType || '17' === ServiceType
          || '67' === ServiceType || '88' === ServiceType
          || '94' === ServiceType || '98' === ServiceType) {
        ServiceType = 'Worldwide Expedited';

      } else if ('20' === ServiceType || '56' === ServiceType
          || '68' === ServiceType || '79' === ServiceType
          || '91' === ServiceType || '95' === ServiceType
          || '99' === ServiceType) {
        ServiceType = 'Standard to Canada';

      } else  if ('12' === ServiceType || 'A7' === ServiceType
          || 'AH' === ServiceType || '16' === ServiceType
          || '39' === ServiceType || '40' === ServiceType
          || '50' === ServiceType || '71' === ServiceType
          || '89' === ServiceType) {
        ServiceType = '3 Day Select';

      } else if ('13' === ServiceType || 'A4' === ServiceType
          || 'AE' === ServiceType || '23' === ServiceType
          || '29' === ServiceType || '30' === ServiceType
          || '62' === ServiceType) {
        ServiceType = 'Next Day Air Saver';

      } else if ('15' === ServiceType || '41' === ServiceType
          || 'A0' === ServiceType || 'A1' === ServiceType
          || 'A9' === ServiceType || 'AA' === ServiceType
          || '21' === ServiceType ||'32' === ServiceType
          ||  '33' === ServiceType) {
        ServiceType = 'Next Day Air Early A.M.';

      } else if('08' === ServiceType) {
      ServiceType = 'Economy';
      } else if ('AK' === ServiceType || 'AL' === ServiceType
          || 'AM' === ServiceType || '34' === ServiceType
          || '54' === ServiceType || '73' === ServiceType) {
        ServiceType = 'Worldwide Express Plus';
      } else if ('A5' === ServiceType || 'AF' === ServiceType
          || '07' === ServiceType || '18' === ServiceType
          || '19' === ServiceType || '31' === ServiceType
          || '65' === ServiceType) {
        ServiceType = '2nd Day Air A.M.';
      } else if ('04' === ServiceType || '77' === ServiceType
          || '86' === ServiceType || '93' === ServiceType
          || '97' === ServiceType) {
        ServiceType = 'Express Saver';
      }
      /*
       * case '15': case '41': case 'A0': case 'A1': case 'A9': case 'AA':
       * case '21': case '32': case '33': ServiceType =
       * 'Next Day Air Early A.M.'; break;
       * 
       * case '08': ServiceType = 'Economy'; break;
       * 
       * case 'AK': case 'AL': case 'AM': case '34': case '54': case '73':
       * ServiceType = 'Worldwide Express Plus'; break;
       * 
       * case 'A5': case 'AF': case '07': case '18': case '19': case '31':
       * case '65': ServiceType = '2nd Day Air A.M.'; break;
       * 
       * case '04': case '77': case '86': case '93': case '97': ServiceType =
       * 'Express Saver'; break;
       */
      else {
        ServiceType = 'Invalid Service Type';
      }
      return ServiceType;
    }
     CheckDHLCheckDigit(TrackingNo : any):boolean
    {
        try
        {
           let sum: number;
           let rem: number;
            let trno: number;
             let div: number;
            if (div.toString().indexOf('.') > 0)
            {
                div = parseFloat(div.toString().substring(div.toString().indexOf('.'), 2));
            } else{div;}

            //div = Math.DivRem(trno, 7, out trno);
            div *= 7;
            rem = Math.ceil(div);
            if (rem.toString() == TrackingNo[9].ToString()){
               return true;
            }
            else{
             return false;
            }
            
        }
        catch
        {
          return false;
        }
    }
//  GetServiceType(TrackingNo) {
//       let CarrierCode = GetCarrierCode(TrackingNo);
//       let ServiceType = '';
//       if ('U'  ===  CarrierCode){
//         ServiceType =  GetUPSServiceType(TrackingNo);
//       } else if ('F'  ===  CarrierCode){
//         ServiceType =  GetUPSServiceType(TrackingNo);
//       } else if('D'  ===  CarrierCode){
//         ServiceType =  GetUPSServiceType(TrackingNo);
//       } else {}
//       /*
//        * switch(CarrierCode) { case 'U': ServiceType =
//        * GetUPSServiceType(TrackingNo); break;
//        * 
//        * case 'F': ServiceType = GetUPSServiceType(TrackingNo); break;
//        * 
//        * case 'D': ServiceType = GetUPSServiceType(TrackingNo); break; }
//        */
//       return ServiceType;
//     }

CheckFXXCheckDigit(TrackingNo) {
  try{
    let sum;
    let trackingNo = TrackingNo;

    sum = trackingNo.charAt(10) * 1;
    sum += trackingNo.charAt(9) * 3;
    sum += trackingNo.charAt(8) * 7;
    sum += trackingNo.charAt(7) * 1;
    sum += trackingNo.charAt(6) * 3;
    sum += trackingNo.charAt(5) * 7;
    sum += trackingNo.charAt(4) * 1;
    sum += trackingNo.charAt(3) * 3;
    sum += trackingNo.charAt(2) * 7;
    sum += trackingNo.charAt(1) * 1;
    sum += trackingNo.charAt(0) * 3;
    let rem = sum % 11;
    if (rem === 10) {
      rem = 0;
    }
    if (rem == trackingNo.charAt(11)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

USPS_CheckDigit(Tracking_No){
  var tracking_no = "";
  var checkDigit = Tracking_No.charAt(Tracking_No.length - 1);
  var sum = 0;
  var odd = 0;
  var even = 0;
  var getDigit = 0;
  
  try{
    if(Tracking_No.length !== 22){
      if(Tracking_No.substring(0,3) === "420"){
        Tracking_No = Tracking_No.substring(8, Tracking_No.length);
        if(Tracking_No.substring(0,1) === "9"){
          Tracking_No = Tracking_No.substring(0, Tracking_No.length-1);
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    else{
      Tracking_No = Tracking_No.substring(0, Tracking_No.length - 1);
    }
    
    tracking_no = Tracking_No;
    
    var i ;
    
    for(i=0; i<tracking_no.length;i++){
      if(i%2==0){
        odd += parseInt(tracking_no.charAt(i));   
      }
      else{
        even +=  parseInt(tracking_no.charAt(i));  
      }
    }
    
    sum = even + (odd*3);
  
    getDigit = sum%10;
    getDigit = 10 - getDigit;
  
    if(getDigit === parseInt(checkDigit)){
      return true;    
    }
    else{
      return false;
    } 
  }
  catch(e){
    return "USPS Tracking Number not working";
  }
}

UPS_CheckDigit(Tracking_No){
    var tracking_no = "";
    var checkDigit = Tracking_No.charAt(Tracking_No.length - 1);
    var account = "", service = "", serial = "";
    var sum = 0;
  var odd = 0, even = 0;
    var getDigit = 0;

    try{
      Tracking_No = Tracking_No.substring(2, Tracking_No.length - 1);

      account = Tracking_No.substring(0, 6).toUpperCase();
      service = Tracking_No.substring(6, 8);
      serial = Tracking_No.substring(8, Tracking_No.length);
        
        var i;
  
  for(i=0;i<account.length-1;i++){
    switch(account.charAt(i)){
      case 'A': account = account.replace(account.charAt(i), '2');
        break;
      case 'B': account = account.replace(account.charAt(i), '3');
        break;
      case 'C': account = account.replace(account.charAt(i), '4');
        break;
      case 'D': account = account.replace(account.charAt(i), '5');
        break;
      case 'E': account = account.replace(account.charAt(i), '6');
        break;
      case 'F': account = account.replace(account.charAt(i), '7');
        break;
      case 'G': account = account.replace(account.charAt(i), '8');
        break;
      case 'H': account = account.replace(account.charAt(i), '9');
        break;
      case 'I': account = account.replace(account.charAt(i), '0');
        break;
      case 'J': account = account.replace(account.charAt(i), '1');
        break;
      case 'K': account = account.replace(account.charAt(i), '2');
        break;
      case 'L': account = account.replace(account.charAt(i), '3');
        break;
      case 'M': account = account.replace(account.charAt(i), '4');
        break;
      case 'N': account = account.replace(account.charAt(i), '5');
        break;
      case 'O': account = account.replace(account.charAt(i), '6');
        break;
      case 'P': account = account.replace(account.charAt(i), '7');
        break;
      case 'Q': account = account.replace(account.charAt(i), '8');
        break;
      case 'R': account = account.replace(account.charAt(i), '9');
        break;
      case 'S': account = account.replace(account.charAt(i), '0');
        break;
      case 'T': account = account.replace(account.charAt(i), '1');
        break;
      case 'U': account = account.replace(account.charAt(i), '2');
        break;
      case 'V': account = account.replace(account.charAt(i), '3');
        break;
      case 'W': account = account.replace(account.charAt(i), '4');
        break;
      case 'X': account = account.replace(account.charAt(i), '5');
        break;
      case 'Y': account = account.replace(account.charAt(i), '6');
        break;
      case 'Z': account = account.replace(account.charAt(i), '7');
        break;
    }
  }
        
        
  tracking_no = account + service + serial;
  
  for(i=0; i<tracking_no.length;i++){
    if(i%2===0){
      odd += parseInt(tracking_no.charAt(i));   
    }
    else{
      even +=  parseInt(tracking_no.charAt(i));  
    }
  }
  
  sum = (even*2) + odd;
  
  getDigit = sum%10;
  getDigit = 10 - getDigit;
  
  if(getDigit === parseInt(checkDigit)){
    return true;    
  }
  else{
    return false;
  }  
  }
  catch(e){
    return "UPS Tracking Number not working";
  }
}


}
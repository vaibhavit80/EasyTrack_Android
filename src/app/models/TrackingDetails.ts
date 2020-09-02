import { TrackingHeader } from "./TrackingHeader";
import { TrackingScans } from "./TrackingScans";
import { TrackingResult } from "./TrackingResult";

export class TrackingDetails
{
    TrackingResult: TrackingResult;
    TrackingHeader: TrackingHeader;
    TrackingScans: Array<TrackingScans> = [];
    isPickUpscan = true;
    isOutforDelivery = true;
    isDelivered = true;
    isNofinaldeliveredstatus = true;
    isDamaged = true;
    isWeatherDelay = true;
}
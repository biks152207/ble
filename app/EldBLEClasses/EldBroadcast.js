import {ProcessEldData}  from './ProcessEldData'
import {ProcessEldCachedDataRecord} from './ProcessEldCachedDataRecord'

export class EldBroadcast {
    broadcastString;
    recType;

    static EldBroadcast() {
        this.broadcastString = "";
        this.recType = EldBroadcastTypes.ELD_UNKNOWN;
    }

    static EldBroadcast(broadcastData) {
        ELD_BUFFER_RECORD = 0;
        ELD_CACHED_RECORD = 1;
        ELD_DATA_RECORD = 2;
        ELD_UNKNOWN = 3;

/*  20 */   //    this.processEldData = ProcessEldData

                this.recType = ProcessEldCachedDataRecord.IdentifyCachedRecordType(broadcastData)

/*  24 */   //    this.recType = processEldData.IdentifyBroadcastType(broadcastData)
    /*     */   this.broadcastString = broadcastData
        return this
        /*     */
    }
/*     */
/*     */ static  getBroadcastString()
/*     */ {
/*  98 */     return this.broadcastString;
        /*     */
    }
/*     */
/*     */  static getRecType()
/*     */ {
/* 105 */     return this.recType;
        /*     */
    }
    /*     */
}
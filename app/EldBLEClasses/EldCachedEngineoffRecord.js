import react from 'react';
import {EldCachedDataRecord} from './EldCachedDataRecord'

/*    */ export class EldCachedEngineoffRecord
/*    */ {
/*    */   Vin;
/*    */   unixTime;
/*    */ 
/*    */   static EldCachedEngineoffRecord()
/*    */   {
/* 13 */     this.recType = EldCachedDataRecordTypes.ELD_CACHED_ENGINEOFF_RECORD;
/*    */   }
/*    */ 
/*    */   static EldCachedEngineoffRecord(eldData)
/*    */   {
/* 18 */     //EldCachedDataRecord.EldCachedDataRecord(eldData);
/*    */ 
/* 20 */     dataList = eldData.split(",");
/*    */ 
/* 24 */     this.Vin = dataList[1];
/*    */     try
/*    */     {
/* 28 */       this.unixTime = parseLong(dataList[2]);
/*    */     }
/*    */     catch (error)
/*    */     {
/* 32 */       this.unixTime = 0;
/*    */     }
/*    */     try
/*    */     {
/* 36 */       this.seqNum = Integer.parseInt(dataList[3]);
            //TODO: replace: .replaceAll("\r\n", ""));
/*    */     }
/*    */     catch (error)
/*    */     {
/* 40 */       this.seqNum = 0;
/*    */     }
/*    */   }
/*    */ 
/*    */   static getVin()
/*    */   {
/* 51 */     return this.Vin;
/*    */   }
/*    */ 
/*    */   static getUnixTime()
/*    */   {
/* 60 */     return this.unixTime;
/*    */   }
/*    */ }
/*    */ // package com.iosix.eldblelib;
import {EldDataRecord} from './EldDataRecord'
/*    */ 
/*    */ export class EldCachedDataRecord
/*    */ {
/*    */   seqNum;
/*    */   recType;
/*    */ 
/*    */   static EldCachedDataRecord()
/*    */   {
/* 17 */     this.recType = EldCachedDataRecordTypes.ELD_CACHED_DATA_RECORD_NONE;
/* 18 */     this.seqNum = -1;
/*    */   }
/*    */ 
/*    */   static EldCachedDataRecord(broadcastData)
/*    */   {
/* 23 */     //EldDataRecord.EldDataRecord(broadcastData);
/*    */   }
/*    */ 
/*    */   static getSeqNum()
/*    */   {
/* 33 */     return this.seqNum;
/*    */   }
/*    */ }
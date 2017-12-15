import react from 'react';
import { EldCachedDataRecord } from './EldCachedDataRecord';
/*    */ 
export class EldCachedPoweronRecord
/*    */ {

            hardBoots;
            crashes;
            unixTime;
/*    */ 
/*    */   static EldCachedPoweronRecord()
/*    */   {
/* 15 */     this.recType = EldCachedDataRecordTypes.ELD_CACHED_POWERON_RECORD;
/*    */   }
/*    */ 
/*    */   static EldCachedPoweronRecord(eldData)
/*    */   {
/* 20 */     //EldCachedDataRecord.EldCachedDataRecord(eldData);
/*    */ 
/* 22 */     dataList = eldData.split(",");
/*    */     try
/*    */     {
/* 28 */       this.hardBoots = parseInt(dataList[1]);
/*    */     }
/*    */     catch (error)
/*    */     {
/* 32 */       this.hardBoots = 0;
/*    */     }
/*    */ 
/*    */     try
/*    */     {
/* 37 */       this.crashes = parseInt(dataList[2]);
/*    */     }
/*    */     catch (error)
/*    */     {
/* 41 */       this.crashes = 0;
/*    */     }
/*    */     try
/*    */     {
/* 45 */       this.unixTime = parseLong(dataList[3]);
/*    */     }
/*    */     catch (error)
/*    */     {
/* 49 */       this.unixTime = 0;
/*    */     }
/*    */     try
/*    */     {
/* 53 */       this.seqNum = parseInt(dataList[4]);
            // TODO: replace this .replaceAll("\r\n", ""));
/*    */     }
/*    */     catch (error)
/*    */     {
/* 57 */       this.seqNum = 0;
/*    */     }
/*    */   }
/*    */ 
/*    */   static getHardBoots()
/*    */   {
/* 68 */     return this.hardBoots;
/*    */   }
/*    */ 
/*    */   static getCrashes()
/*    */   {
/* 77 */     return this.crashes;
/*    */   }
/*    */ 
/*    */   static getEventTime()
/*    */   {
/* 86 */     return this.unixTime;
/*    */   }
/*    */ }
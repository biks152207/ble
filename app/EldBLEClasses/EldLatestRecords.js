/*    */ //package com.iosix.eldblelib;
/*    */ 
/*    */ export class EldLatestRecords
/*    */ {
/*    */   latestBufferRec;
/*    */   latestDataRec;
/*    */   latestCachedDataRec;
/* 11 */ //  static EldLatestRecords instance = null;
/*    */ 
/*    */   //static EldLatestRecords() {
/* 14 */   //  this.latestBufferRec = new EldBufferRecord();
/* 15 */     //this.latestDataRec = new EldDataRecord();
/* 16 */     //this.latestCachedDataRec = new EldCachedDataRecord();
/*    */   //}
/*    */ 
/*    */   static updateBufferRecord(buffRec)
/*    */   {
/* 22 */     this.latestBufferRec = buffRec;
/*    */   }
/*    */ 
/*    */   static updateDataRecord(dataRec)
/*    */   {
/* 28 */     this.latestDataRec = dataRec;
/*    */   }
/*    */   static updateCachedDataRecord(dataRec) {
/* 31 */     this.latestCachedDataRec = dataRec;
/*    */   }
/*    */ 
/*    */   static getLastDataRecord() {
/* 35 */     return this.latestDataRec;
/*    */   }
/*    */ 
/*    */   static getLastBufferRecord()
/*    */   {
/* 40 */     return this.latestBufferRec;
/*    */   }
/*    */   static getLastCachedDataRec() {
/* 43 */     return this.latestCachedDataRec;
/*    */   }
/*    */ 
/*    */ //  public static EldLatestRecords getInstance() {
/* 47 */ //    if (instance == null)
/*    */ //    {
/* 49 */ //      instance = new EldLatestRecords();
/* 50 */ //      return instance;
/*    */ //    }
/* 52 */ //    return instance;
/*    */ //  }
/*    */ }
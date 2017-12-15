/*    */// package com.iosix.eldblelib;
//import EldCachedDataRecordTypes from './EldCachedDataRecordTypes'
import {EldLatestRecords} from './EldLatestRecords'
import {EldCachedPoweronRecord} from './EldCachedPoweronRecord'
import {EldCachedEngineonRecord} from './EldCachedEngineonRecord'
import {EldCachedEngineoffRecord} from './EldCachedEngineoffRecord'

/*    */ // ProcessEldCachedDataRecord.IdentifyCachedRecordType
/*    */ export class ProcessEldCachedDataRecord
/*    */ {
    
/*    */   static IdentifyCachedRecordType(eldData)
/*    */   {
            var EldCachedDataRecordTypes =
            {
                ELD_CACHED_DATA_RECORD_NONE:0,
                ELD_CACHED_ENGINEOFF_RECORD:1,
                ELD_CACHED_ENGINEON_RECORD:2,
                ELD_CACHED_NOT_FOUND3:3,
                ELD_CACHED_PERIODIC_RECORD:4,
                ELD_CACHED_POWERON_RECORD:5,
                ELD_CACHED_UNKNOWN:6,
            }
            let dataRec;
/* 12 */     if (eldData.indexOf("Record: Poweron") == 0)
/*    */     {
/* 14 */       dataRec = EldCachedPoweronRecord.EldCachedPoweronRecord(eldData);
/* 15 */       EldLatestRecords.updateCachedDataRecord(dataRec);
               
/* 16 */       return EldCachedDataRecordTypes.ELD_CACHED_POWERON_RECORD;
/*    */     }
/* 18 */     if (eldData.indexOf("Record: Engineon") == 0)
/*    */     {
/* 20 */       dataRec = EldCachedEngineonRecord.EldCachedEngineonRecord(eldData);
/* 21 */       EldLatestRecords.updateCachedDataRecord(dataRec);
/* 22 */       return EldCachedDataRecordTypes.ELD_CACHED_ENGINEON_RECORD;
/*    */     }
/* 24 */     if (eldData.indexOf("Record: Engineoff") == 0)
/*    */     {
/* 26 */       dataRec = EldCachedEngineoffRecord.EldCachedEngineoffRecord.EldCachedEngineoffRecord(eldData);
/* 27 */       EldLatestRecords.getInstance().updateCachedDataRecord(dataRec);
/* 28 */       return EldCachedDataRecordTypes.ELD_CACHED_ENGINEOFF_RECORD;
/*    */     }
/* 30 */     if (eldData.indexOf("Record: Periodic") == 0)
/*    */     {
/* 32 */       dataRec = EldCachedEngineoffRecord.EldCachedEngineoffRecord(eldData);
/* 33 */       EldLatestRecords.updateCachedDataRecord(dataRec);
/* 34 */       return EldCachedDataRecordTypes.ELD_CACHED_PERIODIC_RECORD;
/*    */     }
/* 36 */     return EldCachedDataRecordTypes.ELD_CACHED_UNKNOWN;
/*    */   }
/*    */ }
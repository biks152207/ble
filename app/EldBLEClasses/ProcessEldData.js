import * as React from 'react'
import {Platform} from 'react-native'

// TODO: figure out how to import this


export class ProcessEldData {
   static IdentifyBroadcastType(eldData)
   {
   /* 
    var EldBroadcastTypes =
    {
        ELD_BUFFER_RECORD:0,
        ELD_CACHED_RECORD:1,
        ELD_DATA_RECORD:2,
        ELD_UNKNOWN :3,
    }
    */ 
    // this removes the sequence number
     console.log("edlData in ProcessEldData.js/ProcessEldData/IdentifyBroadcastType" + eldData)
     if (eldData.indexOf("Data: ") == 0)
     {
       var dataRec;
       // TODO: implement saving of records
       //EldLatestRecords.updateDataRecord(dataRec)
       //return EldBroadcastTypes.ELD_DATA_RECORD
       return 2
     }
     if (eldData.indexOf("Buffer: ") == 0)
     {
       //this.IdentifyBroadcastType(eldData)
     //{
        /* 
          var EldBroadcastTypes =
          {
              ELD_BUFFER_RECORD:0,
              ELD_CACHED_RECORD:1,
              ELD_DATA_RECORD:2,
              ELD_UNKNOWN :3,
          }
          */
          return 0;
        }
    // this removes the sequence number
     console.log("edlData in ProcessEldData.js/ProcessEldData/IdentifyBroadcastType" + eldData)
     if (eldData.indexOf("Data: ") == 0)
     {
       var dataRec;
       // TODO: implement saving of records
       //EldLatestRecords.updateDataRecord(dataRec)
       //return EldBroadcastTypes.ELD_DATA_RECORD
       return 2
     }
     if (eldData.indexOf("Buffer: ") == 0)
     {
       var bufRec;
       //EldLatestRecords.updateBufferRecord(bufRec)
       //return EldBroadcastTypes.ELD_BUFFER_RECORD
       return 0
      }
     if (eldData.indexOf("Record: ") == 0)
     {
      return 1
      // return EldBroadcastTypes.ELD_CACHED_RECORD
     }
     //return EldBroadcastTypes.ELD_UNKNOWN
     return 3
    }
}

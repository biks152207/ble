export class EldBufferRecord
{
                startSeqNo;
    /*     */   endSeqNo;
    /*     */   totRecords;
    /*     */   storageRemaining;
    /*     */   strStartSeqNo;
    /*     */   strEndSeqNo;
    /*     */   strTotRecords;
    /*     */   strStorageRemaining;
    /*     */ 
    /*     */   static EldBufferRecord()
    /*     */   {
    /*  20 */     this.startSeqNo = -1;
    /*  21 */     this.endSeqNo = -1;
    /*  22 */     this.totRecords = 0;
    /*  23 */     this.storageRemaining = 0;
    /*  24 */     this.strStartSeqNo = "";
    /*  25 */     this.strEndSeqNo = "";
    /*  26 */     this.strStorageRemaining = "";
    /*     */   }
    /*     */ 
    /*     */   static EldBufferRecord(broadcastData)
    /*     */   {
    /*  31 */     //super(broadcastData);
    /*  32 */     dataList = broadcastData.split(",");
    /*  33 */     dataList[0] = dataList[0].replace("Buffer: ", "");
    /*  34 */     this.strStartSeqNo = dataList[0];
    /*  35 */     this.strEndSeqNo = dataList[1];
    /*  36 */     this.strTotRecords = dataList[2];
    /*  37 */     this.strStorageRemaining = dataList[3];
    /*     */     try
    /*     */     {
    /*  40 */       this.startSeqNo = parseInt(this.strStartSeqNo);
    /*     */     }
    /*     */     catch (localNumberFormatException)
    /*     */     { 
                    console.log(localNumberFormatException)
    /*     */     }
    /*     */ 
    /*     */     try
    /*     */     {
    /*  48 */       this.endSeqNo = parseInt(this.strEndSeqNo);
    /*     */     }
    /*     */     catch (localNumberFormatException)
    /*     */     {
                    console.log(localNumberFormatException)
    /*     */     }
    /*     */ 
    /*     */     try
    /*     */     {
    /*  56 */       this.totRecords = parseInt(this.strTotRecords);
    /*     */     }
    /*     */     catch (localNumberFormatException)
    /*     */     {
                    console.log(localNumberFormatException)
    /*     */     }
    /*     */ 
    /*     */     try
    /*     */     {
    /*  64 */       this.storageRemaining = parseInt(this.strStorageRemaining);
    /*     */     }
    /*     */     catch (localNumberFormatException)
    /*     */     {
                    console.log(localNumberFormatException)
    /*     */     }
                return this
    /*     */   }
    /*     */ 
    /*     */   static getStartSeqNo()
    /*     */   {
    /*  79 */     return this.startSeqNo;
    /*     */   }
    /*     */ 
    /*     */   static getEndSeqNo()
    /*     */   {
    /*  88 */     return this.endSeqNo;
    /*     */   }
    /*     */ 
    /*     */   static getTotRecords()
    /*     */   {
    /*  97 */     return this.totRecords;
    /*     */   }
    /*     */ 
    /*     */   static getStorageRemaining()
    /*     */   {
    /* 106 */     return this.storageRemaining;
    /*     */   }
}
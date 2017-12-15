import react from 'react';
import { EldBroadcast } from './EldBroadcast';


/*     */ export class EldDataRecord
/*     */ {
/*     */   engineState;
/*     */   vin;
/*     */   rpm;
/*     */   speed;
/*     */   odometer;
/*     */   tripDistance;
/*     */   engineHours;
/*     */   tripHours;
/*     */   voltage;
/*     */   gpsDateTime;
/*     */   lattitude;
/*     */   longitude;
/*     */   gpsSpeed;
/*     */   course;
/*     */   numSats;
/*     */   mslAlt;
/*     */   dop;
/*     */   sequence;
/*     */   firmwareVersion;
/*     */
/*     */   static EldDataRecord()
/*     */ {
    var EldEngineStates =
    {
        ENGINE_OFF:0,
        ENGINE_ON:1,
    }

/*  39 */     this.engineState = EldEngineStates.ENGINE_OFF;
/*  40 */     this.vin = "";
/*  41 */     this.rpm = 0.0;
/*  42 */     this.speed = 0.0;
/*  43 */     this.odometer = 0.0;
/*  44 */     this.tripDistance = 0.0;
/*  45 */     this.engineHours = 0.0;
/*  46 */     this.tripHours = 0.0;
/*  47 */     this.voltage = 0.0;
/*  48 */     this.gpsDateTime = '00/00/0000';
/*  49 */     this.lattitude = 0.0;
/*  50 */     this.longitude = 0.0;
/*  51 */     this.gpsSpeed = 0;
/*  52 */     this.course = 0;
/*  53 */     this.numSats = 0;
/*  54 */     this.mslAlt = 0;
/*  55 */     this.dop = 0.0;
/*  56 */     this.sequence = 0;
/*  57 */     this.firmwareVersion = "";
        /*     */
    }
/*     */
/*     */   static EldDataRecord(broadcastData)
/*     */ {
    var EldEngineStates =
    {
        ENGINE_OFF:0,
        ENGINE_ON:1,
    }
/*  64 */     //EldBroadcast.EldBroadcast(broadcastData);
/*     */
/*  66 */     if (true) {
/*  67 */       dataList = broadcastData.split(",");
/*     */
/*  70 */       dataList[0] = dataList[0].replace("Data: ", "");
/*     */       try
/*     */ {
/*  73 */         if (dataList[0].charAt(0) == '1')
/*  74 */           this.engineState = EldEngineStates.ENGINE_ON;
/*  75 */         else this.engineState = EldEngineStates.ENGINE_OFF;
                /*     */
            }
/*  77 */       catch (exception) {
                console.log(exception)
                this.engineState = EldEngineStates.ENGINE_OFF;
            }
/*     */
/*     */
/*  80 */       this.vin = dataList[1];
/*     */       try {
/*  82 */         this.rpm = parseFloat(dataList[2]);
                /*     */
            } catch (error) {
                console.log(error);
/*  84 */         this.rpm = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/*  88 */         this.speed = parseFloat(dataList[3]);
                /*     */
            } catch (error) {
                console.log(error);
/*  90 */         this.speed = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/*  94 */         this.odometer = parseFloat(dataList[4]);
                /*     */
            } catch (error) {
/*  96 */           console.log(error);
                this.odometer = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/* 100 */         this.tripDistance = parseFloat(dataList[5]);
                /*     */
            } catch (error) {
                console.log(error);
/* 102 */         this.tripDistance = 0.0;
                /*     */
            }
/*     */
/*     */       try
/*     */ {
/* 107 */         this.engineHours = parseFloat(dataList[6]);
                /*     */
            } catch (error) {
                console.log(error);
/* 109 */         this.engineHours = 0.0;
                /*     */
            }
/*     */
/*     */       try
/*     */ {
/* 114 */         this.tripHours = parseFloat(dataList[7]);
                /*     */
            } catch (error) {
/* 116 */         console.log(error);
                this.tripHours = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/* 120 */         this.voltage = parseFloat(dataList[8]);
                /*     */
            } catch (error) {
                console.log(error);
/* 122 */         this.voltage = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/* 126 */         //SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yy HH:mm:ss");
                    // TODO: parse into data format
/* 127 */         //this.gpsDateTime = parse(dataList[9] + " " + dataList[10]);
                    this.gpsDateTime = Date.parse(dataList[9] + " " + dataList[10]);
                    console.log(this.gpsDateTime);
                /*     */
            } catch (error) {
                console.log(error);
                console.log('datatime: ' + dataList[9] + ' ' + dataList[10])
/* 129 */         this.gpsDateTime = new Date();
                /*     */
            }
/*     */
/*     */       try
/*     */ {
/* 135 */         this.lattitude = parseFloat(dataList[11]);
                /*     */
            } catch (error) {
                console.log(error);
/* 137 */         this.lattitude = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/* 141 */         this.longitude = parseFloat(dataList[12]);
                /*     */
            } catch (error) {
                console.log(error);
/* 143 */         this.longitude = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/* 147 */         this.gpsSpeed = parseInt(dataList[13]);
                /*     */
            } catch (error) {
                console.log(error);
/* 149 */         this.gpsSpeed = 0;
                /*     */
            }
/*     */       try
/*     */ {
/* 153 */         this.course = parseInt(dataList[14]);
                /*     */
            } catch (error) {
/* 155 */         console.log(error);
                this.course = 0;
                /*     */
            }
/*     */       try
/*     */ {
/* 159 */         this.numSats = parseInt(dataList[15]);
                /*     */
            } catch (error) {
/* 161 */         this.numSats = 0;
                console.log(error);
                /*     */
            }
/*     */       try
/*     */ {
/* 165 */         this.mslAlt = parseInt(dataList[16]);
                /*     */
            } catch (error) {
/* 167 */       console.log(error);
                this.mslAlt = 0;
                /*     */
            }
/*     */       try
/*     */ {
/* 171 */         this.dop = parseFloat(dataList[17]);
                /*     */
            } catch (error) {
                console.log(error);
/* 173 */         this.dop = 0.0;
                /*     */
            }
/*     */       try
/*     */ {
/* 177 */         this.sequence = parseInt(dataList[18]);
                /*     */
            } catch (error) {
/* 179 */       console.log(error);
                this.dop = 0.0;
                /*     */
            }
/*     */       // TODO: replace replace all...
/* 182 */       this.firmwareVersion = dataList[19]
                //.replaceAll("\\r\\n", "");
            /*     */
        }
        return this;
        /*     */
    }
/*     */
/*     */   static getEngineState()
/*     */ {
/* 224 */     return this.engineState;
        /*     */
    }
/*     */
/*     */   static getVin()
/*     */ {
/* 230 */     return this.vin;
        /*     */
    }
/*     */
/*     */   static getRpm()
/*     */ {
/* 236 */     return this.rpm;
        /*     */
    }
/*     */
/*     */   static getSpeed()
/*     */ {
/* 242 */     return this.speed;
        /*     */
    }
/*     */
/*     */  static getOdometer()
/*     */ {
/* 248 */     return this.odometer;
        /*     */
    }
/*     */
/*     */  static getTripDistance()
/*     */ {
/* 254 */     return this.tripDistance;
        /*     */
    }
/*     */
/*     */ static  getEngineHours()
/*     */ {
/* 260 */     return this.engineHours;
        /*     */
    }
/*     */
/*     */ static  getTripHours()
/*     */ {
/* 266 */     return this.tripHours;
        /*     */
    }
/*     */
/*     */  static getVoltage()
/*     */ {
/* 272 */     return this.voltage;
        /*     */
    }
/*     */
/*     */  static getGpsDateTime()
/*     */ {
/* 279 */     return this.gpsDateTime;
        /*     */
    }
/*     */
/*     */  static getLattitude()
/*     */ {
/* 285 */     return this.lattitude;
        /*     */
    }
/*     */
/*     */  static getLongitude()
/*     */ {
/* 291 */     return this.longitude;
        /*     */
    }
/*     */
/*     */  static getGpsSpeed()
/*     */ {
/* 297 */     return this.gpsSpeed;
        /*     */
    }
/*     */
/*     */ static  getCourse()
/*     */ {
/* 303 */     return this.course;
        /*     */
    }
/*     */
/*     */ static  getNumSats()
/*     */ {
/* 309 */     return this.numSats;
        /*     */
    }
/*     */
/*     */ static  getMslAlt()
/*     */ {
/* 315 */     return this.mslAlt;
        /*     */
    }
/*     */
/*     */ static  getDop()
/*     */ {
/* 321 */     return this.dop;
        /*     */
    }
/*     */
/*     */ static  getSequence()
/*     */ {
/* 327 */     return this.sequence;
        /*     */
    }
/*     */
/*     */  static getFirmwareVersion()
/*     */ {
/* 333 */     return this.firmwareVersion;
        /*     */
    }
    /*     */
}
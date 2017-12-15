
import BleManager from 'react-native-ble-manager'
import Toast from 'react-native-simple-toast'
import {stringToBytes} from 'convert-string'
import {NativeAppEventEmitter,
        NativeEventEmitter,
        NativeModules} from 'react-native'
import * as bleConfig from './bleConfig'
const firebase = require("firebase");
import firebaseApp from './../../config/firebase.js';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import react from 'react-native'
/**
 * The Ble class is responsible for handling connecting to peripherals
 * and subscribing to characteristics.  These actions all occur asynchronously
 * through both promises and events.  The user of this class provides callback
 * functions to the constructor to be executed later on for their respective events.
 */
 export class Ble {

    //  public BleManagerModule = NativeModules.BleManager
     bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager)
     eldDevice = NativeModules.BleManager.peripheral
     scanningMessage = 'Scanning with Dummy Data v5'
     seqNumberOut = 0;
     bufferStart = '';
     bufferEnd = '';
     currentBuffer = -1;

     /**
      * Scanning Interval Id used in the setInterval for continuous scanning.
      * Use this ID to clear the interval once scanning has completed or the user has stopped.
      */
     // private scanningIntervalId: number
     scanningIntervalId;
     /**
      * The constructor for the Ble class.
      * @param onConnect A function to call when a device has been connected to.
      * @param onData A function to call when data is received from a peripheral.
      * @param onError A function to call when an error is encountered.
      */
     constructor(onData) {
         // TODO pass in configuration object so that we can have different configuration based on OS
         //
         // Listen for the native BLE discover event.
         this.bleManagerEmitter
             .addListener('BleManagerDiscoverPeripheral', this.handlePeripheralDiscovery.bind(this) )

         // Listen for the native BLE update value event.
         NativeAppEventEmitter
            .addListener('BleManagerDidUpdateValueForCharacteristic', onData)

            this.stop = this.stop.bind(this);
            this.getNotificationData = this.getNotificationData.bind(this);
            this.logConsole = this.logConsole.bind(this);
            // this.onError = this.onError.bind(this);
            this.seqNumberOut = 0;
            // this.eldDevice = this.eldDevice.bind(this)
     }

     logConsole(data){
            //   firebase.database().ref('logConsole').push({
            //         date:moment().format('LLL'),
            //         msg: JSON.stringify(data),
            //        })
            console.log(data);
     }

     /**
      * The start function is called by the user.  It starts the Native BLE
      * service in the background, and once that begins it will kickoff the scanning process.
      * This method is called first, after construction of the class.
      */
     startBLE() {
         this.logConsole('BLE started')
         BleManager.start({showAlert: false})
         this.scan()
     }

     // TODO: add disconnect from bluetooth

     /**
      * The stop method is required for cleaning up the Bluetooth connections.
      * This includes stopping scanning, and disconnecting from any connected peripherals.
      */
     stop() {
         this.stopScanning()
     }

     /**
      * Write to the ELD
      *
      * Takes a message to write and a sequence number
      *
      * @param message the message we'd like to send to the Data characteristic
      * @param seqNumber the sequence number we want to address
      */
     writeCharacteristic(myMessage){
         let fullString = this.seqNumberOut + myMessage + '\\r\\n'
         let stringBytes = stringToBytes(fullString);
         
         BleManager.write(this.eldDevice.id, bleConfig.dataService,
             bleConfig.dataCharacteristic.characteristicUUID, stringBytes)
             .then(() => {
                 // Success code
                 this.seqNumberOut++;
                 this.logConsole('Write: ' + myMessage);
                 Toast.show('Write: ' + myMessage, Toast.SHORT);
               })
               .catch((error) => {
                 // Failure code
                 this.logConsole('Write Error: ' + error);
               })
     }

     /**
      * Request a record by sequence number
      */
     requestRecord(seqNumber) {
         this.writeCharacteristic('REQUEST,' + seqNumber);
     } 

     /**
      * Delete a record by sequence number
      * note: can only delete the oldest record according
      * to the documentation

      */
     deleteRecord(seqNumber) {
         this.writeCharacteristic('DELETE,' + seqNumber);
     }

     /**
      * Delete a record by sequence number
      */
     deleteRange(start, end) {
        for(let i = startSeq; i <= endSeq; i++){
         this.writeCharacteristic('DELETE,' + i.toString);
        }
     }

     /**
      * Start Notifications for rpm service. This is called once we have connected to our services.
      * TODO: add error handling
      * @param peripheral the peripheral whose characteristic we want to read
      */
     getNotificationData(peripheral) {
         BleManager.startNotification(peripheral.id, bleConfig.dataService, bleConfig.dataCharacteristic.characteristicUUID)
         .then(() => {
             // Success code
             Toast.show('Notification started: ', Toast.SHORT)

             this.logConsole('Notification started')
           })
           .catch((error) => {
             // Failure code
             this.logConsole('Notification error: ' + error)
             Toast.show('Notification error: '+ error, Toast.SHORT)
             return error
           })
           return Promise.resolve()
     }


     /**
      * Read device  characterisitcs
      * @param peripheral the peripheral whose characteristic we want to read
      */
     readCharacteristicDevice(peripheral) {
         BleManager.read(peripheral.id, bleConfig.dataService, bleConfig.deviceCharacteristic.characteristicUUID)
         .then((readData) => {
             // Success code
             this.logConsole('Read: ' + readData)
             // return read data
           })
           .catch((error) => {
             // Failure code
             this.logConsole(error)
             Toast.show('Read Device error: '+ error, Toast.SHORT)
           })
           return Promise.resolve()
     }
     /**
      * Read appearance characterisitcs
      * @param peripheral the peripheral whose characteristic we want to read
      */
     readCharacteristicAppearance(peripheral) {
         BleManager.read(peripheral.id, bleConfig.dataService, bleConfig.appearanceCharacteristic.characteristicUUID)
         .then((readData) => {
             // Success code
             this.logConsole('Read: ' + readData)
             // return read data
           })
           .catch((error) => {
             // Failure code
             this.logConsole(error)
             Toast.show('Read appearance error: '+ error, Toast.SHORT)
           })
           return Promise.resolve()
     }

     /**
      * Read central address characterisitcs
      * @param peripheral the peripheral whose characteristic we want to read
      */
     readCharacteristicAddress(peripheral) {
         BleManager.read(peripheral.id, bleConfig.dataService, bleConfig.centralAddressCharacteristic.characteristicUUID)
         .then((readData) => {
             // Success code
             this.logConsole('Read: ' + readData)
             // return read data
           })
           .catch((error) => {
             // Failure code
             this.logConsole(error)
             Toast.show('Read address error: '+ error, Toast.SHORT)
           })
           return Promise.resolve()
     }
     /**
      * The connect method attempts to connect to the specified peripheral.
      * It is called in the handlePeripheralDiscovery callback for those that
      * match the specified conditions.  If the connection completes successfully,
      * notifications will begin on the specified characteristics. If it fails, the onError
      * callback is executed.
      * @param peripheral The peripheral to attempt connection to.
      */
     connect(peripheral) {
        BleManager.connect(peripheral.id)
         .then(() => {
             // Alert the user that a peripheral has been connected to.
             this.stop();
             BleManager.retrieveServices(peripheral.id).then(()=>{
                this.getNotificationData(peripheral);
             }).catch((error)=>{
                 console.log('Error: ' + error);
             })
             this.eldDevice = peripheral;
         });
     }

     /**
      * Scan for Bluetooth Peripherals.  The native library will listen for 5 seconds at a time.
      * This method will execute the native scan every 10 seconds, leaving approximately 5 seconds breaks
      * in between calls.  This method is executed in the promise resolution of the start method.
      */
     scan() {
         // TODO: try BleManager.scan with allow duplicates set to false
         this.scanningIntervalId = setInterval( () => BleManager.scan([], 5, true), 10000)
         this.logConsole('Scan started')
         Toast.show(this.scanningMessage, Toast.SHORT)
     }

     /**
      * The Stop scanning method stops scanning for Bluetooth peripheral devices.
      * It clears the scanning interval and stops the native BLE scannner.
      */
     stopScanning() {
         clearInterval(this.scanningIntervalId)
         BleManager.stopScan()
         .catch((error) => {
            //  this.onError(error)
             Toast.show('Error stopping scan: ' + error, Toast.SHORT)
         })
         .then(() => {
             this.logConsole('Scan stopped')
         })
     }

     // TODO: Use mac to connect to a particular device
     // Connection need to set bitmask

     /**
      * The handlePeripheralDiscovery method is a callback that is executed
      * when a peripheral is discovered while scanning.  It checks the peripheral
      * against conditions to evaluate if it is our device.  If so, it will attempt
      * to connect.
      * @param peripheral The peripheral that was discovered.
      */
     handlePeripheralDiscovery(peripheral) {
         this.logConsole(bleConfig.deviceName)
         this.logConsole(peripheral.name + ' found')
         if (peripheral.name == bleConfig.deviceName) {
             Toast.show(' found: ' + peripheral.name, Toast.SHORT)
             this.connect(peripheral)
         }
     }
 }

import ImagePicker from 'react-native-image-picker';
import { HTTP } from './HTTP';
import { Platform } from 'react-native';
let options = {title: 'Scan the document',
takePhotoButtonTitle: null,
chooseFromLibraryButtonTitle: null,
customButtons: [
  {name: 'scanner', title: 'Open Scanner'},
],
// storageOptions: {
//   skipBackup: true,
//   path: 'images'
// }
};

if(Platform.os!=='ios'){
  delete options.takePhotoButtonTitle;
  delete options.chooseFromLibraryButtonTitle;
  delete options.customButtons;
}

export  function Uploader() {
  return new Promise((resolve, reject) => {
    // alert('m')
    ImagePicker.showImagePicker(options, (response) => {
      // console.log(JSON.stringify(response));
      resolve(response);
    });
  });
}

export function fileUploader(data, boundary) {
  return new Promise((resolve, reject) => {
    console.log(data);
     return HTTP('put', '/driver/uploadProofOfDelivery', data, {'Content-Type':`multipart/form-data`})
      .then((response) => {
        console.log(response);
        resolve(response);
      })
  })
}

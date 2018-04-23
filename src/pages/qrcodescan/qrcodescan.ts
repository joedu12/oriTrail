  import { Component } from '@angular/core';

  import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
 

  

  @Component({
    selector: 'qrcodescan',
    templateUrl: 'qrcodescan.html'
  })
  export class QrcodeScanPage {



    
    constructor(private qrScanner : QRScanner) {
      
    } 
 
    /**
     * Scan function
     */
    qrscanner() {
 
      this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          alert('authorized');
 
    
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            alert(text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // select front camera 
          //this.qrScanner.useFrontCamera();

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show(); 

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

    }
  }
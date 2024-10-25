import {Component, OnInit} from '@angular/core';
import {BrowserMultiFormatReader, NotFoundException} from "@zxing/library";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  codeReader: BrowserMultiFormatReader;
  public scannedCode: string | null = null;
  checkCamera = false;
  constructor() {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit(): void {
  }

  startScanning(): void {
    // this.checkCamera = true;
    this.codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
      if (result) {
        // @ts-ignore
        this.scannedCode = result.text;
        console.log('Scanned code:', this.scannedCode);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    });
  }

  stopScanning(): void {
    // this.checkCamera = false;
    this.codeReader.reset();
  }

}

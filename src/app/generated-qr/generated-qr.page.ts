import { Component, OnInit } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerStrapiService } from '../services/server-strapi.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Component({
  selector: 'app-generated-qr',
  templateUrl: './generated-qr.page.html',
  styleUrls: ['./generated-qr.page.scss'],
})
export class GeneratedQrPage implements OnInit {
  // https://stackoverflow.com/questions/52145130/how-to-build-browser-version-in-ionic-4
  // This works for me: ionic build --prod --public-url=/app/
  // https://forum.ionicframework.com/t/how-to-build-index-html-with-custom-title-and-base-href/189369

  name = 'Angular PDF';
  ibadahId: any;
  nikId: any;
  baseUrl: string = window.location.host;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private server: ServerStrapiService,
    private printer: Printer
  ) {
    ////
    this.activatedroute.paramMap.subscribe((params) => {
      this.nikId = params.get('nikId');
      this.ibadahId = params.get('ibadahId');
      console.log('nik ID :',this.nikId);
      console.log('ibadah ID :',this.ibadahId);
    });
    ////
  }
// https://www.c-sharpcorner.com/article/how-to-export-pdf-in-angular/
  ngOnInit() {
    this.value = this.baseUrl + this.router.url;
    console.log(this.value);
  }
}

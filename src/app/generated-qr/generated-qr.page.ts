import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Router,NavigationEnd  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerStrapiService } from '../services/server-strapi.service';

@Component({
  selector: 'app-generated-qr',
  templateUrl: './generated-qr.page.html',
  styleUrls: ['./generated-qr.page.scss'],
})
export class GeneratedQrPage implements OnInit {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;

  constructor( private router: Router, private http: HttpClient, private server: ServerStrapiService) { 
    console.log(router.url);
    
    this.value = this.server.endpoint + router.url
  }

  ngOnInit() {
  }

}

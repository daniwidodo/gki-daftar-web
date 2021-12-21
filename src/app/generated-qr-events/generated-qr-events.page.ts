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
  selector: 'app-generated-qr-events',
  templateUrl: './generated-qr-events.page.html',
  styleUrls: ['./generated-qr-events.page.scss'],
})
export class GeneratedQrEventsPage implements OnInit {
  name = 'Angular PDF';
  eventsId: any;
  nikId: any;
  baseUrl: string = window.location.href;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;

  endPoint = 'http://gkisulsel.org/regibadah';

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private server: ServerStrapiService,
    private printer: Printer
  ) {

    this.activatedroute.paramMap.subscribe((params) => {
      this.nikId = params.get('nikId');
      this.eventsId = params.get('eventsId');
      console.log('nik ID :',this.nikId);
      console.log('ibadah ID :',this.eventsId);
    });

  }

  ngOnInit() {
    const verifPage = this.endPoint + '/verif-events/' + this.nikId + '/' + this.eventsId;
    this.value = verifPage ;
    console.log(this.value);
  }

}

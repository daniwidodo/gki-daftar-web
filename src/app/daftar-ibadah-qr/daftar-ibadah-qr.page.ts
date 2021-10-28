import { Component, OnInit } from '@angular/core';
import { ServerStrapiService } from '../services/server-strapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-daftar-ibadah-qr',
  templateUrl: './daftar-ibadah-qr.page.html',
  styleUrls: ['./daftar-ibadah-qr.page.scss'],
})
export class DaftarIbadahQrPage implements OnInit {
  ibadahs: any = [];
  userId: any;
  namaLengkap: any;
  
  constructor(
    private server: ServerStrapiService,
    private activatedroute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getIbadahFromServer();
    this.activatedroute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      console.log(this.userId);
      this.getUser();
    });
  }

  getIbadahFromServer() {
    this.server.getAllIbadah().subscribe((response) => {
      console.log(response);
      this.ibadahs = response;
      //this.ibadahId = response.id;
    });
  }

  getUser() {
    this.httpClient
      .get(this.server.endpoint + '/data-jemaats' + '?nik=' + this.userId)
      .subscribe((response) => {
        this.namaLengkap = response[0].namaLengkap;
        console.log(response);
      });
  }

  generateQrToNextPage(ibadahId) {
    console.log(this.userId, ibadahId);
    this.router.navigate(['/generated-qr', this.userId, ibadahId]);
  }
}

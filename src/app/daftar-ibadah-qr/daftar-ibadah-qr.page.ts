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
  sisaQuota: any;

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
      this.sisaQuota = response[0].quota -1 ;
      console.log(this.sisaQuota );
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

    // const updateQuota: FormData = new FormData();
    // updateQuota.append('quota', this.sisaQuota);

    // console.log(updateQuota);

    this.httpClient.put( this.server.endpoint + '/ibadahs/' + ibadahId,  {
      quota:  this.sisaQuota
    })
    .subscribe( (response) => {
      console.log(response);
    });
    this.router.navigate(['/generated-qr', this.userId, ibadahId]);
  }
}

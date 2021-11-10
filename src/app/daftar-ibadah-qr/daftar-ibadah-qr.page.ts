import { Component, OnInit } from '@angular/core';
import { ServerStrapiService } from '../services/server-strapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-daftar-ibadah-qr',
  templateUrl: './daftar-ibadah-qr.page.html',
  styleUrls: ['./daftar-ibadah-qr.page.scss'],
})
export class DaftarIbadahQrPage implements OnInit {
  ibadahs: any;
  userID: any;
  namaLengkap: any;
  sisaQuota: any;
  userData: any;
  getCurrentUserID: any;
  sudahPilihIbadah: any;
  allDataJemaats: any;
  ibadahId: any;
  nikId: any;
  arrayDataJemaats: any;
  jumlahRelasiDataJemaat: any;
  totalSisaQuota: any;
  kuotaHabis = false;
  sudahIbadah: any;
  dataIbadahs: any;
  totalQuota: any;
  jemaatLength: any;
  mapQuota: any;
  namaIbadah: any;
  jamIbadah: any;

  constructor(
    private server: ServerStrapiService,
    private activatedroute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params) => {
      this.userID = params.get('id');
      //console.log(this.userId);
    });

    this.getUser();
    this.getIbadahFromServer();
    //  if (this.sudahIbadah === true){
    //     console.log('sudah ibadah');
    //     // this.router.navigate(['/daftar-ibadah-qr']);
    //   }
  }

  getIbadahFromServer() {
    console.log('<----------------->');
    this.httpClient
      .get(this.server.endpoint + '/api/ibadahs')
      .subscribe((response) => {
        const ibadahs: any = response;
        console.log(ibadahs);

        this.dataIbadahs = ibadahs.data;
        console.log(this.dataIbadahs);

        const quota = this.dataIbadahs.quota;
        this.ibadahId = this.dataIbadahs.id;
        this.namaIbadah = this.dataIbadahs.namaIbadah;
        this.jamIbadah = this.dataIbadahs.jam;

        ////
        const jumlahRelasiDataJemaat = this.dataIbadahs.jemaat.length;
        console.log('lenght jemaat :', jumlahRelasiDataJemaat);

        ////

        this.sisaQuota = quota - jumlahRelasiDataJemaat;
        console.log('sisa quota :', this.sisaQuota);

        ///
        if (this.totalSisaQuota <= 0) {
          this.kuotaHabis = true;
        } else {
          this.kuotaHabis = false;
        }

        this.arrayDataJemaats = this.dataIbadahs.jemaat;
        this.sudahIbadah = this.arrayDataJemaats
          .map((x) => x.id)
          .includes(this.getCurrentUserID);
        console.log('sudah ibadah: ', this.sudahIbadah);
        // eslint-disable-next-line eqeqeq
        if (this.sudahIbadah == true) {
          this.router.navigate(['/generated-qr', this.userID, this.ibadahId]);
        }
        ///////////
      });
  }

  getUser() {
    this.httpClient
      .get(this.server.endpoint + '/api/jemaats/' + this.userID)
      .subscribe(
        (response) => {
          this.userData = response;
          ////
          this.namaLengkap = this.userData.data.namaLengkap;
          this.nikId = this.userData.data.nik;
          this.getCurrentUserID = this.userData.data.id;
          ////
          console.log('data lengkap user:', this.userData);
          console.log('nama lengkap :', this.namaLengkap);
          console.log('data user id:', this.getCurrentUserID);
          // console.log('data sudah pilih ibadah:', this.sudahPilihIbadah);
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }

  checkUserSudahPilihIbadah() {
    //this.httpClient.get()
  }

  generateQrToNextPage(ibadahId) {
    console.log(this.userID, ibadahId);

    this.httpClient
      .put(this.server.endpoint + '/api/jemaats/' + this.userID, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ibadah_id: ibadahId,
      })
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/generated-qr', this.userID, ibadahId]);
      });
  }
}

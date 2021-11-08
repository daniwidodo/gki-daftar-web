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


        if (this.sudahIbadah == true) {
          this.router.navigate(['/generated-qr', this.userID, this.ibadahId]);
        }


        console.log('<----------------->');
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

        // eslint-disable-next-line @typescript-eslint/naming-convention
        ibadah_id: ibadahId,
      })
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/generated-qr', this.userID, ibadahId]);
      });

    // const updateQuota: FormData = new FormData();
    // updateQuota.append('quota', this.sisaQuota);

    // this.httpClient
    //   .put(this.server.endpoint + '/ibadahs/' + ibadahId, {
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     data_jemaats: this.allDataJemaats,
    //   })
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //       this.router.navigate(['/generated-qr', this.nikId, this.ibadahId]);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {}
    //   );
    // this.router.navigate(['/generated-qr', this.userId, ibadahId]);
  }
}

// this.sisaQuota = response[0].quota - 1;
// this.ibadahId = response[0].id;
// this.allDataJemaats = response[0].data_jemaats.concat({
//   id: this.getCurrentUserID,
// });
// this.jumlahRelasiDataJemaat = response[0].data_jemaats.length;

// ////
// this.arrayDataJemaats = response[0].data_jemaats;
// this.sudahIbadah = this.arrayDataJemaats
//   .map((x) => x.id)
//   .includes(this.getCurrentUserID);
// console.log('sudah ibadah: ', this.sudahIbadah);
// ////
// ////
// this.totalSisaQuota = this.sisaQuota - this.jumlahRelasiDataJemaat;
// console.log('totalSisaQuota:', this.totalSisaQuota);
// if (this.totalSisaQuota <= 0) {
//   this.kuotaHabis = true;
// } else {
//   this.kuotaHabis = false;
// }

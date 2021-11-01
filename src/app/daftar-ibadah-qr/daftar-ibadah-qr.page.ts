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
  userData: any;
  getCurrentUserID: any;
  sudahPilihIbadah: any;
  allDataJemaats: any;
  ibadahId: any;
  nikId: any;
  arrayDataJemaats: any = [];
  jumlahRelasiDataJemaat: any;
  totalSisaQuota: any;
  kuotaHabis = false;
  sudahIbadah: any;


  constructor(
    private server: ServerStrapiService,
    private activatedroute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.getIbadahFromServer();
    this.activatedroute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      //console.log(this.userId);
    });

    this.getUser();

    //  if (this.sudahIbadah === true){
    //     console.log('sudah ibadah');
    //     // this.router.navigate(['/daftar-ibadah-qr']);
    //   }
  }

  getIbadahFromServer() {
    this.server.getAllIbadah().subscribe((response) => {


      this.ibadahs = response;
      this.sisaQuota = response[0].quota - 1;
      this.ibadahId = response[0].id;
      this.allDataJemaats = response[0].data_jemaats.concat({
        id: this.getCurrentUserID
      });
      this.jumlahRelasiDataJemaat = response[0].data_jemaats.length;

       ////
       this.arrayDataJemaats = response[0].data_jemaats;
       this.sudahIbadah = this.arrayDataJemaats
         .map((x) => x.id)
         .includes(this.getCurrentUserID);
       console.log('sudah ibadah: ', this.sudahIbadah);
       ////
      ////
      this.totalSisaQuota = this.sisaQuota - this.jumlahRelasiDataJemaat;
      console.log('totalSisaQuota:', this.totalSisaQuota);
      if (this.totalSisaQuota <= 0) {
        this.kuotaHabis = true;
      } else {
        this.kuotaHabis = false;
      }
      ////

      // eslint-disable-next-line eqeqeq
      if (this.sudahIbadah == true){
        console.log('zzz');
        this.router.navigate(['/generated-qr', this.nikId, this.ibadahId]);
      }

      console.log('data lengkap ibadah :', response);
      console.log(this.sisaQuota);
      console.log('ibadah id :', this.ibadahId);
      console.log('concat data jemaats :', this.allDataJemaats);
      console.log('array data jemaats :', this.arrayDataJemaats);
      console.log('jumlah relasi:', this.jumlahRelasiDataJemaat);
    });
  }

  getUser() {
    this.httpClient
      .get(this.server.endpoint + '/data-jemaats' + '?nik=' + this.userId)
      .subscribe((response) => {
        this.userData = response;
        ////
        this.namaLengkap = response[0].namaLengkap;
        if (this.namaLengkap == null) {
          console.log('xxx');
        }

        this.nikId = response[0].nik;
        this.getCurrentUserID = response[0].id;
        ////
        console.log('data lengkap user:', this.userData);
        console.log('data user id:', this.getCurrentUserID);
        console.log('data sudah pilih ibadah:', this.sudahPilihIbadah);
      }, error => {console.log(error); },
      ( )=> { } ) ;
  }

  checkUserSudahPilihIbadah() {
    //this.httpClient.get()
  }

  generateQrToNextPage(ibadahId) {
    console.log(this.userId, ibadahId);

    // const updateQuota: FormData = new FormData();
    // updateQuota.append('quota', this.sisaQuota);

    this.httpClient
      .put(this.server.endpoint + '/ibadahs/' + ibadahId, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        data_jemaats: this.allDataJemaats,
      })
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/generated-qr', this.nikId, this.ibadahId]);
      },
      error => { console.log(error);},
      () => {

      }
      );
    // this.router.navigate(['/generated-qr', this.userId, ibadahId]);
  }
}

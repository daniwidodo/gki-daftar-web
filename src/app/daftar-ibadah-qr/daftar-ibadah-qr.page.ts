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

  sudahTerdaftar = false;
  belumTerdaftar = false;

  nameEvents: any;
  responseEvents: any;
  eventsId: any;
  checkEventsMap = [];
  quotaEvent: any;
  totalQuotaEvent: any;
  totalRelasiX: any;

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
    this.getEvents();
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
        if (this.sudahIbadah === true) {
          this.sudahTerdaftar = true;
        }

        if (this.sudahIbadah === false) {
          this.belumTerdaftar = true;
        }

        console.log('sudah terdaftar', this.sudahTerdaftar);
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

  getEvents() {
    this.httpClient
      .get(this.server.endpoint + '/api/events')
      .subscribe((res: any) => {
        this.responseEvents = res.data;

        // quota
        this.quotaEvent = this.responseEvents.map( x =>  x.quota);
        const totalRelasiEvent = this.responseEvents.map( x => x.jemaats.length);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         this.totalRelasiX = this.quotaEvent.map(function(v, i){
          return v - totalRelasiEvent[i];
        });

        console.log(this.quotaEvent);
        console.log(this.totalRelasiX);



        // eslint-disable-next-line @typescript-eslint/no-shadow
        // const mapEvent = this.responseEvents.map((x) => x.jemaats);

        // const forEvent = mapEvent.forEach((x) =>
        //   // eslint-disable-next-line @typescript-eslint/no-shadow
        //   x.map((x) => x.id).includes(this.getCurrentUserID)
        // );



      });
  }

  updateEvents() {}

  generateQRevents(eventClickId, currentUserId) {
    currentUserId = this.userID;

    this.httpClient
      .put(this.server.endpoint + '/api/events/' + eventClickId, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        currentUserId,
      })
      .subscribe((response) => {
        console.log(response);
        this.router.navigate([
          '/generated-qr-events',
          this.userID,
          eventClickId,
        ]);
      });
    console.log(eventClickId, currentUserId);
  }
}

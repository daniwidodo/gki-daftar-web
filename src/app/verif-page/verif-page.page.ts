import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServerStrapiService } from '../services/server-strapi.service';

@Component({
  selector: 'app-verif-page',
  templateUrl: './verif-page.page.html',
  styleUrls: ['./verif-page.page.scss'],
})
export class VerifPagePage implements OnInit {
  ibadahId: any;
  nikId: any;
  dataJemaat: any;
  dataIbadah: any;
  arrayIdJemaat: any;
  hasilFilter: boolean;
  namaJemaat: any;
  namaIbadah: any;

  verified = false;

  constructor(
    private activatedroute: ActivatedRoute,
    private http: HttpClient,
    private server: ServerStrapiService,
    private loadingCtrl: LoadingController
  ) {
    this.activatedroute.paramMap.subscribe((params) => {
      this.nikId = params.get('nikId');
      this.ibadahId = params.get('ibadahId');
      console.log('nik ID :', this.nikId);
      console.log('ibadah ID :', this.ibadahId);
      //////////////////////////
      this.http
      .get(this.server.endpoint + '/api/ibadahs/' + this.ibadahId)
      .subscribe(async (response) => {
        this.dataIbadah = response;
        this.dataJemaat = this.dataIbadah.data[0].jemaat;
        this.namaIbadah = this.dataIbadah.data[0].namaIbadah;

        ////

        const loading = await this.loadingCtrl.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');

        //////
        this.dataJemaat.filter((x) => {
          this.hasilFilter = this.nikId.includes(x.id);
          console.log(this.hasilFilter);

          if (this.hasilFilter === true) {
            this.verified = true;
          }
        });
        //////

        console.log(response);
        console.log(this.namaIbadah);
        console.log('data ibadah :', this.dataIbadah);
        console.log('data ibadah :', this.dataJemaat);
        console.log('verified :', this.verified);

        //////////////


      });
    });
  }

  ngOnInit() {

    this.http.get( this.server.endpoint + '/api/jemaats/' + this.nikId)
          .subscribe( (user) => {
            console.log(user);
            const userData: any = user;
            this.namaJemaat = userData.data.namaLengkap;

            console.log(userData);
          });

  }
}

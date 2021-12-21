import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServerStrapiService } from '../services/server-strapi.service';

@Component({
  selector: 'app-verif-events',
  templateUrl: './verif-events.page.html',
  styleUrls: ['./verif-events.page.scss'],
})
export class VerifEventsPage implements OnInit {
  ibadahId: any;
  nikId: any;
  dataJemaat: any;
  dataIbadah: any;
  arrayIdJemaat: any;
  hasilFilter: boolean;
  namaJemaat: any;
  namaIbadah: any;

  verified = false;

  constructor(   private activatedroute: ActivatedRoute,
    private http: HttpClient,
    private server: ServerStrapiService,
    private loadingCtrl: LoadingController) {
      this.activatedroute.paramMap.subscribe((params) => {
        this.nikId = params.get('nikId');
        this.ibadahId = params.get('ibadahId');
        console.log('nik ID :', this.nikId);
        console.log('ibadah ID :', this.ibadahId);
        //////////////////////////
        this.http
        .get(this.server.endpoint + '/api/ibadahs/')
        .subscribe(async (response) => {
          this.dataIbadah = response;
          console.log('response :', response);
          this.dataJemaat = this.dataIbadah.data.jemaat;
          console.log('data jemaat :', this.dataJemaat);
          this.namaIbadah = this.dataIbadah.data.namaIbadah;

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



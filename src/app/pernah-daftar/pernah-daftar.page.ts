import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerStrapiService } from '../services/server-strapi.service';

@Component({
  selector: 'app-pernah-daftar',
  templateUrl: './pernah-daftar.page.html',
  styleUrls: ['./pernah-daftar.page.scss'],
})
export class PernahDaftarPage implements OnInit {
  nik: any;
  checkUserToServer: FormGroup;
  showIcon = false;
  userId: any;

  constructor(
    private router: Router,
    private server: ServerStrapiService,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  // authenticate(nik){
  //   this.router.navigate(['/daftar-ibadah-qr']);
  // }

  checkUser(event: any) {
    console.log('check user!:', this.checkUserToServer.value);
    // this.server.getSingleUser(this.checkUserToServer.value).subscribe( (response) => {
    //   console.log(response);
    // });
    const inputValue = event.target.value;
    console.log(inputValue);
    this.httpClient
      .get(this.server.endpoint + '/data-jemaats' + `?nik=`)
      .subscribe((response) => {
        console.log(response);
      });
    console.log();
  }

  verifiedUser() {
    console.log('user terverifikasi!');
    this.router.navigate(['/daftar-ibadah-qr', this.userId[0].nik]);
  }

  getInput(event: any) {
    console.log(event.target.value);

    this.httpClient
      .get(
        this.server.endpoint + '/data-jemaats' + `?nik=` + event.target.value
      )
      .subscribe((response) => {
        this.nik = response;
        this.userId = response;
        console.log(response);
        console.log(this.userId);
        if (this.nik.length === 0) {
          return (this.showIcon = false);
        } else {
          return (this.showIcon = true);
        }
      });
  }
}

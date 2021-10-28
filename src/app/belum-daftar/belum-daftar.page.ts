import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServerStrapiService } from '../services/server-strapi.service';
import * as moment from 'moment';


@Component({
  selector: 'app-belum-daftar',
  templateUrl: './belum-daftar.page.html',
  styleUrls: ['./belum-daftar.page.scss'],
})
export class BelumDaftarPage implements OnInit {

  currentDate: any;
  inputDate: any;
  userForm: FormGroup;
  getAge: any;
  dateToJson: any;
  file: File;
  dob: any;
  showRegisterButton = false;

  constructor( private httpClient: HttpClient, private server: ServerStrapiService, public formBuilder: FormBuilder,) {
    this.userForm = this.formBuilder.group({
      nik: [''],
      namaLengkap: [''],
      nomorWhatsapp: [''],
      tanggalLahir: [''],


    });
  }

  ngOnInit() {



  }

  registrasi(){
    const formData: FormData = new FormData();
    console.log(this.file);

    ////
    const userData = JSON.stringify(this.userForm.value);

    ///
    console.log(userData);
    formData.append('data', userData );
    formData.append('files.kartuVaksin', this.file, this.file.name);
    this.httpClient
      .post('http://localhost:1337/data-jemaats', formData)
      .subscribe( (response) => {
        console.log(response);
      } );

    // return this.httpClient.post( this.server.endpoint + '/data-jemaats',  this.userForm.value)
    //   .subscribe( (response) => { console.log(response);
    //   });
  }

  getTanggalLahir(event){

    //

    this.dob = moment().diff(event.target.value, 'years', false);

    if(this.dob > 60 ){
      this.showRegisterButton = true;
    }  else if (this.dob <=12 ) {
      this.showRegisterButton = true;
    } else {
      this.showRegisterButton = false;
    }
    console.log(this.dob);
  }



  // https://www.youtube.com/watch?v=btcfaY73i0E
  // calculate(){
  //   // this.getAge = this.currentDate - event.target.value;
  //   const currentDate = moment( new Date());
  //   const dob = moment( new Date(this.dob));

  //   console.log(dob, currentDate);
  // }

  onFileChange(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}

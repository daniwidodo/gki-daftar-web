import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,   } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerStrapiService } from '../services/server-strapi.service';
import * as moment from 'moment';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable, Subject } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
// import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
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

  showWebcam = true;
  isCameraExist = true;

  // errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  // private trigger: Subject<void> = new Subject<void>();
  // private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(
    private httpClient: HttpClient,
    private server: ServerStrapiService,
    public formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    private toast: ToastController
    // private formControl: FormControl
    //private camera: Camera
  ) {
    this.userForm = this.formBuilder.group({
      nik: [''],
      namaLengkap: [''],
      nomorWhatsapp: [''],
      tanggalLahir: [''],
      alamatDomain: [''],
      // verifikasi:[0],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // ibadah_id:['null']


    });
  }

  ngOnInit() {


  }

  registrasi() {
    const formData: FormData = new FormData();
    console.log(this.file);

    ////
    // const userData = JSON.stringify(this.userForm.value);

    ///
if (this.file === undefined){
  console.log('error image');
  this.toast.create({
    message: 'kartu vaksin error',
    duration: 2000,
    color: 'danger',
    position: 'top',
  }).then((toastData) => {

    toastData.present();
  });
}
    formData.append('nik', this.userForm.get('nik').value);
    formData.append('namaLengkap', this.userForm.get('namaLengkap').value);
    formData.append('nomorWhatsapp', this.userForm.get('nomorWhatsapp').value);
    formData.append('alamatDomain', this.userForm.get('alamatDomain').value);
    formData.append('tanggalLahir', this.userForm.get('tanggalLahir').value);
    formData.append('verifikasi', '0');
    formData.append('ibadah_id', 'null');
    formData.append('kartuVaksin', this.file, this.file.name);
    this.httpClient
      .post(this.server.endpoint+ '/api/jemaats', formData)
      .subscribe(
        (response) => {
          console.log(response);
          ////
          this.toast.create({
            message: 'pendaftaran sukses',
            duration: 2000,
            color: 'success',
              position: 'top',
          }).then((toastData) => {
            console.log(toastData);
            toastData.present();
          });
          console.log('post success!');
          //
          this.router.navigate(['pernah-daftar']);
        },
          error => {
            const errorMessage = error.error.message;
            this.toast.create({
              message: errorMessage,
              duration: 4000,
              color: 'danger',
              position: 'top',
            }).then((toastData) => {

              toastData.present();
            });
          console.log('pesan error :',error.error.message);
        }
      );
  }

  getTanggalLahir(event) {
    //

    this.dob = moment().diff(event.target.value, 'years', false);

    if (this.dob > 60) {
      this.showRegisterButton = true;
    } else if (this.dob <= 12) {
      this.showRegisterButton = true;
    } else {
      this.showRegisterButton = false;
    }
    console.log(this.dob);
  }

  onFileChange(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }


  // takeSnapshot(): void {
  //   this.trigger.next();
  // }

  // onOffWebCame() {
  //   this.showWebcam = !this.showWebcam;
  // }

  // handleInitError(error: WebcamInitError) {
  //   this.errors.push(error);
  // }

  // changeWebCame(directionOrDeviceId: boolean | string) {
  //   this.nextWebcam.next(directionOrDeviceId);
  // }

  // handleImage(webcamImage: WebcamImage) {
  //   //this.getPicture.emit(webcamImage);
  //   this.showWebcam = false;
  // }

  // get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }

  // get nextWebcamObservable(): Observable<boolean | string> {
  //   return this.nextWebcam.asObservable();
  // }

}

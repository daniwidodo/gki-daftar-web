import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerStrapiService } from '../services/server-strapi.service';
import * as moment from 'moment';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
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

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(
    private httpClient: HttpClient,
    private server: ServerStrapiService,
    public formBuilder: FormBuilder,
    private router: Router,
    //private camera: Camera
  ) {
    this.userForm = this.formBuilder.group({
      nik: ['', [Validators.required]],
      namaLengkap: ['', [Validators.required]],
      nomorWhatsapp: [''],
      tanggalLahir: [''],
      alamatDomain: [''],
    });
  }

  ngOnInit() {}

  registrasi() {
    const formData: FormData = new FormData();
    console.log(this.file);

    ////
    const userData = JSON.stringify(this.userForm.value);

    ///
    console.log(userData);
    formData.append('data', userData);
    formData.append('files.kartuVaksin', this.file, this.file.name);
    this.httpClient
      .post(this.server.endpoint+'/data-jemaats', formData)
      .subscribe(
        (response) => {
          console.log(response);
          console.log('post success!');
          this.router.navigate(['pernah-daftar']);
        },
        (error) => {
          console.log(error);
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
  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    //this.getPicture.emit(webcamImage);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BelumDaftarPageRoutingModule } from './belum-daftar-routing.module';
import { WebcamModule } from 'ngx-webcam';
import { BelumDaftarPage } from './belum-daftar.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BelumDaftarPageRoutingModule,
    ReactiveFormsModule,
    WebcamModule,
    //Camera
  ],
  declarations: [BelumDaftarPage]
})
export class BelumDaftarPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BelumDaftarPageRoutingModule } from './belum-daftar-routing.module';

import { BelumDaftarPage } from './belum-daftar.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BelumDaftarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BelumDaftarPage]
})
export class BelumDaftarPageModule {}

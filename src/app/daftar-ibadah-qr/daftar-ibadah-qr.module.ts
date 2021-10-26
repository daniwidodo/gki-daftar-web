import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarIbadahQrPageRoutingModule } from './daftar-ibadah-qr-routing.module';

import { DaftarIbadahQrPage } from './daftar-ibadah-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarIbadahQrPageRoutingModule
  ],
  declarations: [DaftarIbadahQrPage]
})
export class DaftarIbadahQrPageModule {}

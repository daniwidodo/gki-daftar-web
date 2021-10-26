import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PernahDaftarPageRoutingModule } from './pernah-daftar-routing.module';

import { PernahDaftarPage } from './pernah-daftar.page';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PernahDaftarPageRoutingModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [PernahDaftarPage]
})
export class PernahDaftarPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifPagePageRoutingModule } from './verif-page-routing.module';

import { VerifPagePage } from './verif-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifPagePageRoutingModule
  ],
  declarations: [VerifPagePage]
})
export class VerifPagePageModule {}

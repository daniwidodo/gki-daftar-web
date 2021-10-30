import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratedQrPageRoutingModule } from './generated-qr-routing.module';

import { GeneratedQrPage } from './generated-qr.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [
    NgxPrintModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratedQrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GeneratedQrPage]
})
export class GeneratedQrPageModule {}

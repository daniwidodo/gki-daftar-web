import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratedQrEventsPageRoutingModule } from './generated-qr-events-routing.module';

import { GeneratedQrEventsPage } from './generated-qr-events.page';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratedQrEventsPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GeneratedQrEventsPage]
})
export class GeneratedQrEventsPageModule {}

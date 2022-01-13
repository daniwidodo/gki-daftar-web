import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifEventsPageRoutingModule } from './verif-events-routing.module';

import { VerifEventsPage } from './verif-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifEventsPageRoutingModule
  ],
  declarations: [VerifEventsPage]
})
export class VerifEventsPageModule {}

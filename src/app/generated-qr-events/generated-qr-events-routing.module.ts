import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratedQrEventsPage } from './generated-qr-events.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratedQrEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratedQrEventsPageRoutingModule {}

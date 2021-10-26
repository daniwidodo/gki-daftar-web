import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarIbadahQrPage } from './daftar-ibadah-qr.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarIbadahQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarIbadahQrPageRoutingModule {}

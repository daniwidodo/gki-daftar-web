import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BelumDaftarPage } from './belum-daftar.page';

const routes: Routes = [
  {
    path: '',
    component: BelumDaftarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BelumDaftarPageRoutingModule {}

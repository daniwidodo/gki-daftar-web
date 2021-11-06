import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifPagePage } from './verif-page.page';

const routes: Routes = [
  {
    path: '',
    component: VerifPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifPagePageRoutingModule {}

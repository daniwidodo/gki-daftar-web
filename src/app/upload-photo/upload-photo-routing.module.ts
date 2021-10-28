import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPhotoPage } from './upload-photo.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPhotoPageRoutingModule {}

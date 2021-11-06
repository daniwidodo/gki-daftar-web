import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pernah-daftar',
    loadChildren: () => import('./pernah-daftar/pernah-daftar.module').then( m => m.PernahDaftarPageModule)
  },
  {
    path: 'belum-daftar',
    loadChildren: () => import('./belum-daftar/belum-daftar.module').then( m => m.BelumDaftarPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'daftar-ibadah-qr/:id',
    loadChildren: () => import('./daftar-ibadah-qr/daftar-ibadah-qr.module').then( m => m.DaftarIbadahQrPageModule)
  },
  {
    path: 'generated-qr/:nikId/:ibadahId',
    loadChildren: () => import('./generated-qr/generated-qr.module').then( m => m.GeneratedQrPageModule)
  },
  {
    path: 'upload-photo',
    loadChildren: () => import('./upload-photo/upload-photo.module').then( m => m.UploadPhotoPageModule)
  },
  {
    path: 'verif-page/:nikId/:ibadahId',
    loadChildren: () => import('./verif-page/verif-page.module').then( m => m.VerifPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

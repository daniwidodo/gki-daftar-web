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
    path: 'daftar-ibadah-qr',
    loadChildren: () => import('./daftar-ibadah-qr/daftar-ibadah-qr.module').then( m => m.DaftarIbadahQrPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

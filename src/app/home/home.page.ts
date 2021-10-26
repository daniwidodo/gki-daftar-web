import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: Router ) {}

  klik() {
    return console.log('klik');
  }

  goToPernahDaftar(){
    this.router.navigate(['/pernah-daftar']);
  }

  goToBelumDaftar(){
    this.router.navigate(['/belum-daftar']);
  }

}

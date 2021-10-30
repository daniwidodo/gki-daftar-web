import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  checkbox1 = false;
  checkbox2 = false;

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

  checkbox1Click(e){
    console.log('check 1:',e.detail.checked);
    if (e.detail.checked === true) {
      this.checkbox1 = true;
    } else if (e.detail.checked === false) {
      this.checkbox1 = false;
    };


  }
  checkbox2Click(e){
    console.log('check 2:',e.detail.checked);
    if (e.detail.checked === true) {
      this.checkbox2 = true;
    } else if (e.detail.checked === false) {
      this.checkbox2 = false;
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pernah-daftar',
  templateUrl: './pernah-daftar.page.html',
  styleUrls: ['./pernah-daftar.page.scss'],
})
export class PernahDaftarPage implements OnInit {
   nik: any ;
  constructor( private router: Router ) { }

  ngOnInit() {
  }

  authenticate(nik){
    this.router.navigate(['/daftar-ibadah-qr']);
  }

}

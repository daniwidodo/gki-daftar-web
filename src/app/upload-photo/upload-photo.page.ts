import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.page.html',
  styleUrls: ['./upload-photo.page.scss'],
})
export class UploadPhotoPage implements OnInit {
  file: File;
  userForm: FormGroup;

  constructor(private http: HttpClient, public formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      namaLengkap: ['']
    });
  }

  ngOnInit() {}

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
    console.log(this.file);
  }

  async submitForm() {
    const formData = new FormData();
    formData.append('photo', this.file, this.file.name);
    this.http
      .post('http://localhost:1337/data-jemaats', formData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  jsonForm(){

    const userData = JSON.stringify(this.userForm.value);
    console.log(userData);
  }

  cobaForm() {
    const formData: FormData = new FormData();
    console.log(this.file);

    const userData = JSON.stringify(this.userForm.value);

    console.log(this.userForm);
    formData.append('data', userData );
    formData.append('files.kartuVaksin', this.file, this.file.name);
    this.http
      .post('http://localhost:1337/data-jemaats', formData)
      .subscribe( (response) => {
        console.log(response);
      } );
  }
}

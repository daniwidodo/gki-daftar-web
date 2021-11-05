import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerStrapiService {

  endpoint = 'https://panelv1.gkisulsel.org/public';
  constructor( private httpClient: HttpClient) { }

  registerUser() {

  }

  getSingleUser(){
    return this.httpClient.get( this.endpoint + '/data-jemaats' + '?nik=' )
      .pipe(
        tap( _ => console.log() ),
        catchError(this.handleError('dapat error'))
      );
  }

  getAllIbadah() {
    return this.httpClient.get( this.endpoint + '/ibadahs' + '?_limit=1')
      .pipe(
        tap( _ => console.log('data dari ibadah : ', this.endpoint)),
        catchError(this.handleError('error handler'))
      );
  }


  ///////////////
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

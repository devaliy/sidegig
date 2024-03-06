import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.unsplash.apiUrl


  constructor(private http: HttpClient) {

  }


  public getGrid(): Observable<any> {
    return this.http.get(`${environment.unsplash.apiUrl}/photos/random?count=2&client_id=${environment.unsplash.accessKey}`);
  }
  public get(): Observable<any> {
    return this.http.get(`${environment.unsplash.apiUrl}/photos/random?count=1&client_id=${environment.unsplash.accessKey}`);
  }
}

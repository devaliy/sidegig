import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public getGrid(): Observable<any> {
    return this.http.get(`${environment.unsplash.apiUrl}/photos/random?count=2&client_id=${environment.unsplash.accessKey}`);
  }

  public get(): Observable<any> {
    return this.http.get(`${environment.unsplash.apiUrl}/photos/random?count=4&client_id=${environment.unsplash.accessKey}`);
  }

   async downloadAndConvertImage(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(url, { responseType: 'blob', reportProgress: true, observe: 'events' }).subscribe(
        (event: HttpEvent<Blob>) => {
          if (event.type === HttpEventType.Response) {
            const blob: any = event.body;
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
   }


}

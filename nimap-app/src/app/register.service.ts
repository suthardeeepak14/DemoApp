import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  url = 'http://localhost:3000/candidate';
  urls = 'http://localhost:3000/candidate/1 ';
  constructor(private http: HttpClient) {}
  candidatesget(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  candidate(formData: any): Observable<any> {
    return this.http.post(this.url, formData);
  }
  candidateput(EditForm: any): Observable<any> {
    return this.http.put(this.urls, EditForm);
  }
}

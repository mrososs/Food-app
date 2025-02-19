import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://upskilling-egypt.com:3006'; // API URL

  constructor(private http: HttpClient) {}
  register(userData: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/v1/Users/Register`,
      userData
    );
  }
  login(loginData:any):Observable<any>{
    return this.http.post<any>(
      `${this.apiUrl}/api/v1/Users/Login`,
      loginData
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

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
  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/Users/Login`, loginData);
  }
  forgetPassword(email: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/v1/Users/Reset/Request`,
      email
    );
  }
  verifyAccount(form: NgForm): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/v1/Users/verify`, form);
  }
  getUserGroup(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userGroup || null; // Return userGroup if exists, otherwise null
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.error('Token is null');
      return null;
    }
  }
}

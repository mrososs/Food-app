import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../core/interfaces/profile_user';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); // Public observable

  constructor(private _http: HttpClient) {}

  getUser(): void {
    if (!this.userSubject.value) {
      // Check if user data is already loaded
      this._http
        .get<User>('/Users/currentUser')
        .pipe(
          tap((res) => this.userSubject.next(res)),
          shareReplay(1) // Cache the response
        )
        .subscribe();
    }
  }
}

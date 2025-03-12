import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, Subject, tap } from 'rxjs';
import { User } from '../../core/interfaces/profile_user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private user = new Subject<User>();
  user$ = this.user.asObservable();
  constructor(private _http: HttpClient) {}
  getUser(): void {
    this._http
      .get<User>(`/Users/currentUser`)
      .pipe(
        tap((res) => this.user.next(res)),
        shareReplay(1)
      )
      .subscribe();
  }
}

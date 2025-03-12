import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { UserResponse } from '../../../../core/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private userList = new BehaviorSubject<UserResponse | null>(null);
  users$ = this.userList.asObservable();
  constructor(private _http: HttpClient) {}

  getUsersList(pageNumber: number, pageSize: number): void {
    this._http
      .get<UserResponse>(
        `/Users/?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((res) => this.userList.next(res)),
        catchError((err) => {
          return of(null);
        })
      )
      .subscribe();
  }
}

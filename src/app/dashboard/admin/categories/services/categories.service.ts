import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PaginatedCategoryResponse } from '../../../../core/interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesList =
    new BehaviorSubject<PaginatedCategoryResponse | null>(null);
  categoriesList$ = this.categoriesList.asObservable();
  constructor(private _http: HttpClient) {}
  getCategoriesList(pageNumber: number, pageSize: number): void {
    this._http
      .get<PaginatedCategoryResponse>(
        `/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(
        tap((response: any) => {
          this.categoriesList.next(response);
        })
      )
      .subscribe();
  }
}

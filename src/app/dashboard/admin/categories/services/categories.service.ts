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
  getCategoryById(id: number|undefined): Observable<any> {
    return this._http.get(`/Category/${id}`);
  }
  deleteCategory(id: number): Observable<any> {
    return this._http.delete(`/Category/${id}`);
  }
  updateCategory(id: number, data: any): Observable<any> {
    return this._http.put(`/Category/${id}`, data);
  }
}

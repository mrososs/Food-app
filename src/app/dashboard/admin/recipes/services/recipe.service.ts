import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedFoodResponse } from '../../../../core/interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private _http: HttpClient) {}
  getRecipes(
    pageSize: number,
    pageNumber: number,
    name?: string
  ): Observable<PaginatedFoodResponse> {
    let url = `/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`;

    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }

    return this._http.get<PaginatedFoodResponse>(url);
  }
}

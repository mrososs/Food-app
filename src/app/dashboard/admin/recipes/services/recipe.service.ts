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
    name?: string,
    tag?:string,
    category?:string
  ): Observable<PaginatedFoodResponse> {
    let url = `/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`;

    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    if(tag){
      url+=`&tagId=${encodeURIComponent(tag)}`;
    }
    if(category){
      url+=`&categoryId=${encodeURIComponent(category)}`;
    }

    return this._http.get<PaginatedFoodResponse>(url);
  }
}

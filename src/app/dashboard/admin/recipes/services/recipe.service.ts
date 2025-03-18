import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItem, PaginatedFoodResponse } from '../../../../core/interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private _http: HttpClient) {}
  getRecipes(paramsData: any): Observable<PaginatedFoodResponse> {
    let url = `/Recipe/`;

    let params = new HttpParams()
      .set('pageSize', paramsData.pageSize)
      .set('pageNumber', paramsData.pageNumber);

    if (paramsData.name) {
      params = params.set('name', paramsData.name);
    }
    if (paramsData.tagId) {
      params = params.set('tagId', paramsData.tagId);
    }
    if (paramsData.categoryId) {
      params = params.set('categoryId', paramsData.categoryId);
    }

    return this._http.get<PaginatedFoodResponse>(url, { params });
  }
  getRecipeById(id: number): Observable<FoodItem> {
    return this._http.get<FoodItem>(`/Recipe/${id}`);
  }
  updateRecipe(id:number , data:FoodItem):Observable<FoodItem>{
    return this._http.put<FoodItem>(`/Recipe/${id}`,data);
  }
  deleteRecipe(id:number):Observable<any>{
    return this._http.delete(`/Recipe/${id}`);
  }
}

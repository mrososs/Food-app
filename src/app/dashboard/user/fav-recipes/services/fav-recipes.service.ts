import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFavRecipes } from '../../../../core/interfaces/favRecipes';

@Injectable({
  providedIn: 'root',
})
export class FavRecipesService {
  constructor(private _http: HttpClient) {}
  getFavoriteRecipes(paramData: any): Observable<IFavRecipes> {
    return this._http.get<IFavRecipes>('/userRecipe/');
  }
  deleteFavoriteRecipe(recipeId: number): Observable<any> {
    return this._http.delete(`/userRecipe/${recipeId}`);
  }
}

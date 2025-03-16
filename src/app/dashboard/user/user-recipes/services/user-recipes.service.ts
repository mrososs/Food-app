import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserRecipesService {
  constructor(private _http: HttpClient) {}

  addToFavourite(recipeId:number) {
    return this._http.post('/userRecipe/', { recipeId });
  }
}

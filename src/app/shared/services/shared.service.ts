import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITagList } from '../../core/interfaces/tags';
import {
  ICategoryList,
  PaginatedCategoryResponse,
} from '../../core/interfaces/category';
import { IChangePassword } from '../../core/interfaces/password';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _http: HttpClient) {}
  getCategoryList(
    pageNum: number,
    pageSize: number
  ): Observable<PaginatedCategoryResponse> {
    return this._http.get<PaginatedCategoryResponse>(
      `/Category/?pageSize=${pageSize}&pageNumber=${pageNum}`
    );
  }
  getTagList(): Observable<ITagList[]> {
    return this._http.get<ITagList[]>(
      `https://upskilling-egypt.com:3006/api/v1/Tag`
    );
  }
  addRecipe(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('tagId', data.tag);

    // Append categoriesIds as an array
    data.categoriesIds.forEach((id: number) => {
      formData.append('categoriesIds', id.toString());
    });

    // Append the image file (if available)
    if (data.image) {
      formData.append('recipeImage', data.image);
    }

    return this._http.post<any>(
      `https://upskilling-egypt.com:3006/api/v1/Recipe`,
      formData
    );
  }
  changePassword(data: IChangePassword): Observable<IChangePassword> {
    return this._http.put<IChangePassword>(`/Users/ChangePassword`, data);
  }
}

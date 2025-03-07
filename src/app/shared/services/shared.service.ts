import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITagList } from '../../core/interfaces/tags';
import {
  ICategoryList,
  PaginatedCategoryResponse,
} from '../../core/interfaces/category';

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
}

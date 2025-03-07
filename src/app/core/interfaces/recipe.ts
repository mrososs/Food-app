import { ICategoryList } from './category';
import { ITagList } from './tags';

export interface FoodItem {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: ICategoryList[];
  tag: ITagList;
}

export interface PaginatedFoodResponse {
  pageNumber: number;
  pageSize: number;
  data: FoodItem[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

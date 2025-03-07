export interface ICategoryList {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  }
  export interface PaginatedCategoryResponse {
    pageNumber: number;
    pageSize: number;
    data: ICategoryList[]; // ✅ The actual categories are inside "data"
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }
  
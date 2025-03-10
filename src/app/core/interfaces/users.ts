export interface UserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath?: string | null; 
  group: UserGroup;
  creationDate: string;
  modificationDate: string;
}

export interface UserResponse {
  pageNumber: number;
  pageSize: number;
  data: User[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

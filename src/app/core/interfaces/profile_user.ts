export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  group: Group;
  creationDate: string; // ISO date string
  modificationDate: string; // ISO date string
}

export interface Group {
  id: number;
  name: string;
  creationDate: string; // ISO date string
  modificationDate: string; // ISO date string
}

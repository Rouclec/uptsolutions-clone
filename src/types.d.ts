/**User types signature */
export interface User {
  _id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  profileImage?: string;
  role?: {
    code: string;
  };
  address?: string;
}

export interface Command {
  _id?: string;
  name?: string;
  numberOfCopies?: string;
  paperType?: string;
  paperSize?: string;
  orientation?: string;
  printSides?: string;
  printColor?: string;
  paperColor?: string;
  pagesPerSheet?: string;
  printType?: string;
  biding?: string;
  bidingType?: string;
  extraDetails?: string;
  amount: number;
  createdAt?: string;
  status?: string;
  file?: string;
  updatedAt?: string;
}

export interface Order {
  documents: Commands[];
  amount: string | number;
  user: string;
}

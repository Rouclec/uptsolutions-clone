/**User types signature */
export interface User {
  _id?: string | null | undefined;
  name?: string | null | undefined;
  gender?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  email?: string | null | undefined;
  token?: string | null | undefined;
  image?: string | null | undefined;
  role?: {
    code: string;
  };
}

export interface Command {
  docName?: string;
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
  cost?: number;
}

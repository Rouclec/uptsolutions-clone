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
  pages?: string;
  paperSize?: string;
  orientation?: string;
  printSides?: string;
  printColor?: string;
  paperColor?: string;
  pagesPerSheet?: string;
  printType?: string;
  biding?: string;
  bindingType?: string;
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
  method: string;
}

export type RequestPaymentModel = {};

export type CmpyToken = {
  username: string;
  password: string;
  expires_in?: string;
};

export type TokenResponse = {
  token: string;
  expires_in: number;
};

export type MakePaymentRequest = {
  amount: number;
  currency?: string;
  from: string; // number to initiate payment on
  description?: string;
  external_reference: string; // the vote_id
};

export type webhookPymntResponse = {
  reference: string;
  external_reference: string;
  status: string;
  amount: number;
  currency: string;
  operator: string;
  code: string;
  operator_reference: string;
  description: string;
  external_user: string;
  reason: string;
};

export type initiatePaymentResponse = {
  reference: string;
  ussd_code: string;
  operator: string;
};

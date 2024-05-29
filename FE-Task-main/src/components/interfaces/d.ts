export interface Address {
  city: string;
  zipcode: string;
  street:string;
}

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
}

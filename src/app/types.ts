export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  pass?: any;
  isCheck?: boolean;
}

export interface UserPlaceholder {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}

// {"street":"123 Main Street","suite":"Apt. 4","city":"Anytown","zipcode":"12345-6789","geo":{"lat":"42.1234","lng":"-71.2345"}}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {lat: string, lng: string};
}

// {"name":"ABC Company","catchPhrase":"Innovative solutions for all your needs","bs":"Marketing"}}
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

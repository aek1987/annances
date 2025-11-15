export interface User {
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: 'candidat' | 'entreprise' | 'admin';
  refId:number |null
 
}

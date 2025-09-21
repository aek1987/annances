export interface User {
  username: string;
  email: string;
  password: string;
  phone: string;
  fonction: string;
  role?: 'candidat' | 'entreprise' | 'admin';
}

export interface Account {
    username:  string;
  phone:  string; 
  fonction:string; 
  email: string;
  password: string;
  role: 'candidat' | 'entreprise' | 'admin';
}

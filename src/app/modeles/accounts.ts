export interface Account {
  email: string;
  password: string;
  username:string;
  phone:string;
  role: 'candidat' | 'entreprise' | 'admin';
  refId: number;
}

export interface Account {
  email: string;
  password: string;
  username:string;
  role: 'candidat' | 'entreprise' | 'admin';
  refId: number;
}

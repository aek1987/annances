export interface Account {
  email: string;
  password: string;
  role: 'candidat' | 'entreprise' | 'admin';
  refId: number;
}

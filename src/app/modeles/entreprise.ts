// src/app/models/entreprise.model.ts
// src/app/modeles/entreprise.ts
export interface Entreprise {
  id :Number;
  email: string;
  password: string;
  role: 'entreprise';
  username: string;
  fonction: string;
  phone: string;
  photo: string;
}

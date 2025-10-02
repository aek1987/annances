// src/app/modeles/entreprise.ts
export interface Entreprise {
  id: number;
  username: string;
  email: string;
  phone: string;
  secteur: string;
  description?: string;
  site?: string;
  logo?: string; // chemin ou URL du logo
  status: 'active' | 'desactive';
}

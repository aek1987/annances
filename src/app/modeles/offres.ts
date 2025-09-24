// src/app/modeles/offre.ts
export interface Offre {
  id: number;
  entrepriseId: number; // 🔗 relie l'offre à une entreprise
  titre: string;
  description: string;
  localisation: string;
  datePublication: Date;
}

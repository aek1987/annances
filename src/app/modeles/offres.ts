// src/app/modeles/offre.ts
// src/app/modeles/offre.ts
export interface Offre {
  id: number;
  entrepriseId: number;      // 🔗 Lien vers l'entreprise
  poste: string;             // Titre de l'offre
  description: string;  
  missions?:string[]
  localisation: string;      // Ville ou Remote
  salaire: number;          // Optionnel
  contrat?: string;          // CDI, CDD, Stage, Remote...
  datePublication: Date;     // Date ajout
  favori?: boolean;
  teletravail?: string;
  status?: 'postulé' | 'en cours' | 'accepte' | 'refuse';
  niveauExperience?: 'Junior' | 'Intermédiaire' | 'Senior' | 'Lead';
  competences?: string[];
  langues?: string[];
   avantages?: string;
  dateLimite?: Date;
  candidaturesCount?: number;
}



// src/app/modeles/offre.ts
// src/app/modeles/offre.ts
export interface Offre {
  id: number;
  entrepriseId: number;      // 🔗 Lien vers l'entreprise
  titre: string;             // Titre de l'offre
  description: string;       // Description
  localisation: string;      // Ville ou Remote
  salaire: number;          // Optionnel
  contrat?: string;          // CDI, CDD, Stage, Remote...
  datePublication: Date;     // Date ajout
  favori?: boolean;
  status?: 'postulé' | 'en cours' | 'accepte' | 'refuse';
  niveauExperience?: 'Junior' | 'Intermédiaire' | 'Senior' | 'Lead';
  competences?: string[];
  langues?: string[];
  avantages?: string[];
  dateLimite?: Date;
  candidaturesCount?: number;
}



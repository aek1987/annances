// src/app/modeles/candidature.ts
export interface Candidature {
  id: number;
  offreId: number;      // 🔗 vers l’offre
  candidatId: number;   // 🔗 vers le candidat
  dateCandidature: Date;
  statut: 'en attente' | 'acceptée' | 'refusée';
  message?: string;     // message de motivation optionnel
}

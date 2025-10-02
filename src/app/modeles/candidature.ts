// src/app/modeles/candidature.ts
export interface Candidature {
  id: number;
  offreId: number;      // 🔗 vers l’offre
  candidatId: number;   // 🔗 vers le candidat
  dateCandidature: Date;
  statut: 'en attente' | 'acceptée' | 'refusée';
  message?: string;     // message de motivation optionnel
 
  cvUrl?: string;          // 🔗 Lien vers le CV du candidat (PDF, Word)
  lettreUrl?: string;      // 🔗 Lien vers une lettre de motivation (optionnelle)
  
  noteRH?: number;         // ⭐ Évaluation par l’entreprise (score sur 5 par ex.)
  commentaireRH?: string;  // Remarques internes (visible uniquement par l’entreprise)

  dateEntretien?: Date;    // 📅 Date d’entretien programmée
  modeEntretien?: 'présentiel' | 'distanciel' | 'téléphone'; 

  luParEntreprise?: boolean;  // 👀 Indique si l’entreprise a consulté la candidature
  luParCandidat?: boolean;    // 👀 Indique si le candidat a vu la réponse
}

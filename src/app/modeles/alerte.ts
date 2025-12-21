export interface Alerte {
  id: number;
  motCle: string;
  lieu: string;
  contrats: string[];           // Ex: ["CDI", "Stage"]
  secteurs: string[];           // Ex: ["Informatique", "Santé"]
  teletravail: string;        // Ex: ["Présentiel", "100% Télétravail"]
  frequence: 'quotidienne' | 'hebdomadaire' | 'mensuelle'|"Immediate";
  active: boolean;
  dateCreation: Date;
  email?: string;   
 showConfig?: boolean;            // Optionnel (email du candidat)
}

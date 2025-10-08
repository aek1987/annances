export interface Alerte {
  id: number;
  motCle: string;
  lieu: string;
  frequence: 'quotidienne' | 'hebdomadaire' | 'mensuelle';
  active: boolean;
  dateCreation: Date;
}

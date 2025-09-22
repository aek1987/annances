import { Component } from '@angular/core';

interface Candidature {
  id: number;
  poste: string;
  entreprise: string;
  date: string;
  statut: 'En attente' | 'Entretien' | 'Refusé' | 'Accepté';
}

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent {
  candidatures: Candidature[] = [
    { id: 1, poste: 'Développeur Angular', entreprise: 'TechCorp', date: '2025-09-01', statut: 'En attente' },
    { id: 2, poste: 'Administrateur Systèmes', entreprise: 'Innova', date: '2025-09-05', statut: 'Entretien' },
    { id: 3, poste: 'Chef de projet IT', entreprise: 'SoftSolutions', date: '2025-09-12', statut: 'Refusé' }
  ];

  annulerCandidature(id: number) {
    this.candidatures = this.candidatures.filter(c => c.id !== id);
  }

  voirDetails(candidature: Candidature) {
    alert(`Détails candidature : ${candidature.poste} chez ${candidature.entreprise}`);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-entreprises-recrutent',
  templateUrl: './entreprises-recrutent.component.html',
  styleUrls: ['./entreprises-recrutent.component.css']
})
export class EntreprisesRecrutentComponent {
  entreprises = [
    {
      nom: 'Tech Solutions SARL',
      secteur: 'Informatique & Technologie',
      postes: 8,
      localisation: 'Alger Centre'
    },
    {
      nom: 'Med Services',
      secteur: 'Santé & Médical',
      postes: 5,
      localisation: 'Oran'
    },
    {
      nom: 'Finance Pro',
      secteur: 'Banque & Finance',
      postes: 12,
      localisation: 'Constantine'
    },
    {
      nom: 'Edu Formation',
      secteur: 'Éducation',
      postes: 3,
      localisation: 'Annaba'
    }
  ];
}
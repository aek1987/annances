import { Component } from '@angular/core';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent {
  stages = [
    {
      titre: 'Stage Développement Web Frontend',
      entreprise: 'Digital Agency',
      duree: '6 mois',
      localisation: 'Alger',
      domaine: 'Informatique',
      gratification: '800 €/mois',
      description: 'Stage en développement front-end avec Angular/React. Participation à des projets concrets pour clients internationaux.',
      competences: ['Angular', 'TypeScript', 'HTML/CSS', 'Git'],
      datePublication: '15/01/2024'
    },
    {
      titre: 'Stage Marketing Digital & Réseaux Sociaux',
      entreprise: 'Media Pro',
      duree: '3 mois',
      localisation: 'Oran',
      domaine: 'Marketing',
      gratification: '600 €/mois', 
      description: 'Stage en community management et stratégie digitale. Gestion des réseaux sociaux et analyse des performances.',
      competences: ['Réseaux sociaux', 'Analytics', 'Content Marketing'],
      datePublication: '10/01/2024'
    },
    {
      titre: 'Stage Data Analysis',
      entreprise: 'Data Corp',
      duree: '4 mois',
      localisation: 'Constantine',
      domaine: 'Data Science',
      gratification: '700 €/mois',
      description: 'Stage en analyse de données avec Python. Traitement et visualisation de données business.',
      competences: ['Python', 'Pandas', 'SQL', 'Data Visualization'],
      datePublication: '08/01/2024'
    },
    {
      titre: 'Stage Design UX/UI',
      entreprise: 'Creative Studio',
      duree: '5 mois', 
      localisation: 'Annaba',
      domaine: 'Design',
      gratification: '650 €/mois',
      description: 'Stage en design d interface utilisateur. Création de maquettes et prototypage interactif.',
      competences: ['Figma', 'Adobe XD', 'Design Thinking', 'Prototypage'],
      datePublication: '05/01/2024'
    }
  ];
}
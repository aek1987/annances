import { Component } from '@angular/core';

@Component({
  selector: 'app-offres-emploi',
  templateUrl: './offres-emploi.component.html',
  styleUrls: ['./offres-emploi.component.css']
})
export class OffresEmploiComponent {
  filtres = {
    secteur: '',
    localisation: '',
    contrat: ''
  };

  offresEmploi = [
    {
      titre: 'Développeur Full Stack Angular',
      entreprise: 'Tech Solutions SARL',
      type: 'CDI',
      localisation: 'Alger',
      salaire: '3 000 - 4 000 €',
      experience: '3-5 ans',
      description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique et participer au développement de nos applications web innovantes.',
      competences: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
      datePublication: '15/01/2024',
      candidatures: 24
    },
    {
      titre: 'Commercial B2B Senior',
      entreprise: 'Business Pro',
      type: 'CDI',
      localisation: 'Oran', 
      salaire: '2 500 € + Variable',
      experience: '5+ ans',
      description: 'Profil commercial expérimenté pour développer notre portefeuille clients entreprises dans le secteur digital.',
      competences: ['Vente B2B', 'Négociation', 'CRM', 'Anglais'],
      datePublication: '12/01/2024',
      candidatures: 18
    },
    {
      titre: 'Data Scientist',
      entreprise: 'Data Analytics DZ',
      type: 'CDD',
      localisation: 'Alger',
      salaire: '3 500 - 4 500 €',
      experience: '2-4 ans',
      description: 'Rejoignez notre équipe data pour développer des modèles prédictifs et des solutions IA.',
      competences: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      datePublication: '10/01/2024',
      candidatures: 32
    }
  ];

  appliquerFiltres() {
    console.log('Filtres appliqués:', this.filtres);
    // Implémentez la logique de filtrage ici
  }

  reinitialiserFiltres() {
    this.filtres = {
      secteur: '',
      localisation: '', 
      contrat: ''
    };
  }
}
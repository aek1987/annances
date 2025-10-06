// src/app/service/offre.service.ts
import { Injectable } from '@angular/core';
import { Offre } from '../modeles/offres';

@Injectable({ providedIn: 'root' }) export class OffresService {
private offres: Offre[] = [
  {
    id: 1,
    entrepriseId: 101,
    poste: 'Développeur Angular',
    description: 'Développement d’applications Angular 16 avec intégration REST et gestion des états.',
    localisation: 'Paris',
    salaire: 40000,
    contrat: 'CDI',
    teletravail: 'Télétravail partiel',
    datePublication: new Date('2025-01-10'),
    dateLimite: new Date('2025-02-10'),
    niveauExperience: 'Intermédiaire',
    competences: ['Angular', 'TypeScript', 'RxJS', 'REST API'],
    langues: ['Français', 'Anglais'],
    avantages: 'Tickets restaurant, Mutuelle, Flexibilité',
    status: undefined,
    favori: false
  },
  {
    id: 2,
    entrepriseId: 101,
    poste: 'Data Analyst',
    description: 'Analyse et visualisation des données financières pour prise de décision.',
    localisation: 'Lyon',
    salaire: 35000,
    contrat: 'CDD',
    teletravail: 'Présentiel',
    datePublication: new Date('2025-02-05'),
    dateLimite: new Date('2025-03-05'),
    niveauExperience: 'Junior',
    competences: ['SQL', 'Excel', 'Power BI', 'Python'],
    langues: ['Français'],
    avantages: 'Tickets restaurant, Transport remboursé',
    status: undefined,
    favori: false
  },
  {
    id: 3,
    entrepriseId: 101,
    poste: 'Développeur Java',
    description: 'Développement backend avec Spring Boot, intégration API et tests unitaires.',
    localisation: 'Remote',
    salaire: 42000,
    contrat: 'Remote',
    teletravail: '100% Télétravail',
    datePublication: new Date('2025-03-15'),
    dateLimite: new Date('2025-04-15'),
    niveauExperience: 'Senior',
    competences: ['Java', 'Spring Boot', 'JPA', 'JUnit'],
    langues: ['Anglais'],
    avantages: 'Télétravail 100%, Formations, Mutuelle',
    status: undefined,
    favori: false
  },
  {
    id: 4,
    entrepriseId: 101,
    poste: 'UX/UI Designer',
    description: 'Conception et prototypage d’interfaces web et mobile.',
    localisation: 'Marseille',
    salaire: 38000,
    contrat: 'CDI',
    teletravail: 'Télétravail partiel',
    datePublication: new Date('2025-04-01'),
    dateLimite: new Date('2025-05-01'),
    niveauExperience: 'Intermédiaire',
    competences: ['Figma', 'Adobe XD', 'Design Thinking'],
    langues: ['Français', 'Anglais'],
    avantages: 'Flexibilité, Tickets restaurant, Formations',
    status: undefined,
    favori: false
  },
  {
    id: 5,
    entrepriseId: 1101,
    poste: 'Chef de projet IT',
    description: 'Gestion de projets informatiques, coordination des équipes et planning.',
    localisation: 'Toulouse',
    salaire: 50000,
    contrat: 'CDI',
    teletravail: 'Présentiel',
    datePublication: new Date('2025-04-10'),
    dateLimite: new Date('2025-05-10'),
    niveauExperience: 'Senior',
    competences: ['Gestion de projet', 'Agile', 'Scrum', 'Communication'],
    langues: ['Français', 'Anglais'],
    avantages: 'Mutuelle, Bonus, Tickets restaurant',
    status: undefined,
    favori: false
  },
  {
    id: 6,
    entrepriseId:101,
    poste: 'Consultant Cloud',
    description: 'Implémentation et optimisation des solutions cloud AWS/Azure.',
    localisation: 'Remote',
    salaire: 45000,
    contrat: 'Freelance',
    teletravail: '100% Télétravail',
    datePublication: new Date('2025-05-05'),
    dateLimite: new Date('2025-06-05'),
    niveauExperience: 'Intermédiaire',
    competences: ['AWS', 'Azure', 'DevOps', 'Docker'],
    langues: ['Anglais'],
    avantages: 'Télétravail, Horaires flexibles',
    status: undefined,
    favori: false
  },
  {
    id: 7,
    entrepriseId: 101,
    poste: 'Marketing Digital',
    description: 'Gestion des campagnes marketing, SEO/SEA et analyse des KPI.',
    localisation: 'Bordeaux',
    salaire: 32000,
    contrat: 'Stage',
    teletravail: 'Télétravail partiel',
    datePublication: new Date('2025-05-15'),
    dateLimite: new Date('2025-06-15'),
    niveauExperience: 'Junior',
    competences: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
    langues: ['Français'],
    avantages: 'Stage rémunéré, Tickets restaurant',
    status: undefined,
    favori: false
  }
];

  

  private nextId = 3;

  // ✅ Récupérer toutes les offres
  getAllOffres(): Offre[] {
    return this.offres;
  }

  // ✅ Récupérer une offre par ID
  getOffreById(id: number): Offre | undefined {
    return this.offres.find(o => o.id === id);
  }

  // ✅ Récupérer les offres d’une entreprise
  getOffresByEntreprise(entrepriseId: number): Offre[] {
    return this.offres.filter(o => o.entrepriseId === entrepriseId);
  }

  // ✅ Ajouter une offre
  addOffre(offre: Omit<Offre, 'id' | 'datePublication'>): Offre {
    const newOffre: Offre = {
      ...offre,
      id: this.nextId++,
      datePublication: new Date()
    };
    this.offres.push(newOffre);
    return newOffre;
  }

  // ✅ Modifier une offre
  updateOffre(id: number, updated: Partial<Offre>): boolean {
    const index = this.offres.findIndex(o => o.id === id);
    if (index !== -1) {
      this.offres[index] = { ...this.offres[index], ...updated };
      return true;
    }
    return false;
  }

  // ✅ Supprimer une offre
  deleteOffre(id: number): boolean {
    const index = this.offres.findIndex(o => o.id === id);
    if (index !== -1) {
      this.offres.splice(index, 1);
      return true;
    }
    return false;
  }
}



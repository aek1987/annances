// src/app/service/offre.service.ts
import { Injectable } from '@angular/core';
import { Offre } from '../modeles/offres';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../modeles/page';
@Injectable({ providedIn: 'root' }) export class OffresService {

private offres: Offre[] = [
  {
    id: 1,
    entrepriseId: 101,
    poste: 'Développeur Angular',
    description: 'Développement d’applications Angular 16 avec intégration REST et gestion des états.',
    missions: [
      'Développer et maintenir des applications Angular 16',
      'Intégrer des API REST et gérer les états de l’application',
      'Collaborer avec l’équipe backend pour assurer la cohérence des fonctionnalités',
      'Participer aux revues de code et aux tests unitaires'
    ],
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
    status: undefined
    
  },
  {
    id: 2,
    entrepriseId: 101,
    poste: 'Data Analyst',
    description: 'Analyse et visualisation des données financières pour prise de décision.',
    missions: [
      'Collecter et analyser les données financières',
      'Créer des tableaux de bord et rapports Power BI/Excel',
      'Identifier les tendances et recommander des actions',
      'Collaborer avec les équipes finance et marketing'
    ],
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
    status: undefined

  },
  {
    id: 3,
    entrepriseId: 101,
    poste: 'Développeur Java',
    description: 'Développement backend avec Spring Boot, intégration API et tests unitaires.',
    missions: [
      'Développer et maintenir des applications backend avec Spring Boot',
      'Intégrer et sécuriser des API REST',
      'Écrire des tests unitaires et fonctionnels',
      'Participer aux revues de code et à la documentation technique'
    ],
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
    status: undefined
  
  },
  {
    id: 4,
    entrepriseId: 102,
    poste: 'UX/UI Designer',
    description: 'Conception et prototypage d’interfaces web et mobile.',
    missions: [
      'Concevoir des maquettes et prototypes interactifs',
      'Collaborer avec les équipes produit et développement',
      'Effectuer des tests utilisateurs et recueillir des retours',
      'Maintenir une cohérence visuelle sur tous les supports'
    ],
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
    status: undefined

  },
  {
    id: 5,
    entrepriseId: 102,
    poste: 'Chef de projet IT',
    description: 'Gestion de projets informatiques, coordination des équipes et planning.',
    missions: [
      'Planifier et suivre les projets IT',
      'Coordonner les équipes techniques et métiers',
      'Assurer le respect des délais et budgets',
      'Gérer les risques et rédiger les rapports de projet'
    ],
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
    status: undefined
  
  },
  {
    id: 6,
    entrepriseId: 102,
    poste: 'Consultant Cloud',
    description: 'Implémentation et optimisation des solutions cloud AWS/Azure.',
    missions: [
      'Déployer et configurer des solutions cloud AWS/Azure',
      'Optimiser les performances et la sécurité',
      'Automatiser les processus avec DevOps et Docker',
      'Conseiller les clients sur les meilleures pratiques cloud'
    ],
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
    status: undefined
   
  },
  {
    id: 7,
    entrepriseId: 103,
    poste: 'Marketing Digital',
    description: 'Gestion des campagnes marketing, SEO/SEA et analyse des KPI.',
    missions: [
      'Planifier et exécuter des campagnes marketing',
      'Optimiser le référencement SEO/SEA',
      'Analyser les KPI et produire des rapports',
      'Gérer les réseaux sociaux et la publicité en ligne'
    ],
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
    status: undefined
   
  }
];
 private nextId = 3;
 //private apiUrl = `${environment.apiUrl}/api/offres`;   
private apiUrl = `http://localhost:8080/api/offres`;  



constructor(private http: HttpClient) {}
 

  // ✅ Récupérer toutes les offres
  getAllOffres():Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);}
    
 getOffresPaged(page: number = 0, size: number = 12, sortBy: string = 'datePublication', sortDir: string = 'desc'): Observable<Page<Offre>> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.http.get<Page<Offre>>(`${this.apiUrl}/paged`, { params });
}
   

   // ✅ Récupérer une offre par ID depuis le backend
  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`);
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
  updateOffre(id: number, offre: Partial<Offre>): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/${id}`, offre);
  }
  

  // ✅ Supprimer une offre
  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}



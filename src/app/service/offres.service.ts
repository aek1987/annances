// src/app/service/offre.service.ts
import { Injectable } from '@angular/core';
import { Offre } from '../modeles/offres';

@Injectable({ providedIn: 'root' }) export class OffresService {

  private offres: Offre[] = [
  {
    id: 1,
    entrepriseId: 101, // Id de l’entreprise TechCorp
    titre: 'Développeur Angular',
    description: 'Développement d’applications Angular 16.',
    localisation: 'Paris',
    salaire: 40000,
    contrat: 'CDI',
    datePublication: new Date('2025-01-10')
  },
  {
    id: 2,
    entrepriseId: 102, // Id de l’entreprise FinancePro
    titre: 'Data Analyst',
    description: 'Analyse de données financières.',
    localisation: 'Lyon',
    salaire: 35000,
    contrat: 'CDD',
    datePublication: new Date('2025-02-05')
  },
  {
    id: 3,
    entrepriseId: 103, // Id de l’entreprise CodeFactory
    titre: 'Développeur Java',
    description: 'Développement backend avec Spring Boot.',
    localisation: 'Remote',
    salaire: 42000,
    contrat: 'Remote',
    datePublication: new Date('2025-03-15')
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



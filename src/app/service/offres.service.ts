// src/app/service/offre.service.ts
import { Injectable } from '@angular/core';
import { Offre } from '../modeles/offres';

@Injectable({ providedIn: 'root' })
export class OffresService {
  private offres: Offre[] = [
    { id: 1, entrepriseId: 1, titre: 'Développeur Angular', description: 'Créer et maintenir des applications Angular.', localisation: 'Alger', datePublication: new Date() },
    { id: 2, entrepriseId: 2, titre: 'Ingénieur Data', description: 'Analyser et traiter des données massives.', localisation: 'Oran', datePublication: new Date() }
  ];

  // ✅ Récupérer toutes les offres d'une entreprise
  getOffresByEntreprise(entrepriseId: number): Offre[] {
    return this.offres.filter(o => o.entrepriseId === entrepriseId);
  }

  // ✅ Ajouter une nouvelle offre
  addOffre(offre: Offre): void {
    offre.id = this.offres.length + 1; // auto-incrément
    offre.datePublication = new Date();
    this.offres.push(offre);
  }
}

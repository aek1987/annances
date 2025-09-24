// src/app/services/entreprise.service.ts
import { Injectable } from '@angular/core';
import { Entreprise } from '../modeles/entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
   private entreprises: Entreprise[] = [
    { id: 1, username: 'TechCorp SARL', email: 'hr@techcorp.com', phone: '021-123-456', secteur: 'Informatique' },
    { id: 2, username: 'Foodly Group', email: 'jobs@foodly.com', phone: '021-654-987', secteur: 'Agroalimentaire' }
  ];

  getById(id: number): Entreprise | undefined {
    return this.entreprises.find(e => e.id === id);
  }
   getEntreprises(): Entreprise[] {
    return this.entreprises;
  }
}

import { Injectable } from '@angular/core';
import { Entreprise } from '../modeles/entreprise';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private entreprises: Entreprise[] = [
    { id: 1, username: 'TechCorp SARL', email: 'hr@techcorp.com', phone: '021-123-456', secteur: 'Informatique', description: 'Société innovante spécialisée dans le développement logiciel.', logo: '../../assets/company.png' },
    { id: 2, username: 'Foodly Group', email: 'jobs@foodly.com', phone: '021-654-987', secteur: 'Agroalimentaire', description: 'Leader dans la transformation agroalimentaire.', logo: '../../assets/company.png' },
    { id: 3, username: 'GreenTech Solutions', email: 'contact@greentech.com', phone: '021-987-123', secteur: 'Energie renouvelable', description: 'Entreprise écoresponsable spécialisée dans l’énergie solaire.', logo: '../../assets/company.png' },
    { id: 4, username: 'MediCare', email: 'recrutement@medicare.com', phone: '021-555-666', secteur: 'Santé', description: 'Clinique privée de référence.', logo: '../../assets/company.png' }
  ];

  constructor(private authService: AuthService) {}

  // 🔹 Retourne l’entreprise connectée (via AuthService)
  getEntrepriseConnectee(): Entreprise | null {
    const account = this.authService.getUser();
    if (!account || account.role !== 'entreprise') return null;

    // Cherche l’entreprise correspondante
    const entreprise = this.entreprises.find(e => e.id === account.refId);
    return entreprise || null;
  }

  // ✅ Liste complète
  getEntreprises(): Entreprise[] {
    return this.entreprises;
  }

  // ✅ Recherche par ID
  getEntrepriseById(id: number): Entreprise | undefined {
    return this.entreprises.find(e => e.id === id);
  }

  // ✅ Recherche par nom ou secteur
  searchEntreprise(query: string): Entreprise[] {
    return this.entreprises.filter(e =>
      e.username.toLowerCase().includes(query.toLowerCase()) ||
      e.secteur?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

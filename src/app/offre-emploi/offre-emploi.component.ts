import { Component } from '@angular/core';

interface OffreEmploi {
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
}

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.css']
})
export class OffreEmploiComponent {
  searchTerm: string = '';
  selectedCompany: string = 'all';

  companies: string[] = ['all', 'Entreprise A', 'Entreprise B', 'Entreprise C'];

  offres: OffreEmploi[] = [
    { title: 'Développeur Angular', company: 'Entreprise A', location: 'Paris', salary: 50000, description: 'Développement frontend Angular.' },
    { title: 'Administrateur Système', company: 'Entreprise B', location: 'Lyon', salary: 45000, description: 'Gestion de serveurs Linux.' },
    { title: 'Data Analyst', company: 'Entreprise C', location: 'Marseille', salary: 48000, description: 'Analyse de données et reporting.' },
    { title: 'Développeur Backend', company: 'Entreprise A', location: 'Paris', salary: 52000, description: 'Développement API REST.' },
  ];

  get filteredOffres(): OffreEmploi[] {
    return this.offres.filter(offre => {
      const matchesSearch = this.searchTerm ? 
        offre.title.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesCompany = this.selectedCompany === 'all' ? true : offre.company === this.selectedCompany;
      return matchesSearch && matchesCompany;
    });
  }
}

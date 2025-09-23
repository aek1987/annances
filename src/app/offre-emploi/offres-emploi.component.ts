import { Component, OnInit } from '@angular/core';

interface Offre {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: number;
  contract: string;
  favori?: boolean;
  status?: 'postulé' | 'en cours' | 'accepté' | 'refusé';
}
interface Candidature {
  offre: string;
  status: string;
}
@Component({
  selector: 'app-offres-emploi',
  templateUrl: './offres-emploi.component.html',
  styleUrls: ['./offres-emploi.component.css']
})
export class OffresEmploiComponent implements OnInit {
  // 🔎 Champs recherche
  searchTerm: string = '';
  searchLocation: string = '';
  searchSalary: number | null = null;
  searchExperience: string = '';

  // 🎯 Filtres
  selectedContract: string = '';
  selectedRemote: string = '';
  selectedSector: string = '';
  sectors: string[] = ['Informatique', 'Finance', 'Santé', 'Éducation'];

  // 📩 Alerte email
  alertEmail: string = '';

  // 📂 Données d’exemple
  offres: Offre[] = [
    {
      id: 1,
      title: 'Développeur Angular',
      company: 'TechCorp',
      location: 'Paris',
      description: 'Développement d’applications Angular 16.',
      salary: 40000,
      contract: 'CDI'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'FinancePro',
      location: 'Lyon',
      description: 'Analyse de données financières.',
      salary: 35000,
      contract: 'CDD'
    },
    {
      id: 3,
      title: 'Développeur Java',
      company: 'CodeFactory',
      location: 'Remote',
      description: 'Développement backend avec Spring Boot.',
      salary: 42000,
      contract: 'Remote'
    }
  ];

  filteredOffres: Offre[] = [];
// Pour gérer les onglets
activeTab: 'offres' | 'profil' = 'offres';

// Profil
profil = {
  nom: '',
  email: '',
  telephone: '',
  experience: '',
  competences: [] as string[],
  cv: ''
};
// 🔹 Suivi des candidatures
candidatures: Candidature[] = [];
newSkill: string = '';

addSkill() {
  if (this.newSkill.trim()) {
    this.profil.competences.push(this.newSkill.trim());
    this.newSkill = '';
  }
}

removeSkill(index: number) {
  this.profil.competences.splice(index, 1);
}

uploadCV(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.profil.cv = file.name;
  }
}

saveProfile() {
  alert('Profil sauvegardé avec succès ✅');
  console.log(this.profil);
}
// 🔹 Mettre à jour le profil
  updateProfil() {
    alert(`Profil mis à jour : ${this.profil.nom}, ${this.profil.email}`);
    // Ici tu pourrais enregistrer en backend via API
  }
  ngOnInit(): void {
    this.filteredOffres = this.offres;
  }

  // 🔎 Appliquer les filtres
  applyFilters() {
    this.filteredOffres = this.offres.filter(offre => {
      return (
        (!this.searchTerm || offre.title.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.searchLocation || offre.location.toLowerCase().includes(this.searchLocation.toLowerCase())) &&
        (!this.searchSalary || offre.salary >= this.searchSalary) &&
        (!this.selectedContract || offre.contract === this.selectedContract) &&
        (!this.selectedRemote ||
          (this.selectedRemote === 'oui' && offre.contract === 'Remote') ||
          (this.selectedRemote === 'non' && offre.contract !== 'Remote')) &&
        (!this.selectedSector || offre.description.toLowerCase().includes(this.selectedSector.toLowerCase()))
      );
    });
  }

  // ✅ Postuler
  postuler(offre: Offre) {
    offre.status = 'postulé';
    alert(`Vous avez postulé à : ${offre.title}`);
  }

  // ⭐ Favoris
  toggleFavori(offre: Offre) {
    offre.favori = !offre.favori;
  }

  // 📩 Abonnement alertes
  subscribeAlert() {
    if (this.alertEmail) {
      alert(`Abonnement activé pour : ${this.alertEmail}`);
      this.alertEmail = '';
    } else {
      alert('Veuillez entrer un email.');
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Offre } from "src/app/modeles/offres";
import { EntrepriseService } from "src/app/service/entreprise.service";
import { OffresService } from "src/app/service/offres.service";


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
offres: Offre[] = [];
  constructor(private offreService: OffresService,private entrepriseService :EntrepriseService) {}




  
  ngOnInit(): void {
    // 🔥 Appel du service pour charger les offres
    this.offres = this.offreService.getAllOffres();
    this.filteredOffres = this.offres;   
  }

getEntrepriseNom(id: number): string {
  const entreprise = this.entrepriseService.getEntrepriseById(id);
  return entreprise ? entreprise.username : 'Entreprise inconnue';
}

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
 

  // 🔎 Appliquer les filtres
  applyFilters() {
    this.filteredOffres = this.offres.filter(offre => {
      return (
        (!this.searchTerm || offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.searchLocation || offre.localisation.toLowerCase().includes(this.searchLocation.toLowerCase())) &&
        (!this.searchSalary || offre.salaire >= this.searchSalary) &&
        (!this.selectedContract || offre.contrat === this.selectedContract) &&
        (!this.selectedRemote ||
          (this.selectedRemote === 'oui' && offre.contrat === 'Remote') ||
          (this.selectedRemote === 'non' && offre.contrat !== 'Remote')) &&
        (!this.selectedSector || offre.description.toLowerCase().includes(this.selectedSector.toLowerCase()))
      );
    });
  }

  // ✅ Postuler
  postuler(offre: Offre) {
    offre.status = 'postulé';
    alert(`Vous avez postulé à : ${offre.titre}`);
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

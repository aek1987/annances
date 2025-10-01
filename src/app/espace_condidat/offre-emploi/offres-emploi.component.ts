import { Component, OnInit } from "@angular/core";
import { Candidat } from "src/app/modeles/candidat";
import { Entreprise } from "src/app/modeles/entreprise";
import { Offre } from "src/app/modeles/offres";
import { AuthService } from "src/app/service/auth.service";
import { CandidatService } from "src/app/service/candidate.service";
import { CandidatureService } from "src/app/service/candidature.service";
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
 candidatConnecte: Candidat | null = null;

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
entrepise: Entreprise  | undefined
newSkill: string = '';
offres: Offre[] = [];
  constructor(private offreService: OffresService,private entrepriseService :EntrepriseService ,  private candidatService: CandidatService,
 private candidature: CandidatureService

  ) {}
  
  ngOnInit(): void {
    // 🔥 Appel du service pour charger les offres
    this.offres = this.offreService.getAllOffres();
    this.filteredOffres = this.offres;   
   this.candidatConnecte = this.candidatService.getCandidatConnecte();
    console.log("condidat name  "+this.candidatConnecte?.username +" id= "+this.candidatConnecte?.refId);
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
    const entreprise = this.getentreprise(offre.entrepriseId);

    return (
      (!this.searchTerm || offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.searchLocation || offre.localisation.toLowerCase().includes(this.searchLocation.toLowerCase())) &&
      (!this.searchSalary || offre.salaire >= this.searchSalary) &&
      (!this.selectedContract || offre.contrat === this.selectedContract) &&
      (!this.selectedRemote ||
        (this.selectedRemote === 'oui' && offre.contrat === 'Remote') ||
        (this.selectedRemote === 'non' && offre.contrat !== 'Remote')) &&
      (!this.selectedSector || (entreprise && entreprise.secteur.toLowerCase() === this.selectedSector.toLowerCase()))
    );
  });
}


  // ✅ Postuler
  postuler(offre: Offre) {
   if (!this.candidatConnecte) {
    alert('Vous devez être connecté pour postuler.');
    return;
  }

  // Appelle le service pour créer la candidature
  const candidature = this.candidature.addCandidature(
    offre.id,
    this.candidatConnecte.refId,
    "Je suis très intéressé par cette offre." // message de candidature
  );

  // Change le statut de l’offre
  offre.status = 'postulé';

  // Confirmation
  alert(`✅ Vous avez postulé à : ${offre.titre}\nCandidature ID : ${candidature.id}`);
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
    getentreprise    (entrepriseId :number) : Entreprise  | undefined
    {
    const entrepise = this.entrepriseService.getEntrepriseById(entrepriseId);
    
    return entrepise;
  
    }
  
}

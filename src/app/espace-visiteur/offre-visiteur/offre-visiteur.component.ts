import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/modeles/candidat';
import { Candidature } from 'src/app/modeles/candidature';
import { Entreprise } from 'src/app/modeles/entreprise';
import { Offre } from 'src/app/modeles/offres';
import { CandidatureService } from 'src/app/service/candidature.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-offre-visiteur',
  templateUrl: './offre-visiteur.component.html',
  styleUrls: ['./offre-visiteur.component.css']
})
export class OffreVisiteurComponent implements OnInit {
  // 🔎 Champs recherche
  searchTerm: string = '';
  searchLocation: string = '';
  searchSalary: number | null = null;
  searchExperience: string = '';
  // 🎯 Filtres
  selectedContract: string = '';
 
  selectedSector: string = '';
  sectors: string[] = ['Informatique', 'Finance', 'Santé', 'Éducation','Energie','Finance', 'Marketing'];
  // 📩 Alerte email
  alertEmail: string = '';
  // 📂 Données d’exemple
  filteredOffres: Offre[] = [];
// Pour gérer les onglets
  activeTab: 'offres' | 'profil' = 'offres';
 candidatConnecte: Candidat | null = null;
contracts: string[] = ['CDI', 'CDD', 'Stage', 'freelance'];
// 🔹 Suivi des candidatures
candidatures: Candidature[] = [];
entrepise: Entreprise  | undefined
newSkill: string = '';
offres: Offre[] = [];
  constructor(private offreService: OffresService,private entrepriseService :EntrepriseService ,  
 private candidature: CandidatureService

  ) {}
  
  ngOnInit(): void {
    // 🔥 Appel du service pour charger les offres
    this.offres = this.offreService.getAllOffres();
    this.filteredOffres = this.offres;   
   // this.candidatConnecte = this.candidatService.getCandidatConnecte();
   // console.log("condidat name  "+this.candidatConnecte?.username +" id= "+this.candidatConnecte?.refId);
  }
selectedContracts: string[] = [];
isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

onCheckboxChange(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.selectedContracts.push(value);
  } else {
    this.selectedContracts = this.selectedContracts.filter(c => c !== value);
  }
  this.applyFilters();
}


selectedSectors: string[] = [];
isSectorDropdownOpen = false;

toggleSectorDropdown() {
  this.isSectorDropdownOpen = !this.isSectorDropdownOpen;
}

onSectorCheckboxChange(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.selectedSectors.push(value);
  } else {
    this.selectedSectors = this.selectedSectors.filter(s => s !== value);
  }
  this.applyFilters();
}
// Télétravail
remoteOptions: string[] = ['Présentiel', 'Télétravail partiel', '100% Télétravail'];
selectedRemote: string[] = [];
isRemoteDropdownOpen = false;

toggleRemoteDropdown() {
  this.isRemoteDropdownOpen = !this.isRemoteDropdownOpen;
}

onRemoteCheckboxChange(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.selectedRemote.push(value);
  } else {
    this.selectedRemote = this.selectedRemote.filter(r => r !== value);
  }
  this.applyFilters();
}












applyFilters() {
  this.filteredOffres = this.offres.filter(offre => {
    const entreprise = this.getentreprise(offre.entrepriseId);

    const contratMatch = this.selectedContracts.length === 0 || this.selectedContracts.includes(offre.contrat!);
    const secteurMatch = this.selectedSectors.length === 0 || (entreprise && this.selectedSectors.includes(entreprise.secteur));
    const remoteMatch = this.selectedRemote.length === 0 || (offre.teletravail && this.selectedRemote.includes(offre.teletravail));

    return (
      (!this.searchTerm || offre.poste.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.searchLocation || offre.localisation.toLowerCase().includes(this.searchLocation.toLowerCase())) &&
      (!this.searchSalary || offre.salaire >= this.searchSalary) &&
      contratMatch &&
      secteurMatch &&
      remoteMatch
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

   // Confirmation
  alert(`✅ Vous avez postulé à : ${offre.poste}\nCandidature ID : ${candidature.id}`);
  }

  // ⭐ Favoris
  toggleFavori(offre: Offre) {
    offre.favori = !offre.favori;
  }

  
  getentreprise    (entrepriseId :number) : Entreprise  | undefined
  {
  const entrepise = this.entrepriseService.getEntrepriseById(entrepriseId);
  
  return entrepise;

  }
gotodetail(offre :Offre){

//this.router.navigate(['/offre-detail', offre.id]);
console.log("offree selectione par visiteur "+offre.id);
}
}


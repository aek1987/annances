import { Component, OnInit } from "@angular/core";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Candidat } from "src/app/modeles/candidat";
import { Entreprise } from "src/app/modeles/entreprise";
import { Offre } from "src/app/modeles/offres";
import { AlerteEmploiService } from "src/app/service/alerte-emploi.service";

import { CandidatService } from "src/app/service/candidate.service";
import { EntrepriseService } from "src/app/service/entreprise.service";
import { OffresService } from "src/app/service/offres.service";
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { Alerte } from "src/app/modeles/alerte";

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
  selectedSector: string = '';
  sectors: string[] = ['Informatique', 'Finance', 'Santé', 'Éducation'];
  // 📩 Alerte email
  alertEmail: string = '';
  // 📂 Données d’exemple
  filteredOffres: Offre[] = [];
// Pour gérer les onglets
  activeTab: 'offres' | 'profil' = 'offres';
 candidatConnecte: Candidat | null = null;
contracts: string[] = ['CDI', 'CDD', 'Stage', 'freelance'];
faBell = faBell;faSearch = faSearch;
faSolidStar = faSolidStar;  faRegularStar =faRegularStar;
// Profil
profil = {  nom: '',  email: '',  telephone: '',  experience: '',  competences: [] as string[],  cv: ''};

// 🔹 Suivi des candidatures
candidatures: Candidature[] = [];
entrepise: Entreprise  | undefined
newSkill: string = '';
offres: Offre[] = [];
currentPage = 1;
itemsPerPage = 12; // nombre d'offres par page
totalPages = 1;

isLoading = true;
  constructor(private offreService: OffresService,
    private entrepriseService :EntrepriseService ,     
     private candidatService: CandidatService,
     private alerteEmploiService :AlerteEmploiService 
    ) {}
      
  ngOnInit(): void {
    this.isLoading = true;
    // 🔥 Appel du service pour charger les offres
   this.offreService.getAllOffres().subscribe({
  next: (data) => {
  
      this.offres = data;
      this.filteredOffres = [...this.offres];
      this.isLoading = false;
       console.log('chargement des offres',  this.offres);
  },
  error: (err) => {
    console.error('Erreur lors du chargement des offres', err);
    this.isLoading = false;
  }
});

    
   this.candidatConnecte = this.candidatService.getCandidatConnecte();
    console.log("condidat name  "+this.candidatConnecte?.username +" id= "+this.candidatConnecte?.refId);
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
onSectorCheckboxChange(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.selectedSectors.push(value);
  } else {
    this.selectedSectors = this.selectedSectors.filter(s => s !== value);
  }
  this.applyFilters();
}

selectedSectors: string[] = [];
isSectorDropdownOpen = false;

toggleSectorDropdown() {
  this.isSectorDropdownOpen = !this.isSectorDropdownOpen;
}// Télétravail
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
   this.totalPages = Math.ceil(this.filteredOffres.length / this.itemsPerPage);
  this.currentPage = 1; // reset pag
}


 

  // ⭐ Favoris
  toggleFavori(offre: Offre) {


 
    this.candidatService.toggleFavori(offre.id )

  }
 
  estFavori(offreid: number):boolean
  
  {
    return this.candidatService.isFavori(offreid );

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
creerAlerte() {
  // Vérifie qu’au moins un critère de recherche est présent
  if (
    !this.searchTerm &&
    !this.searchLocation &&
    this.selectedContracts.length === 0 &&
    this.selectedSectors.length === 0 &&
    this.selectedRemote.length === 0
  ) {
    alert("❗ Veuillez entrer au moins un critère ou un filtre avant de créer une alerte.");
    return;
  }

 const alerte: Alerte = {
    id: Date.now(),
    motCle: this.searchTerm || 'Tous les postes',
    lieu: this.searchLocation || 'Partout',
    contrats: this.selectedContracts,
    secteurs: this.selectedSectors,
    teletravail: this.selectedRemote,
    frequence: 'hebdomadaire',
    active: true,
    dateCreation: new Date(),
    email: this.alertEmail
  };

  // ✅ Enregistrer l’alerte via le service
  this.alerteEmploiService.addAlerte(alerte).subscribe({
    next: () => {
      alert(`✅ Alerte créée avec succès pour "${alerte.motCle}" (${alerte.lieu})`);
      // Optionnel : rediriger vers la page des alertes
      // this.router.navigate(['/alertes']);
    },
    error: (err) => {
      console.error('Erreur lors de la création de l’alerte :', err);
      alert('❌ Une erreur est survenue lors de la création de l’alerte.');
    }
  });
}
// Pagination
  get pagedOffres(): Offre[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOffres.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }


 
}

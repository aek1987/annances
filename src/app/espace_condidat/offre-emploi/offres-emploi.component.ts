import { Component, OnInit } from "@angular/core";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Candidat } from "src/app/modeles/candidat";
import { Entreprise } from "src/app/modeles/entreprise";
import { Offre } from "src/app/modeles/offres";
import { AlerteEmploiService } from "src/app/service/alerte-emploi.service";

import { CandidatService } from "src/app/service/candidate.service";
import { EntrepriseService } from "src/app/service/entreprise.service";
import { OffresService } from "src/app/service/offres.service";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { Alerte } from "src/app/modeles/alerte";
import { Page } from "src/app/modeles/page";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

interface Candidature {
  offre: string;
  status: string;
}
@Component({
  selector: "app-offres-emploi",
  templateUrl: "./offres-emploi.component.html",
  styleUrls: ["./offres-emploi.component.css"],
})
export class OffresEmploiComponent implements OnInit {
  // 🔎 Champs recherche
  searchTerm: string = "";
  searchLocation: string = "";
  searchSalary: number | null = null;
  searchExperience: string = "";
  // 🎯 Filtres
  selectedContract: string = "";
  selectedSector: string = "";
  sectors: string[] = ["Informatique", "Finance", "Santé", "Éducation"];
  // 📩 Alerte email
  alertEmail: string = "";
  // 📂 Données d’exemple
  filteredOffres: Offre[] = [];
  // Pour gérer les onglets
  activeTab: "offres" | "profil" = "offres";
  candidatConnecte: Candidat | null = null;
  contracts: string[] = ["CDI", "CDD", "Stage", "freelance"];
  faBell = faBell;
  faSearch = faSearch;
  faSolidStar = faSolidStar;
  faRegularStar = faRegularStar;
  // Profil
  profil = {
    nom: "",
    email: "",
    telephone: "",
    experience: "",
    competences: [] as string[],
    cv: "",
  };

  // 🔹 Suivi des candidatures
  candidatures: Candidature[] = [];
  entrepise: Entreprise | undefined;
  newSkill: string = "";
  offres: Offre[] = [];
  currentPage = 1;
  size = 6; // nombre d'offres par page
  totalPages = 10;
  page: number = 0;
  isLoading = true;

  isExperienceDropdownOpen = false;
  experiences = ["Débutant", "1-2 ans", "3-5 ans", "6-10 ans", "10+ ans"];
  selectedExperiences: string[] = [];

  isSalaireDropdownOpen = false;
  salaires: string[] = [    "Moins de 1 000 €",    "1 000 € - 2 000 €",    "2 000 € - 3 000 €",
    "3 000 € - 5 000 €",    "Plus de 5 000 €",  ];  
  selectedSalaires: string[] = [];
  selectedContracts: string[] = [];
  isDropdownOpen = false;
  selectedSectors: string[] = [];
  isSectorDropdownOpen = false;
   // Télétravail
  remoteOptions: string[] = [    "Présentiel",    "Télétravail partiel",    "100% Télétravail"  ];
  selectedRemote: string[] = [];
  isRemoteDropdownOpen = false;
  entreprisesMap: Map<number, Entreprise> = new Map(); 
  constructor(
    private offreService: OffresService,
    private entrepriseService: EntrepriseService,
    private candidatService: CandidatService,
    private alerteEmploiService: AlerteEmploiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = false;

    const data = this.route.snapshot.data["offresData"];
    this.filteredOffres = data.content;
    this.currentPage = data.number;
    this.totalPages = data.totalPages;
    console.log(" Offres préchargées via resolver :", this.filteredOffres);


// Charger les entreprises pour chaque offre
  this.filteredOffres.forEach(offre => {
    if (offre.entrepriseId && !this.entreprisesMap.has(offre.entrepriseId)) {
      this.entrepriseService.getEntrepriseById(offre.entrepriseId).subscribe({
        next: (entreprise) => {
          this.entreprisesMap.set(offre.entrepriseId, entreprise);
        },
        error: (err) => {
          console.error(`Erreur chargement entreprise ${offre.entrepriseId}`, err);
        }
      });
    }
  });


    this.candidatService.getCandidatConnecte().subscribe((candidat) => {
      this.candidatConnecte = candidat;
      console.log("👤 Candidat connecté  from offre emploi:", candidat);
    });

    console.log(
      "condidat name  " +
        this.candidatConnecte?.username +
        " id= " +
        this.candidatConnecte?.refId
    );
  }
  loadOffres(page: number = 0) {
    this.offreService.getOffresPaged(page, this.size).subscribe({
      next: (data: Page<Offre>) => {
        this.offres = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number + 1; // data.number est 0-based
        this.isLoading = false;
        this.filteredOffres = this.offres;
        console.log("page  offres recuperer =", data);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // ✅ Gestion des cases à cocher
 onCheckboxChange(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.selectedContracts.push(value);
  } else {
    this.selectedContracts = this.selectedContracts.filter(c => c !== value);
  }
  this.applyFilters(); // <-- appel API à chaque changement
}

  onSectorCheckboxChange(event: any) {
     const value = event.target.value;
  if (event.target.checked) {
    this.selectedContracts.push(value);
  } else {
    this.selectedContracts = this.selectedContracts.filter(c => c !== value);
  }
  this.applyFilters(); // <-- appel API à chaque changement
  }
 
  onRemoteCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedRemote.push(value);
    } else {
      this.selectedRemote = this.selectedRemote.filter((r) => r !== value);
    }
    this.applyFilters();
  }
  onCheckboxChangeSalaire(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.selectedSalaires.push(value);
    } else {
      this.selectedSalaires = this.selectedSalaires.filter((s) => s !== value);
    }
  } 
  toggleSectorDropdown() {
    this.isSectorDropdownOpen = !this.isSectorDropdownOpen;
  }
  toggleRemoteDropdown() {
    this.isRemoteDropdownOpen = !this.isRemoteDropdownOpen;
  }

 getEntreprise(entrepriseId: number): void {
    this.entrepriseService.getEntrepriseById(entrepriseId).subscribe({
      next: (data) => {
        this.entrepise = data;
        console.log('✅ Entreprise chargée fromhtml appel :', data);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement :', err);
      }
    });
  }
// 🔹 Mettre à jour le profil
  addSkill() {
    if (this.newSkill.trim()) {
      this.profil.competences.push(this.newSkill.trim());
      this.newSkill = "";
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
    alert("Profil sauvegardé avec succès ✅");
    console.log(this.profil);
  }
  
  updateProfil() {
    alert(`Profil mis à jour : ${this.profil.nom}, ${this.profil.email}`);
    // Ici tu pourrais enregistrer en backend via API
  }


  // ⭐ Favoris
addFavoris(offre: Offre) {
  this.candidatService.getCandidatConnecte().subscribe(candidat => {
    if (!candidat) return;

    const favoris = candidat.favoris || [];
    const isFavori = favoris.includes(offre.id);

    if (isFavori) {
      // ❌ Supprimer le favori
      this.candidatService.removeFavori(candidat.refId, offre.id).subscribe(() => {
        console.log(`Offre ${offre.id} supprimée des favoris`);
        // mettre à jour l’état local si besoin
      });
    } else {
      // ✅ Ajouter le favori
      this.candidatService.addFavori(candidat.refId, offre.id).subscribe(() => {
        console.log(`Offre ${offre.id} ajoutée aux favoris`);
        // mettre à jour l’état local si besoin
      });
    }
  });
}

  estFavori(offreid: number): boolean {
    return true; // this.candidatService.isFavori(offreid );
  }

  // 📩 Abonnement alertes
  subscribeAlert() {
    if (this.alertEmail) {
      alert(`Abonnement activé pour : ${this.alertEmail}`);
      this.alertEmail = "";
    } else {
      alert("Veuillez entrer un email.");
    }
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
      alert(
        "❗ Veuillez entrer au moins un critère ou un filtre avant de créer une alerte."
      );
      return;
    }

    const alerte: Alerte = {
      id: Date.now(),
      motCle: this.searchTerm || "Tous les postes",
      lieu: this.searchLocation || "Partout",
      contrats: this.selectedContracts,
      secteurs: this.selectedSectors,
      teletravail: this.selectedRemote,
      frequence: "hebdomadaire",
      active: true,
      dateCreation: new Date(),
      email: this.alertEmail,
    };

    // ✅ Enregistrer l’alerte via le service
    this.alerteEmploiService.addAlerte(alerte).subscribe({
      next: () => {
        alert(
          `✅ Alerte créée avec succès pour "${alerte.motCle}" (${alerte.lieu})`
        );
        // Optionnel : rediriger vers la page des alertes
        // this.router.navigate(['/alertes']);
      },
      error: (err) => {
        console.error("Erreur lors de la création de l’alerte :", err);
        alert("❌ Une erreur est survenue lors de la création de l’alerte.");
      },
    });
  }
  // Pagination
  get pagedOffres(): Offre[] {
    const start = (this.currentPage - 1) * this.size;
    return this.filteredOffres.slice(start, start + this.size);
  }

 
  toggleExperienceDropdown() {
    this.isExperienceDropdownOpen = !this.isExperienceDropdownOpen;
  }
  toggleSalaireDropdown() {
    this.isSalaireDropdownOpen = !this.isSalaireDropdownOpen;
  }



   nextPage() {
    if (this.currentPage < this.totalPages) {
      this.page++; // page côté serveur, 0-based
     this.loadOffres(this.page);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.page--;
     this.loadOffres(this.page);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
applyFilters() {
  this.isLoading = true;

  this.offreService.getOffresFiltered(
    0, // première page
    this.size,
    this.searchTerm,
    this.searchLocation,
    this.selectedContracts,
    this.selectedSectors,
    this.selectedRemote,
    this.selectedExperiences,
    this.selectedSalaires
  ).subscribe({
    next: (data) => {
      this.filteredOffres = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = 1;
      this.isLoading = false;

      // Charger les entreprises pour chaque offre
      this.filteredOffres.forEach(offre => {
        if (offre.entrepriseId && !this.entreprisesMap.has(offre.entrepriseId)) {
          this.entrepriseService.getEntrepriseById(offre.entrepriseId).subscribe({
            next: (entreprise) => this.entreprisesMap.set(offre.entrepriseId, entreprise)
          });
        }
      });
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}

}

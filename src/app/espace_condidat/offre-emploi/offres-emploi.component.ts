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
import { Candidature } from "src/app/modeles/candidature";


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
  size = 10; // nombre d'offres par page
  totalPages = 10;
  page: number = 0;
  isLoading = true;

  isExperienceDropdownOpen = false;
  experiences = ["Débutant", "1-2 ans", "3-5 ans", "6-10 ans", "10+ ans"];
  selectedExperiences: string[] = [];

  isSalaireDropdownOpen = false;
  salaires: string[] = [
    "Moins de 1 000 €",
    "1 000 € - 2 000 €",
    "2 000 € - 3 000 €",
    "3 000 € - 5 000 €",
    "Plus de 5 000 €",
  ];
  selectedSalaires: string[] = [];
  selectedContracts: string[] = [];
  isDropdownOpen = false;
  selectedSectors: string[] = [];
  isSectorDropdownOpen = false;
  // Télétravail
  remoteOptions: string[] = [
    "Présentiel",
    "Télétravail partiel",
    "100% Télétravail",
  ];
  selectedRemote: string="";
  isRemoteDropdownOpen = false;
  entreprisesMap: Map<number, Entreprise> = new Map();
  favorisMap: { [offreId: number]: boolean } = {};
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

  console.log("Offres préchargées via resolver :", this.filteredOffres);

  // Charger le candidat connecté avant de vérifier les favoris
  this.candidatService.getCandidatConnecte().subscribe({
    next: (candidat) => {
      this.candidatConnecte = candidat;
    
       console.log("👤 account Candidat connecté :", this.candidatConnecte);
      if (!this.candidatConnecte!.refId) {
        console.warn("⚠️ Aucun candidat connecté, favoris désactivés");
        return;
      }

      // Vérifier si chaque offre est un favori
      this.filteredOffres.forEach((offre) => {
        if (offre.id != null) {
          this.candidatService.isFavori( this.candidatConnecte!.refId, offre.id!).subscribe({
            next: (isFav: boolean) => {
              this.favorisMap[offre.id!] = isFav;
            },
            error: (err) => {
              console.error(`Erreur vérif favori pour offre ${offre.id}`, err);
              this.favorisMap[offre.id!] = false;
            }
          });
        }

        // Charger les entreprises
        if (offre.entrepriseId && !this.entreprisesMap.has(offre.entrepriseId)) {
          this.entrepriseService.getEntrepriseById(offre.entrepriseId).subscribe({
            next: (entreprise) => this.entreprisesMap.set(offre.entrepriseId!, entreprise),
            error: (err) => console.error(`Erreur chargement entreprise ${offre.entrepriseId}`, err),
          });
        }
      });
    },
    error: (err) => console.error("❌ Erreur récupération candidat connecté :", err),
  });
}

loadOffres(page: number = 0) {
  this.isLoading = true;

  this.offreService.getOffresPaged(page, this.size).subscribe({
    next: (data: Page<Offre>) => {
      this.offres = data.content;
      this.totalPages = data.totalPages;

      this.page = data.number;           // backend index
      this.currentPage = data.number + 1; // UI index

      this.filteredOffres = this.offres;
      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
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
      this.selectedContracts = this.selectedContracts.filter(
        (c) => c !== value
      );
    }
    this.applyFilters(); // <-- appel API à chaque changement
  }

 onSectorCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedSectors.push(value); // ✔️ mettre dans selectedSectors
    } else {
      this.selectedSectors = this.selectedSectors.filter(
        (s) => s !== value
      );
    }
    this.applyFilters();
}


  onRemoteCheckboxChange(event: any) {
  const value = event.target.value;

  if (event.target.checked) {
    this.selectedRemote = value;   // ✅ affectation correcte
  } else {
    this.selectedRemote = "";
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
      this.applyFilters();
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
        console.log("✅ Entreprise chargée fromhtml appel :", data);
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement :", err);
      },
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
  if (!this.candidatConnecte?.refId || !offre.id) return;

  const candidatId = this.candidatConnecte.refId;
  const offreId = offre.id;
  const isFavori = this.favorisMap[offreId];

  if (isFavori) {
    this.candidatService.removeFavori(candidatId, offreId).subscribe({
      next: () => {
        this.favorisMap[offreId] = false;
        console.log(`❌ Offre ${offreId} supprimée des favoris`);
      },
      error: (err) => console.error(`Erreur suppression favori ${offreId}`, err),
    });
  } else {
    this.candidatService.addFavori(candidatId, offreId).subscribe({
      next: () => {
        this.favorisMap[offreId] = true;
        console.log(`⭐ Offre ${offreId} ajoutée aux favoris`);
      },
      error: (err) => console.error(`Erreur ajout favori ${offreId}`, err),
    });
  }
}

  estFavori(offreId: number): boolean {
    return !!this.favorisMap[offreId];
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
  // Vérifie qu’au moins un critère est présent
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

  // Nettoyer les tableaux : supprimer les chaînes vides
  const contratsClean = this.selectedContracts.filter(c => c && c.trim() !== "");
  const secteursClean = this.selectedSectors.filter(s => s && s.trim() !== "");
const teletravailClean = this.selectedRemote ? [this.selectedRemote] : [];



  const alerte: Alerte = {
    id: Date.now(),
    motCle: this.searchTerm || "Tous les postes",
    lieu: this.searchLocation || "Partout",
    contrats: contratsClean,
    secteurs: secteursClean,
    teletravail: teletravailClean,
    frequence: "hebdomadaire",
    active: true,
    dateCreation: new Date(),
    email: this.candidatConnecte!.email,
  };

  // Envoi vers le backend
  this.alerteEmploiService.addAlerte(alerte).subscribe({
    next: () => {
      alert('Alerte créée avec succès !');
    },
    error: err => {
      if (err.status === 400) {
        alert(err.error);
      } else {
        console.error('Erreur création alerte:', err);
      }
    }
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
  if (this.page < this.totalPages - 1) {
    this.page++;              // Backend
    this.loadOffres(this.page);
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;
    this.loadOffres(this.page);
  }
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.page = page - 1;     // UI -> Backend
    this.loadOffres(this.page);
  }
}

 applyFilters() {
    this.closeAllDropdowns();
    this.isLoading = true;
let salaireMin: number | undefined;
let salaireMax: number | undefined;
if (this.selectedSalaires?.length) {
  const range = this.getSalaireRange(this.selectedSalaires[0]); // 🔥 1 choix
  salaireMin = range.min;
  salaireMax = range.max;
}


     // 🔹 Affichage des filtres dans la console

    this.offreService.getOffresFiltered(
        0, // première page
        this.size,
        this.searchTerm,
        this.searchLocation,
        this.selectedContracts,
        this.selectedSectors,
        this.selectedRemote,
        this.selectedExperiences,
     //   this.selectedSalaires
      ) .subscribe({
        next: (data) => {
          this.filteredOffres = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = 1;
          this.isLoading = false;

   console.log('✅ Offres filtrées:', this.filteredOffres);
// 🔥 Recharger les favoris après filtrage

if (this.candidatConnecte?.refId) {
  this.filteredOffres.forEach((offre) => {
    if (offre.id != null) {
      this.candidatService.isFavori(this.candidatConnecte!.refId, offre.id).subscribe({
        next: (isFav) => {
       
          this.favorisMap[offre.id!] = isFav;
        },
        error: (err) => {
          console.log(`❌ Erreur vérification favori pour offre ${offre.id}`, err);
          this.favorisMap[offre.id!] = false;
        }
      });
    }
  });
}




          // Charger les entreprises pour chaque offre
          this.filteredOffres.forEach((offre) => {
            if (
              offre.entrepriseId &&
              !this.entreprisesMap.has(offre.entrepriseId)
            ) {
              this.entrepriseService
                .getEntrepriseById(offre.entrepriseId)
                .subscribe({
                  next: (entreprise) =>
                    this.entreprisesMap.set(offre.entrepriseId, entreprise),
                });
            }
          });
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }


closeAllDropdowns() {
  this.isDropdownOpen = false;
  this.isSectorDropdownOpen = false;
  this.isRemoteDropdownOpen = false;
  this.isExperienceDropdownOpen = false;
  this.isSalaireDropdownOpen = false;
}


getSalaireRange(selected: string): { min?: number; max?: number } {
  switch (selected) {
    case 'Moins de 1 000 €':
      return { max: 1000 };

    case '1 000 € - 2 000 €':
      return { min: 1000, max: 2000 };

    case '2 000 € - 3 000 €':
      return { min: 2000, max: 3000 };

    case '3 000 € - 5 000 €':
      return { min: 3000, max: 5000 };

    case 'Plus de 5 000 €':
      return { min: 5000 };

    default:
      return {};
  }
}


}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Candidat } from "src/app/modeles/candidat";
import { Candidature } from "src/app/modeles/candidature";
import { Entreprise } from "src/app/modeles/entreprise";
import { Offre } from "src/app/modeles/offres";
import { CandidatureService } from "src/app/service/candidature.service";
import { EntrepriseService } from "src/app/service/entreprise.service";
import { OffresService } from "src/app/service/offres.service";

@Component({
  selector: "app-offre-visiteur",
  templateUrl: "./offre-visiteur.component.html",
  styleUrls: ["./offre-visiteur.component.css"],
})
export class OffreVisiteurComponent implements OnInit {
  // 🔎 Champs recherche
  searchTerm: string = "";
  searchLocation: string = "";
  searchSalary: number | null = null;
  // 🎯 Filtres
  selectedContract: string = "";
  selectedSector: string = "";
  sectors: string[] = ["Informatique", "Finance",    "Santé",    "Éducation",    "Energie",    "Finance",    "Marketing",  ];
  // 📩 Alerte email
  alertEmail: string = "";
  // 📂 Données d’exemple
  filteredOffres: Offre[] = [];
  // Pour gérer les onglets
  activeTab: "offres" | "profil" = "offres";
  candidatConnecte: Candidat | null = null;
  contracts: string[] = ["CDI", "CDD", "Stage", "freelance"];
  // 🔹 Suivi des candidatures
  candidatures: Candidature[] = [];
  entrepise: Entreprise | undefined;
  newSkill: string = "";
   isLoading = true;
  currentPage: number = 0;
  totalPages: number = 0;
  experiences = ["Débutant", "1-2 ans", "3-5 ans", "6-10 ans", "10+ ans"];
  selectedExperiences: string[] = [];
  isExperienceDropdownOpen = false;
  selectedContracts: string[] = [];
  isDropdownOpen = false;
  entreprisesMap: Map<number, Entreprise> = new Map();
  size = 6;
  selectedSalaires: string[] = [];

  constructor(
    private offreService: OffresService,
    private entrepriseService: EntrepriseService,
    private candidature: CandidatureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const data = this.route.snapshot.data['offresData'];
    this.filteredOffres = data.content;
    this.currentPage = data.number;
     this.totalPages = data.totalPages;
    console.log(' Offres préchargées via resolver :', this.filteredOffres);
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

  }

 loadOffres(page: number = 0): void {
    this.offreService
      .getOffresPaged(page, 12, "datePublication", "desc")
      .subscribe({
        next: (data) => {
          console.log("✅ Offres reçues :", data);
          this.filteredOffres = data.content;
          this.currentPage = data.number;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          console.error("❌ Erreur de chargement des offres :", err);
        },
      });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedContracts.push(value);
    } else {
      this.selectedContracts = this.selectedContracts.filter(
        (c) => c !== value
      );
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
      this.selectedSectors = this.selectedSectors.filter((s) => s !== value);
    }
    this.applyFilters();
  }
  // Télétravail
  remoteOptions: string[] = [
    "Présentiel",
    "Télétravail partiel",
    "100% Télétravail",
  ];
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
      this.selectedRemote = this.selectedRemote.filter((r) => r !== value);
    }
    this.applyFilters();
  }
applyFilters() {
  this.filteredOffres.filter((offre) => {
    const entreprise = this.entreprisesMap.get(offre.entrepriseId);

    // 🔹 Filtre par contrat
    const contratMatch =
      this.selectedContracts.length === 0 ||
      (offre.contrat && this.selectedContracts.includes(offre.contrat));

    // 🔹 Filtre par secteur
    const secteurMatch =
      this.selectedSectors.length === 0 ||
      (entreprise && this.selectedSectors.includes(entreprise.secteur));

    // 🔹 Filtre par télétravail
    const remoteMatch =
      this.selectedRemote.length === 0 ||
      (offre.teletravail && this.selectedRemote.includes(offre.teletravail));

    // 🔹 Filtre par expérience (si tu veux utiliser niveauExperience)
    const experienceMatch =
      this.selectedExperiences.length === 0 ||
      (offre.niveauExperience &&
        this.selectedExperiences.includes(offre.niveauExperience));

    // 🔹 Filtre par salaire
    const salaireMatch =
      this.selectedSalaires.length === 0 ||
      this.selectedSalaires.some((range) => {
        switch (range) {
          case "Moins de 1 000 €":
            return offre.salaire < 1000;
          case "1 000 € - 2 000 €":
            return offre.salaire >= 1000 && offre.salaire <= 2000;
          case "2 000 € - 3 000 €":
            return offre.salaire >= 2000 && offre.salaire <= 3000;
          case "3 000 € - 5 000 €":
            return offre.salaire >= 3000 && offre.salaire <= 5000;
          case "Plus de 5 000 €":
            return offre.salaire > 5000;
          default:
            return true;
        }
      });

    // 🔹 Filtre par mots-clés et localisation
    const searchTermMatch =
      !this.searchTerm ||
      offre.poste.toLowerCase().includes(this.searchTerm.toLowerCase());

    const locationMatch =
      !this.searchLocation ||
      offre.localisation
        .toLowerCase()
        .includes(this.searchLocation.toLowerCase());

    return (
      contratMatch &&
      secteurMatch &&
      remoteMatch &&
      experienceMatch &&
      salaireMatch &&
      searchTermMatch &&
      locationMatch
    );
  });

  // 🔹 Mise à jour pagination
  this.totalPages = Math.ceil(this.filteredOffres.length / this.size);
  this.currentPage = 1;
}

  // ✅ Postuler
  postuler(offre: Offre) {
    if (!this.candidatConnecte) {
      alert("Vous devez être connecté pour postuler.");
      return;
    }

    // Appelle le service pour créer la candidature
    const candidature = this.candidature.addCandidature(
      offre.id,
      this.candidatConnecte.refId,
      "Je suis très intéressé par cette offre." // message de candidature
    );

  }

  // ⭐ Favoris
  toggleFavori(offre: Offre) {
    // offre.favori = !offre.favori;
  }
  toggleExperienceDropdown() {
    this.isExperienceDropdownOpen = !this.isExperienceDropdownOpen;
  }
  // ✅ Gestion des cases à cocher
  onCheckboxChange2(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;

    const map = {
      contract: this.selectedContracts,
      sector: this.selectedSectors,
      remote: this.selectedRemote,
      experience: this.selectedExperiences,
    };

    this.applyFilters();
  }

 getEntreprise(entrepriseId: number): Observable<Entreprise> {
  return this.entrepriseService.getEntrepriseById(entrepriseId);
}

  gotodetail(offre: Offre) {
    //this.router.navigate(['/offre-detail', offre.id]);
    console.log("offree selectione par visiteur " + offre.id);
  }
}

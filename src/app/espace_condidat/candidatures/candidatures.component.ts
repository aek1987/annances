import { Component, OnInit } from "@angular/core";
import { Candidat } from "src/app/modeles/candidat";
import { Candidature } from "src/app/modeles/candidature";
import { Entreprise } from "src/app/modeles/entreprise";
import { Offre } from "src/app/modeles/offres";
import { CandidatService } from "src/app/service/candidate.service";
import { CandidatureService } from "src/app/service/candidature.service";
import { EntrepriseService } from "src/app/service/entreprise.service";
import { OffresService } from "src/app/service/offres.service";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-candidatures",
  templateUrl: "./candidatures.component.html",
  styleUrls: ["./candidatures.component.css"],
})
export class CandidaturesComponent implements OnInit {
  candidatConnecte: Candidat | null = null;
  candidatures: Candidature[] = [];
  etapes = ["en Attente", "Analyse", "Acceptée", "Refusée", "Finalisé"];
  filtreStatut: string = "";
  offresMap = new Map<number, Offre>();
  entreprisesMap = new Map<number, Entreprise>();
  entreprise?: Entreprise;

  currentPage = 1;
  totalPages = 0;
  size = 8; // nombre d’éléments par page

  constructor(    private route: ActivatedRoute,    private candidatService: CandidatService,
    private offresService: OffresService,    private candidature: CandidatureService,
    private entrepriseService: EntrepriseService ) {}
  ngOnInit(): void {
    const data = this.route.snapshot.data["candidatures"];
    this.candidatConnecte = data.candidat;
    // pagination initiale
    this.currentPage = data.currentPage + 1;
    this.totalPages = data.totalPages;
    this.candidatures = data.candidatures;
    
    // Charger les offres + entreprises
    this.chargerDetails();
  }
  loadCandidatures(page: number = 0) {
    if (!this.candidatConnecte) return;

    this.candidature
      .getCandidaturesByCandidatPaginated(
        this.candidatConnecte.refId,
        page,
        this.size
      )
      .subscribe({
        next: (res) => {
          this.candidatures = res.content;
          this.currentPage = res.currentPage + 1; // backend → 0-based
          this.totalPages = res.totalPages;

          console.log("📄 Page reçue :", res);

          this.chargerDetails();
        },
        error: (err) => console.error(err),
      });
  }

  chargerDetails() {
    const observables = this.candidatures.map((c) =>
      this.offresService.getOffreById(c.offreId).pipe(
        switchMap((offre) => {
          this.offresMap.set(c.id, offre);

          return this.entrepriseService
            .getEntrepriseById(offre.entrepriseId)
            .pipe(
              map((entreprise) => {
                this.entreprisesMap.set(c.id, entreprise);
              })
            );
        })
      )
    );

    forkJoin(observables).subscribe({
      next: () => console.log("✔ Tous les détails chargés"),
      error: (err) => console.error("❌ Erreur détails :", err),
    });
  }

  // Retourne l’index de l’étape actuelle
  getEtapeIndex(statut: string): number {
    return this.etapes.indexOf(statut);
  }

  annulerCandidature(id: number) {
    this.candidatures = this.candidatures.filter((c) => c.id !== id);
  }

  voirDetails(candidature: Candidature) {
    //lert(`Détails candidature : ${candidature.poste} chez ${candidature.entreprise}`);
  }

  getOffre(offreId: number): Observable<Offre> {
    return this.offresService.getOffreById(offreId);
  }

  getEntreprise(entrepriseId: number): void {
    this.entrepriseService.getEntrepriseById(entrepriseId).subscribe({
      next: (data) => {
        this.entreprise = data;
        console.log("✅ Entreprise récupérée :", this.entreprise);
      },
      error: (err) => {
        console.error(
          "❌ Erreur lors de la récupération de l’entreprise :",
          err
        );
      },
    });
  }

  filtrerCandidatures() {
    const texte = this.filtreStatut.toLowerCase().trim();

    // this.offresFiltrees = this.candidatures.filter(offre =>
    //offre.entrepriseNom.toLowerCase().includes(texte) ||
    // offre.secteur.toLowerCase().includes(texte) ||
    // offre.poste.toLowerCase().includes(texte)
    //  );
  }

  getOffreByCandidature(id: number): Offre | undefined {
    return this.offresMap.get(id);
  }

  getEntrepriseByCandidature(id: number): Entreprise | undefined {
    return this.entreprisesMap.get(id);
  }


  nextPage() {
  if (this.currentPage < this.totalPages) {
    this.loadCandidatures(this.currentPage); // page suivante (0-based)
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.loadCandidatures(this.currentPage - 2); // page précédente (0-based)
  }
}

goToPage(p: number) {
  if (p >= 1 && p <= this.totalPages) {
    this.loadCandidatures(p - 1); // 1-based → 0-based
  }
}
setStatut(statut: string) {
  this.filtreStatut = statut;
  this.filtrerCandidatures();
}

}

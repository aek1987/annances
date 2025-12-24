import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidaturesComponent implements OnInit {
  candidatConnecte: Candidat | null = null;
  candidatures: Candidature[] = [];
  etapes = ["en Attente", "Analyse", "Acceptée", "Refusée", "Finalisé"];
  filtreStatut: string = "";
  offresMap = new Map<number, Offre>();
  entreprisesMap = new Map<number, Entreprise>();
  entreprise?: Entreprise;
loading = false;

  currentPage = 1;
  totalPages = 0;statuts = [
  { label: 'Tous', value: '', css: '' },
  { label: 'En attente', value: 'en_attente', css: 'attente' },
  { label: 'En entretien', value: 'En entretien', css: 'entretien' },
  { label: 'Acceptée', value: 'acceptee', css: 'accepte' },
  { label: 'Refusée', value: 'refusee', css: 'refuse' }
];
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
    console.log("candidature :",this.candidatures);
    // Charger les offres + entreprises
    this.chargerDetails();
  }
loadCandidatures(page: number = 0) {
  if (!this.candidatConnecte) return;

  this.loading = true;

  this.candidature
    .getCandidaturesByCandidatPaginated(
      this.candidatConnecte.refId,
      page,
      this.size
    )
    .subscribe({
      next: res => {
        this.candidatures = res.content;
        this.currentPage = res.currentPage + 1;
        this.totalPages = res.totalPages;
        this.chargerDetails();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
}

 chargerDetails() {
  // 1️⃣ IDs uniques des offres
  const offreIds = [...new Set(this.candidatures.map(c => c.offreId))];

  // 2️⃣ Charger toutes les offres
  forkJoin(
    offreIds.map(id => this.offresService.getOffreById(id))
  ).pipe(
    switchMap(offres => {
      // Stocker les offres
      offres.forEach(o => this.offresMap.set(o.id, o));

      // 3️⃣ IDs uniques des entreprises
      const entrepriseIds = [...new Set(offres.map(o => o.entrepriseId))];

      // 4️⃣ Charger toutes les entreprises
      return forkJoin(
        entrepriseIds.map(id =>
          this.entrepriseService.getEntrepriseById(id)
        )
      );
    })
  ).subscribe({
    next: entreprises => {
      entreprises.forEach(e => this.entreprisesMap.set(e.id, e));
      console.log('⚡ Détails chargés (optimisé)');
    },
    error: err => console.error('❌ Erreur chargement détails', err)
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
getOffreByCandidature(offreId: number) {
  return this.offresMap.get(offreId);
}

getEntrepriseByCandidature(entrepriseId: number) {
  return this.entreprisesMap.get(entrepriseId);
}

getEntrepriseByOffre(offre?: Offre) {
  return offre ? this.entreprisesMap.get(offre.entrepriseId) : null;
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




setStatut(value: string) {
  this.filtreStatut = value;
}

trackById(_: number, c: Candidature) {
  return c.id;
}
get candidaturesFiltrees() {
  if (!this.filtreStatut) return this.candidatures;
  return this.candidatures.filter(c => c.statut === this.filtreStatut);
}

}

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
  etapes = ["en attente", "analyse", "acceptée", "refusée", "finalisé"];
  filtreStatut: string = "";
  offresMap = new Map<number, Offre>();
  entreprisesMap = new Map<number, Entreprise>();
  entreprise?: Entreprise;

  constructor(
        private route: ActivatedRoute,
    private candidatService: CandidatService,
    private offresService: OffresService,
    private candidature: CandidatureService,
    private entrepriseService: EntrepriseService

  ) {}
ngOnInit(): void {


  const data = this.route.snapshot.data['candidatures'];
  this.candidatConnecte = data.candidat;
  this.candidatures = data.candidatures;

  console.log('✅ Candidat connecté :', this.candidatConnecte);
  console.log('✅ Candidatures préchargées :', this.candidatures);

/*  this.candidatService.getCandidatConnecte().subscribe((candidat) => {
   this.candidatConnecte = candidat;
  

    // Maintenant que le candidat est chargé, on récupère ses candidatures
    this.candidature.getCandidaturesByCandidat(this.candidatConnecte!.refId)
      .subscribe((candidatures) => {
        this.candidatures = candidatures;

        // Pour chaque candidature, récupérer l’offre et l’entreprise associées
        this.candidatures.forEach((c) => {
          this.offresService.getOffreById(c.offreId).subscribe({
            next: (offre) => {
              if (offre) {
                this.offresMap.set(c.id, offre);

                // Charger l’entreprise associée
                this.entrepriseService.getEntrepriseById(offre.entrepriseId)
                  .subscribe({
                    next: (entreprise) => {
                      if (entreprise) {
                        this.entreprisesMap.set(c.id, entreprise);
                      }
                    },
                    error: (err) =>
                      console.error(
                        `Erreur lors du chargement de l’entreprise ${offre.entrepriseId}`,
                        err
                      ),
                  });
              }
            },
            error: (err) =>
              console.error(`Erreur lors du chargement de l’offre ${c.offreId}`, err),
          });
        });
      });
  });*/

  
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
}

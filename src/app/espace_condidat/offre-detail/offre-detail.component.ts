import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Offre } from "src/app/modeles/offres";
import { Entreprise } from "src/app/modeles/entreprise";

import { EntrepriseService } from "src/app/service/entreprise.service";
import { OffresService } from "src/app/service/offres.service";
import { Candidat } from "src/app/modeles/candidat";
import { CandidatService } from "src/app/service/candidate.service";
import { CandidatureService } from "src/app/service/candidature.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-offre-detail",
  templateUrl: "./offre-detail.component.html",
  styleUrls: ["./offre-detail.component.css"],
})
export class OffreDetailComponent implements OnInit {
  @Input() offre?: Offre;

  offresSimilaires: Offre[] = [];
  entreprise: Entreprise | undefined; // Note le "?"
  postule: boolean = false;

  candidatConnecte: Candidat | null = null;
  constructor(
    private offreService: OffresService,
    private entrepriseService: EntrepriseService,
    private candidatService: CandidatService,
    private candidature: CandidatureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Vérifier si on récupère une offre par ID depuis l’URL
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      const offreId = Number(id);

      this.offreService.getOffreById(offreId).subscribe({
        next: (data: Offre) => {
          this.offre = data;
          console.error("offreId==== ", offreId, "offre ", this.offre);
          // 2️⃣ Charger le candidat connecté
        this.candidatService.getCandidatConnecte().subscribe({
          next: (candidat) => {
            this.candidatConnecte = candidat;

            // 3️⃣ Vérifier s’il a déjà postulé
            if (this.candidatConnecte) {
              this.checkCandidature(this.offre!.id, this.candidatConnecte.refId);
            }
          },
          error: err => console.error("Erreur candidat connecté", err)
        });

          if (this.offre) this.getEntreprise(this.offre.entrepriseId);
        },
        error: (err) => {
          console.error("Erreur lors du chargement de l'offre", err);
        },
      });

      //   this.offresSimilaires = this.offreService.getOffresSimilaires(this.offre);
    }
  }

  // Récupérer toute l’entreprise (logo, site, etc.)
  getEntreprise(entrepriseId: number): void {
    this.entrepriseService.getEntrepriseById2(entrepriseId).subscribe({
      next: (data: Entreprise) => {
        this.entreprise = data;
        console.log("Entreprise récupérée :", this.entreprise);
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'entreprise", err);
      },
    });
  }

  // Postuler à une offre
postuler(offre: Offre): void {
  if (!this.candidatConnecte) return;

  if (this.candidatConnecte.status !== "active") {
    Swal.fire({
      icon: "warning",
      title: "Statut inactif",
      text: "Votre statut doit être actif pour postuler"
    });
    return;
  }

  this.candidature
    .addCandidature(offre.id, this.candidatConnecte.refId)
    .subscribe({
      next: () => {
        this.postule = true; // 🔥 MAJ immédiate UI

        Swal.fire({
          icon: "success",
          title: "Candidature envoyée",
          text: `Votre candidature a été envoyée pour : ${offre.poste}`
        });
      },
      error: err => {
        if (err.status === 400 || err.status === 409) {
          Swal.fire({
            icon: "warning",
            title: "Déjà postulé",
            text: `Vous avez déjà postulé à : ${offre.poste}`
          });
          this.postule = true;
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de l’envoi de la candidature"
          });
        }
      }
    });
}

  // Ajouter / Retirer des favoris
  toggleFavori(offre: Offre): void {
    this.candidatService.getCandidatConnecte().subscribe((candidat) => {
      this.candidatConnecte = candidat;
      console.log("👤 Candidat connecté :", candidat);
    });

    //   offre.favori = !offre.favori;
    /*   if (offre.favori) {
      alert(`Offre "${offre.poste}" ajoutée à vos favoris ⭐`);

 const candidature = this.candidature.addCandidature(
    offre.id,
    this.candidatConnecte!.refId 
  );

  // Change le statut de l’offre
  //offre.status = 'favorie';

    } else {
      alert(`Offre "${offre.poste}" retirée de vos favoris ❌`);
    }*/
    // tu peux aussi sauvegarder ça dans localStorage ou un backend
  }

  // Vérifier si le candidat a déjà postulé
  checkCandidature(offreId: number, candidatRefId: number): void {
    this.candidature.hasCandidatPostule(offreId, candidatRefId).subscribe({
      next: (res) => (this.postule = res.postule),
      error: (err) => console.error("Erreur vérification candidature", err),
    });
  }
}

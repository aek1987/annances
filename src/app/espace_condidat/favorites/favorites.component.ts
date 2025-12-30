import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/modeles/entreprise';
import { Offre } from 'src/app/modeles/offres';
import { CandidatService } from 'src/app/service/candidate.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  entrepriseMap: { [key: number]: string } = {};

  favoriteJobs: Offre[] = [];
  candidatId!: number;
  entreprise: Entreprise | undefined; // Note le "?"
  constructor(private candidatService: CandidatService, private entrepriseService: EntrepriseService,private router: Router) {}

 ngOnInit(): void {
  // 1️⃣ Récupérer le candidat connecté
  this.candidatService.getCandidatConnecte().subscribe({
    next: (candidat) => {
      if (!candidat) {
        console.warn('Aucun candidat connecté.');
        return;
      }

      this.candidatId = candidat.refId;

      // 2️⃣ Charger les favoris
      this.candidatService.getFavoris(this.candidatId).subscribe({
        next: (favoris) => {
          this.favoriteJobs = favoris;

          // 3️⃣ Charger les entreprises associées
          favoris.forEach((offre) => {
            const entrepriseId = offre.entrepriseId;

            if (entrepriseId && !this.entrepriseMap[entrepriseId]) {
              this.entrepriseService.getEntrepriseById2(entrepriseId).subscribe({
                next: (entreprise) => {
                  // ⚠️ adapte le champ si nécessaire
                  this.entrepriseMap[entrepriseId] =
                    entreprise.username || 'Entreprise inconnue';
                },
                error: () => {
                  this.entrepriseMap[entrepriseId] = 'Entreprise inconnue';
                }
              });
            }
          });
        },
        error: (err) => console.error('Erreur récupération favoris', err)
      });
    },
    error: (err) =>
      console.error('Erreur récupération du candidat connecté', err)
  });
}


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

goToDetail(id: number) {
  this.router.navigate(['/candidat/offre', id]);
}
  removeFavorite(offreId: number): void {
    this.candidatService.removeFavori(this.candidatId, offreId).subscribe({
      next: () => {
        // Supprime localement l'offre du tableau après suppression côté backend
        this.favoriteJobs = this.favoriteJobs.filter(job => job.id !== offreId);
      },
      error: (err) => console.error('Erreur suppression favori', err)
    });
  }

  isFavori(offreId: number) {
    return this.candidatService.isFavori(this.candidatId, offreId);
  }
}

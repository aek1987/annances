import { Component, OnInit } from '@angular/core';
import { Offre } from 'src/app/modeles/offres';
import { CandidatService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteJobs: Offre[] = [];
  candidatId!: number;

  constructor(private candidatService: CandidatService) {}

 ngOnInit(): void {
  // 1️⃣ Récupère le candidat connecté
  this.candidatService.getCandidatConnecte().subscribe({
    next: (candidat) => {
      if (candidat) {
        this.candidatId = candidat.refId;

        // 2️⃣ Charge les favoris une fois qu'on a l'id
        this.candidatService.getFavoris(this.candidatId).subscribe({
          next: (favoris) => this.favoriteJobs = favoris,
          error: (err) => console.error('Erreur récupération favoris', err)
        });
      } else {
        console.warn('Aucun candidat connecté.');
      }
    },
    error: (err) => console.error('Erreur récupération du candidat connecté', err)
  });
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

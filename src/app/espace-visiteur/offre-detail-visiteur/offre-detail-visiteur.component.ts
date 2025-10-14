import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from 'src/app/modeles/offres';
import { Entreprise } from 'src/app/modeles/entreprise';

import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-offre-detail-visiteur',
  templateUrl: './offre-detail-visiteur.component.html',
  styleUrls: ['./offre-detail-visiteur.component.css']
})
export class OffreDetailVisiteurComponent implements OnInit {
  @Input() offre?: Offre;
  
  offresSimilaires: Offre[] = [];
  entrprise:Entreprise | undefined;
  constructor(
    private offreService: OffresService,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Charger toutes les entreprises
  

    // Vérifier si on récupère une offre par ID depuis l’URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const offreId = Number(id);
      this.offreService.getOffreById(offreId).subscribe({
      next: (data) => this.offre = data,
      error: (err) => console.error('Erreur lors du chargement de l’offre :', err)
    });
      if(this.offre)
      this.entrprise= this.getEntreprise(this.offre.entrepriseId);

      // Charger les offres similaires
      if (this.offre) {
     //   this.offresSimilaires = this.offreService.getOffresSimilaires(this.offre);
      }
    }
  }

  
  // Récupérer toute l’entreprise (logo, site, etc.)
 getEntreprise(entrepriseId: number): Entreprise | undefined {
  return this.entrepriseService.getEntrepriseById(entrepriseId);
}


  // Postuler à une offre
  postuler(offre: Offre): void {
    alert(`Votre candidature a été envoyée pour le poste : ${offre.poste}`);
    // ici tu peux appeler un service backend pour sauvegarder la candidature
  }

  // Ajouter / Retirer des favoris
  toggleFavori(offre: Offre): void {
/*offre.favori = !offre.favori;
    if (offre.favori) {
      alert(`Offre "${offre.poste}" ajoutée à vos favoris ⭐`);
    } else {
      alert(`Offre "${offre.poste}" retirée de vos favoris ❌`);
    }*/
    // tu peux aussi sauvegarder ça dans localStorage ou un backend
  }
}

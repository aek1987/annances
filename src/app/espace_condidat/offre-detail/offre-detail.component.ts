import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from 'src/app/modeles/offres';
import { Entreprise } from 'src/app/modeles/entreprise';

import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  @Input() offre?: Offre;
  entreprises: Entreprise[] = [];
  offresSimilaires: Offre[] = [];

  constructor(
    private offreService: OffresService,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Charger toutes les entreprises
    this.entreprises = this.entrepriseService.getEntreprises();

    // Vérifier si on récupère une offre par ID depuis l’URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const offreId = Number(id);
      this.offre = this.offreService.getOffreById(offreId);

      // Charger les offres similaires
      if (this.offre) {
     //   this.offresSimilaires = this.offreService.getOffresSimilaires(this.offre);
      }
    }
  }

  // Récupérer le nom de l’entreprise
  getEntrepriseNom(entrepriseId: number): string {
    const entreprise = this.entreprises.find(e => e.id === entrepriseId);
    return entreprise ? entreprise.username : 'Entreprise inconnue';
  }

  // Récupérer toute l’entreprise (logo, site, etc.)
  getEntreprise(entrepriseId: number): Entreprise | undefined {
    return this.entreprises.find(e => e.id === entrepriseId);
  }

  // Postuler à une offre
  postuler(offre: Offre): void {
    alert(`Votre candidature a été envoyée pour le poste : ${offre.poste}`);
    // ici tu peux appeler un service backend pour sauvegarder la candidature
  }

  // Ajouter / Retirer des favoris
  toggleFavori(offre: Offre): void {
    offre.favori = !offre.favori;
    if (offre.favori) {
      alert(`Offre "${offre.poste}" ajoutée à vos favoris ⭐`);
    } else {
      alert(`Offre "${offre.poste}" retirée de vos favoris ❌`);
    }
    // tu peux aussi sauvegarder ça dans localStorage ou un backend
  }
}

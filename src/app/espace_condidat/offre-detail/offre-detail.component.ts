import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from 'src/app/modeles/offres';
import { Entreprise } from 'src/app/modeles/entreprise';

import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';
import { Candidat } from 'src/app/modeles/candidat';
import { CandidatService } from 'src/app/service/candidate.service';
import { CandidatureService } from 'src/app/service/candidature.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  @Input() offre?: Offre;
  
  offresSimilaires: Offre[] = [];
 entreprise: Entreprise |undefined; // Note le "?"

  candidatConnecte: Candidat | null = null;
  constructor(
    private offreService: OffresService,
    private entrepriseService: EntrepriseService, private candidatService: CandidatService,
    private candidature: CandidatureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      
    // Vérifier si on récupère une offre par ID depuis l’URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const offreId = Number(id);
      
      this.offreService.getOffreById(offreId).subscribe({
      next: (data: Offre) => {
        this.offre = data;  
        console.error('offreId==== ', offreId, "offre ",this.offre); 

     if(this.offre)            
     this.getEntreprise(this.offre.entrepriseId);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'offre', err);       
      }
    });
    
    
    
     //   this.offresSimilaires = this.offreService.getOffresSimilaires(this.offre);
      
    }
  }

  
  // Récupérer toute l’entreprise (logo, site, etc.)
 getEntreprise(entrepriseId: number): void {
  this.entrepriseService.getEntrepriseById2(entrepriseId).subscribe({
    next: (data: Entreprise) => {
      this.entreprise = data;   
      console.log('Entreprise récupérée :', this.entreprise);
    },
    error: (err) => {
      console.error('Erreur lors du chargement de l\'entreprise', err);       
    }
  });
}



// Postuler à une offre
postuler(offre: Offre): void {
  this.candidatService.getCandidatConnecte().subscribe(candidat => {
    this.candidatConnecte = candidat;
    if (this.candidatConnecte!.status !== 'active') {
      alert(`Votre statut doit être actif pour postuler : ${offre.poste}`);     
    }else{

    // Appelle le backend pour ajouter la candidature
    this.candidature.addCandidature(offre.id, this.candidatConnecte!.refId).subscribe({
      next: (candidature) => {
        // Met à jour le statut de l’offre
     //   offre.status = 'postulé';

        console.log("Candidat", this.candidatConnecte, "Candidature envoyée", candidature);

        // Message success
        Swal.fire({
          icon: 'success',
          title: 'Candidature envoyée',
          text: `Votre candidature a été transmise avec succès pour le poste : ${offre.poste}`
        });
      },
      error: (err) => {
       if (err.status === 400 || err.status === 409) { // Selon le code que tu envoies du back
          Swal.fire({
            icon: 'warning',
            title: 'Candidature déjà existante',
            text: `Vous avez déjà postulé pour le poste : ${offre.poste}`
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l’envoi de la candidature. Veuillez réessayer plus tard.'
          });
        }
        console.error("Erreur lors de l'envoi de la candidature :", err);
      }
    });    }
  });


}


  // Ajouter / Retirer des favoris
  toggleFavori(offre: Offre): void {
    this.candidatService.getCandidatConnecte().subscribe(candidat => {
    this.candidatConnecte = candidat;
    console.log('👤 Candidat connecté :', candidat);
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
}

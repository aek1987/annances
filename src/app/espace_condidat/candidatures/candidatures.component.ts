import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/modeles/candidat';
import { Candidature } from 'src/app/modeles/candidature';
import { Entreprise } from 'src/app/modeles/entreprise';
import { Offre } from 'src/app/modeles/offres';
import { CandidatService } from 'src/app/service/candidate.service';
import { CandidatureService } from 'src/app/service/candidature.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';




@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {
  candidatConnecte: Candidat | null = null;
  candidatures: Candidature[] = [];
  etapes = ['en attente', 'analyse', 'acceptée', 'refusée', 'finalisé'];
  
  filtreStatut: string = '';
 constructor(  private candidatService: CandidatService,private offresService:OffresService,
 private candidature: CandidatureService,  private entrepriseService: EntrepriseService,

  ) {}
  ngOnInit(): void {
        this.candidatConnecte = this.candidatService.getCandidatConnecte();
    console.log("condidat name  "+this.candidatConnecte?.username +" id= "+this.candidatConnecte?.refId);
 if (this.candidatConnecte) {
      // Récupérer toutes les candidatures du candidat
      this.candidatures = this.candidature.getCandidaturesByCandidat(this.candidatConnecte.refId)
    
    }
   
  }
  
  
  // Retourne l’index de l’étape actuelle
  getEtapeIndex(statut: string): number {
    return this.etapes.indexOf(statut);
  }

  annulerCandidature(id: number) {
    this.candidatures = this.candidatures.filter(c => c.id !== id);
  }

  voirDetails(candidature: Candidature) {
   //lert(`Détails candidature : ${candidature.poste} chez ${candidature.entreprise}`);
  }

  getOffre(offreId: number): Offre | undefined {
  return this.offresService.getOffreById(offreId);
  }
/*
  getOffreTitre(offreId: number): string {
   ///nst offre = this.getOffre(offreId);
   //eturn offre ? offre.titre : 'Offre supprimée';
  }*/

  // Récupérer toute l’entreprise (logo, site, etc.)
  getEntreprise(entrepriseId: number): Entreprise | undefined {
   return this.entrepriseService.getEntrepriseById(entrepriseId);
 }
  filtrerCandidatures() {
    const texte = this.filtreStatut.toLowerCase().trim();

   // this.offresFiltrees = this.candidatures.filter(offre =>
      //offre.entrepriseNom.toLowerCase().includes(texte) ||
     // offre.secteur.toLowerCase().includes(texte) ||
     // offre.poste.toLowerCase().includes(texte)
  //  );
  }
}

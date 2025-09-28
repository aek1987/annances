import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/modeles/candidat';
import { Candidature } from 'src/app/modeles/candidature';
import { Offre } from 'src/app/modeles/offres';
import { CandidatService } from 'src/app/service/candidate.service';
import { CandidatureService } from 'src/app/service/candidature.service';




@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {
 candidatConnecte: Candidat | null = null;
  candidatures: Candidature[] = [];
 constructor(  private candidatService: CandidatService,
 private candidature: CandidatureService

  ) {}
  ngOnInit(): void {
    

    this.candidatConnecte = this.candidatService.getCandidatConnecte();
    console.log("condidat name  "+this.candidatConnecte?.username +" id= "+this.candidatConnecte?.refId);
 if (this.candidatConnecte) {
      // Récupérer toutes les candidatures du candidat
      this.candidatures = this.candidature.getCandidaturesByCandidat(this.candidatConnecte.refId)
    }
   
  }
  
  

  annulerCandidature(id: number) {
    this.candidatures = this.candidatures.filter(c => c.id !== id);
  }

  voirDetails(candidature: Candidature) {
   //lert(`Détails candidature : ${candidature.poste} chez ${candidature.entreprise}`);
  }

  /*etOffre(offreId: number): Offre | undefined {
  //return this.offres.find(o => o.id === offreId);
  }

  getOffreTitre(offreId: number): string {
   ///nst offre = this.getOffre(offreId);
   //eturn offre ? offre.titre : 'Offre supprimée';
  }

  getOffreEntreprise(offreId: number): string {
  //const offre = this.getOffre(offreId);
  //return offre ? offre.entreprise : 'N/A';
  }*/
}

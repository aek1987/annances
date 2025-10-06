import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/modeles/accounts';
import { Candidature } from 'src/app/modeles/candidature';
import { Entreprise } from 'src/app/modeles/entreprise';
import { Offre } from 'src/app/modeles/offres';
import { CandidatureService } from 'src/app/service/candidature.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './entreprise-dashboard.component.html',
  styleUrls: ['./entreprise-dashboard.component.css']
})
export class EntrepriseDashboardComponent {
entreprise: Entreprise | null=null;

 offres: Offre[] = [];candidatures: Candidature[] = [];

 // Statistiques dynamiques
  nbOffres = 10;
  nbCandidatures = 27;
  nbRetenus = 7;
  constructor(private entrepriseService: EntrepriseService,private router: Router,private offresService: OffresService,
    private candidatureService: CandidatureService,) {}

  ngOnInit(): void {
    this.loadEntreprise();
    // ✅ Charger les offres de cette entreprise
    if (this.entreprise) { this.offres = this.offresService.getOffresByEntreprise(this.entreprise.id);
      this.nbOffres = this.offres.length;  
   
    // 🔹 Récupérer les candidatures associées à ces offres
      this.candidatures = this.offres.flatMap(offre =>
        this.candidatureService.getCandidaturesByOffre(offre.id)
      );

    // 🔹 Calculer les statistiques
      this.nbOffres = this.offres.length;
      this.nbCandidatures = this.candidatures.length;
      this.nbRetenus = this.candidatures.filter(c => c.statut === 'acceptée').length;
    }
  }
// Dans votre composant
testNavigation(route: string) {
  console.log('Tentative de navigation vers:', route);
  this.router.navigate([route]).then(success => {
    console.log('Navigation réussie:', success);
  }).catch(error => {
    console.error('Erreur de navigation:', error);
  });
}
  loadEntreprise() {
    this.entreprise = this.entrepriseService.getEntrepriseConnectee();
     
  }
}

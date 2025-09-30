import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/modeles/accounts';
import { Entreprise } from 'src/app/modeles/entreprise';
import { AuthService } from 'src/app/service/auth.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './entreprise-dashboard.component.html',
  styleUrls: ['./entreprise-dashboard.component.css']
})
export class EntrepriseDashboardComponent {
entreprise: Entreprise | null = null;

  constructor(private entrepriseService: EntrepriseService,private router: Router) {}

  ngOnInit(): void {
    this.loadEntreprise();
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

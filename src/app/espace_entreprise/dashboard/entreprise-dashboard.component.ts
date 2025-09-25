import { Component } from '@angular/core';
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

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.loadEntreprise();
  }

  loadEntreprise() {
    this.entreprise = this.entrepriseService.getEntrepriseConnectee();
  }
}

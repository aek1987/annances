import { Component } from '@angular/core';
import { Abonnement } from 'src/app/modeles/abonnement';

@Component({
  selector: 'app-abonnee',
  templateUrl: './abonnee.component.html',
  styleUrls: ['./abonnee.component.css']
})
export class AbonneeComponent {
abonnements: Abonnement[] = [];
  abonnementActif: string = '';

  ngOnInit() {
    this.abonnements = [
      { type: 'Basic', prix: 29, duree: '1 mois', avantages: ['Publier 5 offres', 'Support Email'], actif: false },
      { type: 'Pro', prix: 79, duree: '1 mois', avantages: ['Publier 20 offres', 'Support Téléphone', 'Statistiques avancées'], actif: true },
      { type: 'Premium', prix: 149, duree: '1 mois', avantages: ['Offres illimitées', 'Support VIP', 'Analyse détaillée'], actif: false }
    ];

    const actif = this.abonnements.find(a => a.actif);
    this.abonnementActif = actif ? actif.type : 'Aucun';
  } souscrire(abonnement: Abonnement) {
    this.abonnements.forEach(a => a.actif = false);
    abonnement.actif = true;
    this.abonnementActif = abonnement.type;
    alert(`Vous avez souscrit à l'abonnement ${abonnement.type} !`);
  }
}

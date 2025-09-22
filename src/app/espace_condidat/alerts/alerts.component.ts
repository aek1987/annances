import { Component } from '@angular/core';

interface Alerte {
  id: number;
  motCle: string;
  lieu: string;
  frequence: 'Quotidien' | 'Hebdomadaire';
  active: boolean;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  alertes: Alerte[] = [
    { id: 1, motCle: 'Angular', lieu: 'Paris', frequence: 'Quotidien', active: true },
    { id: 2, motCle: 'DevOps', lieu: 'Lyon', frequence: 'Hebdomadaire', active: false }
  ];

  toggleAlerte(alerte: Alerte) {
    alerte.active = !alerte.active;
  }

  supprimerAlerte(id: number) {
    this.alertes = this.alertes.filter(a => a.id !== id);
  }
}

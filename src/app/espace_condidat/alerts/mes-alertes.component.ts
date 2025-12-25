import { Component, OnInit } from '@angular/core';
import { Alerte } from 'src/app/modeles/alerte';
import { AlerteEmploiService } from 'src/app/service/alerte-emploi.service';

@Component({
  selector: 'app-mes-alertes',
  templateUrl: './mes-alertes.component.html',
  styleUrls: ['./mes-alertes.component.css']
})
export class MesAlertesComponent implements OnInit {
  alertes: Alerte[] = [];
  alerteFrequence = false;
  alerteSelectionnee: Alerte | null = null;

  constructor(private alerteService: AlerteEmploiService) {}

  ngOnInit(): void {
    this.loadAlertes();
  }

  loadAlertes() {
    this.alerteService.getAlertes().subscribe({
      next: data => this.alertes = data,
      error: err => console.error(err)
    });
  }

  toggleAlerte(alerte: Alerte) {
    alerte.active = !alerte.active;
  }

  supprimerAlerte(id: number) {
    this.alerteService.deleteAlerte(id).subscribe({
      next: () => this.loadAlertes(),
      error: err => console.error(err)
    });
  }

  toggleConfig(alerte: Alerte) {
    this.alertes.forEach(a => a !== alerte ? a.showConfig = false : null);
    alerte.showConfig = !alerte.showConfig;
  }

  closeAllConfigs() {
    this.alertes.forEach(a => a.showConfig = false);
  }

  editAlerte(alerte: Alerte) {
    console.log('Modifier alerte', alerte);
    this.closeAllConfigs();
  }

  changerFrequence(alerte: Alerte) {
     console.log('Alerte sélectionnée pour modifier fréquence:', alerte);
    this.alerteSelectionnee = alerte;
    this.alerteFrequence = true;
    console.log('Alerte sélectionnée pour le modal :', this.alerteSelectionnee);
  }

 confirmerFrequence(nouvelleFrequence: "quotidienne" | "hebdomadaire" | "mensuelle" | "Immediate") {
  if (!this.alerteSelectionnee) return;

  this.alerteSelectionnee.frequence = nouvelleFrequence;

  // Optionnel: appel API
  // this.alerteService.updateFrequence(this.alerteSelectionnee.id, nouvelleFrequence)

  this.fermerModal();
}


  fermerModal() {
    this.alerteFrequence = false;
    this.alerteSelectionnee = null;
  }
}

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
  alerteFrequence?: Alerte;
  frequenceSelectionnee: "mensuelle" | "quotidienne" | "hebdomadaire" | "Immediate" = "quotidienne";

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
    this.closeAllConfigs();
        alerte.showConfig = !alerte.showConfig;
    this.alerteFrequence = alerte;
    this.frequenceSelectionnee = alerte.frequence;
  }

  confirmerFrequence() {
    if (this.alerteFrequence) {
      this.alerteFrequence.frequence = this.frequenceSelectionnee;
      // TODO: sauvegarder via backend
    }
    this.fermerModal();
  }

  fermerModal() {
    this.alerteFrequence = undefined;
  }

  showModal = false;

  ouvrirModal() {
    this.showModal = true;
  }

  fermerModal0() {
    this.showModal = false;
  }
}

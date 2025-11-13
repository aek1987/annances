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

  constructor(private alerteService: AlerteEmploiService) {}

  ngOnInit(): void {
    this.loadAlertes();
  }

loadAlertes() {
  this.alerteService.getAlertes().subscribe({
    next: (data) => {
      console.log('Données récupérées depuis le backend :', data); // 🔍 log pour debug
      this.alertes = data;
    },
    error: (err) => {
      console.error('Erreur récupération alertes:', err);
    }
  });
}


  toggleAlerte(alerte: Alerte) {
    alerte.active = !alerte.active;
   
  }
supprimerAlerte(id: number) {
  const alerteExist = this.alertes.find(a => a.id === id);
  if (!alerteExist) {
    console.error('Cette alerte n’existe pas :', id);
    return;
  }

  console.log('Suppression alerte id:', id);
  this.alerteService.deleteAlerte(id).subscribe({
    next: () => this.loadAlertes(),
    error: (err) => console.error('Erreur suppression alerte:', err)
  });
}



}

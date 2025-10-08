import { Injectable } from '@angular/core';
import { Alerte } from '../modeles/alerte';


@Injectable({
  providedIn: 'root'
})
export class AlerteEmploiService {

  private alertes: Alerte[] = [];

  constructor() { }

  addAlerte(alerte: Alerte) {
    this.alertes.push(alerte);
    console.log('✅ Nouvelle alerte enregistrée :', alerte);
  }

  getAlertes(): Alerte[] {
    return this.alertes;
  }

  // (optionnel) Simuler l'envoi d'un email
  envoyerAlerteEmail(alerte: Alerte, offre: any) {
//    console.log(`📩 Email envoyé à ${alerte.email} pour l'offre : ${offre.poste}`);
  }
}

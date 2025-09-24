// src/app/components/ajouter-offre/ajouter-offre.component.ts
import { Component } from '@angular/core';
import { Offre } from 'src/app/modeles/offres';
import { AuthService } from 'src/app/service/auth.service';
import { OffresService } from 'src/app/service/offres.service';


@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent {
  newOffre: Offre = {
    id: 0,
    entrepriseId: 0,
    titre: '',
    description: '',
    localisation: '',
    datePublication: new Date()
  };

  constructor(
    private authService: AuthService,
    private offreService: OffresService
  ) {}

  ajouterOffre() {
    const user = this.authService.getUser();
    if (user && user.role === 'entreprise') {
      this.newOffre.entrepriseId = user.refId;
      this.offreService.addOffre(this.newOffre);
      alert('✅ Offre ajoutée avec succès !');
      this.newOffre = { id: 0, entrepriseId: 0, titre: '', description: '', localisation: '', datePublication: new Date() };
    } else {
      alert('❌ Vous devez être connecté en tant qu’entreprise.');
    }
  }
}

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
    salaire: 0,
    contrat: 'CDI',
    datePublication: new Date(),
    competences: [],
    langues: [],
    avantages: ''
  };
 
  constructor(
    private authService: AuthService,
    private offreService: OffresService
  ) {}

 ajouterOffre() {
    const user = this.authService.getUser();

    if (user && user.role === 'entreprise') {
      // Lier l’offre à l’entreprise connectée
      this.newOffre.entrepriseId = user.refId;
      this.newOffre.datePublication = new Date();

      // Ajouter l’offre via le service
      this.offreService.addOffre(this.newOffre);

      alert('✅ Offre ajoutée avec succès !');

      // Réinitialiser le formulaire
      this.newOffre = {
        id: 0,
        entrepriseId: 0,
        titre: '',
        description: '',
        localisation: '',
        salaire: 0,
        contrat: 'CDI',
        datePublication: new Date()
      };
    } else {
      alert('❌ Vous devez être une entreprise pour publier une offre.');
    }
  }

 

ajouterCompetences() {
  if (this.newOffre.competences) {
  //  this.newOffre.competences = this.newOffre.competences.split(',').map(c => c.trim());
  }
}

ajouterLangues() {
  if (this.newOffre.langues) {
   // this.newOffre.langues = this.newOffre.langues.split(',').map(l => l.trim());
  }
}

ajouterAvantages() {
  if (this.newOffre.avantages) {
  //  this.newOffre.avantages = this.newOffre.avantages.split(',').map(a => a.trim());
  }
}

}

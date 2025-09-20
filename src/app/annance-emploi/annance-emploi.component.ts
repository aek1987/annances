import { Component } from '@angular/core';

interface AnnonceEmploi {
  id: number;
  titre: string;
  description: string;
  salaire: number;
  localisation: string;
  categorie: string;
}

@Component({
  selector: 'app-annonce-emploi',
  templateUrl: './annance-emploi.component.html',
  styleUrls: ['./annance-emploi.component.css']
})
export class AnnanceEmploiComponent {
  annonces: AnnonceEmploi[] = []; // Liste des annonces
  nextId: number = 1;

  // Objet pour le formulaire
  nouvelleAnnonce: AnnonceEmploi = {
    id: 0,
    titre: '',
    description: '',
    salaire: 0,
    localisation: '',
    categorie: ''
  };

  ajouterAnnonce() {
    if (this.nouvelleAnnonce.titre && this.nouvelleAnnonce.description) {
      this.nouvelleAnnonce.id = this.nextId++;
      this.annonces.push({...this.nouvelleAnnonce});
      // Reset formulaire
      this.nouvelleAnnonce = {
        id: 0,
        titre: '',
        description: '',
        salaire: 0,
        localisation: '',
        categorie: ''
      };
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }
}

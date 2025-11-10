// src/app/components/ajouter-offre/ajouter-offre.component.ts
import { Component } from '@angular/core';
import { Entreprise } from 'src/app/modeles/entreprise';
import { Offre } from 'src/app/modeles/offres';
import { AuthService } from 'src/app/service/auth.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent {
newOffre: Offre = {
    id: 0,
    entrepriseId: 0,
    poste: '',
    description: '',
    localisation: '',
    salaire: 0,
    contrat: 'CDI',
    datePublication: new Date(),
    competences: [],
    langues: [],
    avantages: ''
  };
 entreprise: Entreprise | null=null;
 postesInformatique: string[] = [
  "Développeur Angular",
  "Développeur Java",
  "Développeur Full Stack",
  "DevOps Engineer",
  "Data Scientist",
  "Administrateur Systèmes",
  "Analyste Sécurité",
  "Chef de Projet IT"
];
  constructor(
    private entrepriseService: EntrepriseService,
    private offreService: OffresService
  ) {}
 ngOnInit(): void {
    this.loadEntreprise();
  }
loadEntreprise() {
  this.entrepriseService.getEntrepriseConnectee().subscribe({
    next: (entreprise) => {
      this.entreprise = entreprise;
      if (this.entreprise?.status === "desactive") {
        Swal.fire(
          '⚠️ Entreprise désactivée',
          'Vous ne pouvez pas postuler. Veuillez contacter l’administrateur de la plateforme.',
          'warning'
        );
      }
    },
    error: (err) => {
      console.error('Erreur lors du chargement de l’entreprise :', err);
      Swal.fire('❌ Erreur', 'Impossible de récupérer l’entreprise.', 'error');
    }
  });
}
ajouterOffre() {
  if (this.entreprise && this.entreprise?.status === "active") {
    // ✅ Lier l’offre à l’entreprise connectée
    this.newOffre.entrepriseId = this.entreprise.id;
    this.newOffre.datePublication = new Date();
 console.log("newOffre a ajouter",this.newOffre);
    // ✅ Envoyer la requête POST vers le backend
    this.offreService.addOffre(this.newOffre).subscribe({
      next: (response) => {
       
      console.log(" reponse newOffre a ",response);
        alert('✅ Offre ajoutée avec succès !');

        // ✅ Réinitialiser le formulaire après succès
        this.newOffre = {
          id: 0,
          entrepriseId: 0,
          poste: '',
          description: '',
          localisation: '',
          salaire: 0,
          contrat: 'CDI',
          datePublication: new Date()
        };
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’ajout de l’offre :', err);
        alert('❌ Une erreur est survenue lors de l’ajout de l’offre.');
      }
    });

  } else {
    alert('❌ Vous devez être une entreprise active pour publier une offre.');
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

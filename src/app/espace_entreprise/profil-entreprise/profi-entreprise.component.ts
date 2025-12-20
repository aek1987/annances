import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/modeles/entreprise';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profi-entreprise.component.html',
  styleUrls: ['./profi-entreprise.component.css']
})
export class ProfilComponentEntreprise {

 
 entreprise!: Entreprise | null;

  constructor(
    private router: Router,
    private entrepriseService: EntrepriseService
  ) {}

  ngOnInit(): void {
    this.loadEntreprise();
  }

  // 🔹 Charge l’entreprise connectée depuis le service
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
  editMode = false;

toggleEdit() {
  this.editMode = !this.editMode;
}

saveEntreprise() {


   if (!this.entreprise!.email || !this.entreprise!.username) {
      Swal.fire('⚠️ Erreur', 'Email et Nom sont obligatoires', 'warning');
      return;
    }
  if (this.entreprise) {
    this.entrepriseService.saveEntreprise(this.entreprise).subscribe({
      next: (updated) => {
        this.entreprise = updated; // Met à jour l’objet local
        this.editMode = false;
        console.log("✅ Entreprise mise à jour :", updated);
      },
      error: (err) => {
        console.error("❌ Erreur lors de la sauvegarde :", err);
      }
    });
  }
}


}

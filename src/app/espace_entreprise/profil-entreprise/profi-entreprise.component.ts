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
  if (this.entreprise) {
  //  this.entrepriseService.updateEntreprise(this.entreprise);
    console.log("✅ Entreprise mise à jour :", this.entreprise);
    this.editMode = false;
  }
}

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/modeles/entreprise';
import { EntrepriseService } from 'src/app/service/entreprise.service';

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
    this.entreprise = this.entrepriseService.getEntrepriseConnectee();

    if (this.entreprise) {
      console.log('Entreprise connectée chargée :', this.entreprise);
    } else {
      console.log('Aucune entreprise connectée.');
      // Tu peux rediriger si besoin
      // this.router.navigate(['/login']);
    }
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

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/modeles/entreprise';
import { EntrepriseService } from 'src/app/service/entreprise.service';
@Component({
  selector: 'app-detail-entreprise',
  templateUrl: './detail-entreprise.component.html',
  styleUrls: ['./detail-entreprise.component.css']
})
export class DetailEntrepriseComponent {

 
 entreprise!: Entreprise | undefined;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private entrepriseService: EntrepriseService
  ) {}

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEntreprise(id);
  }

  // 🔹 Charge l’entreprise connectée depuis le service
  loadEntreprise(id: number) {
    this.entreprise = this.entrepriseService.getEntrepriseById(id);
    if (!this.entreprise) {
      console.warn('⚠️ Aucune entreprise trouvée avec cet ID.');
      this.router.navigate(['/admin/entreprises']); // Redirection si id invalide
    }
  }

  editMode = false;

toggleEdit() {
  this.editMode = !this.editMode;
}
retour() {
  this.router.navigate(['/admin/users/entreprises']); 
}
saveEntreprise() {
  if (this.entreprise) {
  //  this.entrepriseService.updateEntreprise(this.entreprise);
    console.log("✅ Entreprise mise à jour :", this.entreprise);
    this.editMode = false;
  }
}

}

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
  this.entrepriseService.getEntrepriseById(id).subscribe({
    next: (data) => {
      if (data) {
        this.entreprise = data;
        console.log('✅ Entreprise chargée :', this.entreprise);
      } else {
        console.warn('⚠️ Aucune entreprise trouvée.');
        this.router.navigate(['/admin/entreprises']);
      }
    },
    error: (err) => {
      console.error('❌ Erreur lors du chargement de l’entreprise :', err);
      this.router.navigate(['/admin/entreprises']);
    }
  });
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

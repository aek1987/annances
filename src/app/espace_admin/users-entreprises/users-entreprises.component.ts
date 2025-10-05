import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/modeles/entreprise';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-entreprises',
  templateUrl: './users-entreprises.component.html',
  styleUrls: ['./users-entreprises.component.css']
})
export class UsersEntreprisesComponent {
 entreprises: Entreprise[] = [];
 index=0;

  constructor(private entreprisesService: EntrepriseService, private router: Router) {}

  ngOnInit(): void {
    this.entreprises = this.entreprisesService.getEntreprises();
  }
 activer(id: number) {
    this.entreprisesService.activerEntreprise(id);
    Swal.fire('✅ Entreprise activée', '', 'success');
  }

  desactiver(id: number) {
    this.entreprisesService.desactiverEntreprise(id);
    Swal.fire('⚠️ Entreprise désactivée', '', 'warning');
  }
   // ✅ Redirection vers la page de détails
  voirDetails(id: number) {
    this.router.navigate(['/admin/entreprises', id]);
  }

}

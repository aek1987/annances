import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/modeles/entreprise';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-entreprises',
  templateUrl: './users-entreprises.component.html',
  styleUrls: ['./users-entreprises.component.css']
})
export class UsersEntreprisesComponent implements OnInit {

  entreprises: Entreprise[] = [];

  constructor(
    private entreprisesService: EntrepriseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEntreprises();
  }

  // 🔹 Charger les entreprises
  loadEntreprises() {
    this.entreprisesService.getEntreprises().subscribe({
      next: (data) => this.entreprises = data,
      error: (err) => console.error('Erreur chargement entreprises', err)
    });
  }

  // 🔹 Mise à jour du status
  updateStatus(id: number, status: 'active' | 'desactive') {
    this.entreprisesService.updateStatus(id, status).subscribe({
      next: (updated) => {
        const entreprise = this.entreprises.find(e => e.id === id);
        if (entreprise) {
          entreprise.status = updated.status;
        }

        Swal.fire(
          '✅ Succès',
          `Entreprise ${status === 'active' ? 'activée' : 'desactive'}`,
          'success'
        );
      },
      error: (err) => {
        console.error(err);
        Swal.fire('❌ Erreur', 'Impossible de modifier le statut', 'error');
      }
    });
  }

  activer(id: number) {
    this.updateStatus(id, 'active');
  }

  desactiver(id: number) {
    this.updateStatus(id, 'desactive');
  }

  // 🔹 Voir les détails
  voirDetails(id: number) {
    this.router.navigate(['/admin/entreprises', id]);
  }
}

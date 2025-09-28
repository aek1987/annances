import { Component, OnInit } from '@angular/core';
import { Offre } from 'src/app/modeles/offres';
import { AuthService } from 'src/app/service/auth.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-offres-admin',
  templateUrl: './offres-admin.component.html',
  styleUrls: ['./offres-admin.component.css']
})
export class OffresAdminComponent implements OnInit {



  offres: Offre[] = [];
  newOffre: Partial<Offre> = {};
  entrepriseId: number | null = null;

  constructor(
    private offreService: OffresService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser && currentUser.role === 'entreprise') {
      this.entrepriseId = currentUser.refId;
      this.loadOffres();
    }
  }

  loadOffres() {
    if (this.entrepriseId !== null) {
      this.offres = this.offreService.getOffresByEntreprise(this.entrepriseId);
    }
  }

  addOffre() {
   /* if (this.entrepriseId && this.newOffre.titre && this.newOffre.description && this.newOffre.localisation) {
      this.offreService.addOffre({
        ...this.newOffre,
        entrepriseId: this.entrepriseId
      });*/
      this.newOffre = {};
      this.loadOffres();
    }
  

  deleteOffre(id: number) {
 /*   this.offreService.deleteOffre(id);
    this.loadOffres();*/
  }
}
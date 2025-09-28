import { Component } from '@angular/core';
import { Offre } from 'src/app/modeles/offres';
import { AuthService } from 'src/app/service/auth.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.css']
})
export class MesOffresComponent {
offres: Offre[] = [];

  constructor(
    private offreService: OffresService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    console.log("entreprise id "+user?.username +"id= "+user?.refId);
    if (user && user.role === 'entreprise') {
      // ✅ Charger uniquement les offres de cette entreprise
      this.offres = this.offreService.getOffresByEntreprise(user.refId);
    }
  }

   voirCandidatures(offre: Offre): void {
    console.log('Voir candidatures pour offre:', offre);
    // TODO: router vers /entreprise/candidatures/:offreId
  }

  editOffre(offre: Offre): void {
    console.log('Modifier offre:', offre);
    // TODO: router vers /entreprise/edit-offre/:id
  }

  deleteOffre(offre: Offre): void {
    this.offreService.deleteOffre(offre.id);
    this.offres = this.offres.filter(o => o.id !== offre.id);
  }
}

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
filteredOffres: Offre[] = [];
  searchPoste: string = '';
  tri: string = '';
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
    
    this.filteredOffres = [...this.offres];

  }

   voirCandidatures(offre: Offre): void {
    console.log('Voir candidatures pour offre:', offre);
   // offre-candidatures
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
  filtrerOffres(): void {
    this.filteredOffres = this.offres.filter(offre =>
      offre.poste.toLowerCase().includes(this.searchPoste.toLowerCase())
    );

    this.trierOffres();
  }

  trierOffres(): void {
    if (this.tri === 'poste') {
      this.filteredOffres.sort((a, b) => a.poste.localeCompare(b.poste));
    } else if (this.tri === 'date') {
      this.filteredOffres.sort((a, b) => 
        new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
      );
    }
  }
}

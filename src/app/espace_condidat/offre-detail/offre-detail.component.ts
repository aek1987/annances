import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffresService } from '../../service/offres.service';
import { Offre } from 'src/app/modeles/offres';
import { Entreprise } from 'src/app/modeles/entreprise';


@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  offre: Offre | undefined;

  constructor(
    private route: ActivatedRoute,
    private offresService: OffresService
  ) {}

 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.offre = this.offresService.getOffreById(id);
  }

  postuler(offre: Offre) {
    if (offre) {
      offre.status = 'postulé';
      alert(`Vous avez postulé pour l'offre : ${offre.titre}`);
    }
  }

  toggleFavori(offre: Offre) {
    if (offre) {
      offre.favori = !offre.favori;
    }
  }
  getEntrepriseNom(id: number): Entreprise | undefined {
    return undefined;
  }
}

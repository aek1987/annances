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
}

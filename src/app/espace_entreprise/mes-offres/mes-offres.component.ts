import { Component } from '@angular/core';
import { Offre } from 'src/app/modeles/offres';

@Component({
  selector: 'app-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.css']
})
export class MesOffresComponent {
offres: Offre[] = [];
}

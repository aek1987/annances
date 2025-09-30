import { Component } from '@angular/core';

@Component({
  selector: 'app-nos-partenaires',
  templateUrl: './nos-partenaires.component.html',
  styleUrls: ['./nos-partenaires.component.css']
})
export class NosPartenairesComponent {
  partenaires = [
    {
      nom: 'Tech Algeria',
      type: 'Partenaire Technologique',
      description: 'Spécialiste en solutions digitales'
    },
    {
      nom: 'Algeria Business School',
      type: 'Partenaire Académique', 
      description: 'Formation et recherche'
    },
    {
      nom: 'Recrute DZ',
      type: 'Partenaire Recrutement',
      description: 'Cabinet de recrutement'
    },
    {
      nom: 'Innov Invest',
      type: 'Partenaire Financier',
      description: 'Investissement et innovation'
    },
    {
      nom: 'Digital Academy',
      type: 'Partenaire Formation',
      description: 'Centre de formation certifié'
    },
    {
      nom: 'Startup Algeria',
      type: 'Partenaire Innovation',
      description: 'Incubateur de startups'
    }
  ];
}
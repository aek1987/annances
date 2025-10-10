import { Component, Input, OnInit } from '@angular/core';

import { Candidature } from '../../modeles/candidature';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CandidatureService } from 'src/app/service/candidature.service';

@Component({
  selector: 'app-candidatures-offre',
  templateUrl: './candidatures-offre.component.html',
  styleUrls: ['./candidatures-offre.component.css']
})
export class CandidaturesOffreComponent implements OnInit {
  @Input() offreId!: number;
  candidatures: Candidature[] = [];

  faEye = faEye;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit() {
    this.candidatures = this.candidatureService.getCandidaturesByOffre(this.offreId);
  }

  changerStatut(candidature: Candidature, statut: Candidature['statut']) {
    this.candidatureService.updateStatut(candidature.id, statut);
    candidature.statut = statut;
  }

  marquerCommeLue(candidature: Candidature) {
    //ng this.candidatureService.marquerCommeLue(candidature.id);
    candidature.luParEntreprise = true;
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/modeles/candidature';
import { CandidatureService } from 'src/app/service/candidature.service';

@Component({
  selector: 'app-candidatures-recues',
  templateUrl: './candidatures-recues.component.html',
  styleUrls: ['./candidatures-recues.component.css']
})
export class CandidaturesRecuesComponent {


  candidatures: Candidature[] = [];
  offreId!: number;

  constructor(
    private candidatureService: CandidatureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 🔗 Récupère l'id de l'offre depuis l'URL
    this.offreId = Number(this.route.snapshot.paramMap.get('id'));
    this.candidatures = this.candidatureService.getCandidaturesByOffre(this.offreId);
  }

  changerStatus(candidatureId: number, status: 'en attente' | 'accepté' | 'refusé') {
   // this.candidatureService.updateStatus(candidatureId, status);
    this.candidatures = this.candidatureService.getCandidaturesByOffre(this.offreId);
  }
}

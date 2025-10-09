import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/modeles/candidature';
import { Offre } from 'src/app/modeles/offres';
import { CandidatService } from 'src/app/service/candidate.service';
import { CandidatureService } from 'src/app/service/candidature.service';

@Component({
  selector: 'app-candidatures-recues',
  templateUrl: './candidatures-recues.component.html',
  styleUrls: ['./candidatures-recues.component.css']
})
export class CandidaturesRecuesComponent implements OnInit {

  candidatures: Candidature[] = [];
  candidaturesFiltrees: Candidature[] = [];
  offres: Offre[] = [];
  candidats: any[] = [];
  selectedOffreId: number | '' = '';

  constructor(
    private candidatureService: CandidatureService,
   // private offreService: OffreService,
    private candidatService: CandidatService
  ) {}

  ngOnInit() {
   /* this.candidatureService.getToutesCandidatures().subscribe(data => {
      this.candidatures = data;
      this.candidaturesFiltrees = data;
    });*/

  //  this.offreService.getMesOffres().subscribe(data => this.offres = data);
 //   this.candidatService.getTousCandidats().subscribe(data => this.candidats = data);
  }

  filtrerParOffre() {
    this.candidaturesFiltrees = this.selectedOffreId
      ? this.candidatures.filter(c => c.offreId === +this.selectedOffreId)
      : this.candidatures;
  }

  getOffreNom(offreId: number) {
    return this.offres.find(o => o.id === offreId)?.poste || '—';
  }

  getCandidatNom(candidatId: number) {
    return this.candidats.find(c => c.refId === candidatId)?.username || 'Inconnu';
  }

  getCandidatCompetences(candidatId: number) {
    const candidat = this.candidats.find(c => c.refId === candidatId);
    return candidat ? candidat.competences.slice(0, 3).join(', ') : '—';
  }

  changerStatut(candidature: Candidature, nouveauStatut: 'accepté' | 'refusé') {
 //   candidature.statut = nouveauStatut;
    //this.candidatureService.updateCandidature(candidature).subscribe();
  }

  voirCV(candidature: Candidature) {
    const candidat = this.candidats.find(c => c.refId === candidature.candidatId);
    if (candidat?.cv) window.open(candidat.cv, '_blank');
  }
  
  
  
  filtre = {
  offre: '',
  statut: '',
  competence: '',
  date: '',
  nom: ''
};

appliquerFiltres() {
  this.candidaturesFiltrees = this.candidatures.filter(c => {
    const offreOk = !this.filtre.offre || c.offreId === +this.filtre.offre;
    const statutOk = !this.filtre.statut || c.statut === this.filtre.statut;
    const dateOk = !this.filtre.date || new Date(c.dateCandidature) >= new Date(this.filtre.date);

    const candidat = this.candidats.find(cd => cd.refId === c.candidatId);
    const nomOk = !this.filtre.nom || candidat?.username.toLowerCase().includes(this.filtre.nom.toLowerCase());
    const competenceOk = !this.filtre.competence ||
     candidat?.competences.some((comp: string) =>
  comp.toLowerCase().includes(this.filtre.competence.toLowerCase())
);

    return offreOk && statutOk && dateOk && nomOk && competenceOk;
  });
}

}

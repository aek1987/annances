import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/modeles/candidat';
import { CandidatService } from 'src/app/service/candidate.service';


@Component({
  selector: 'app-users-candidats',
  templateUrl: './users-candidats.component.html',
  styleUrls: ['./users-candidats.component.css']
})
export class UsersCandidatsComponent implements OnInit {
  candidats: Candidat[] = [];
  //candidat: Candidat | null = null;

  constructor(private candidatsService: CandidatService) {}

  ngOnInit(): void {
    this.candidats = this.candidatsService.getCandidats();
  }

  changerStatut(andidat: Candidat) {
    this.candidatsService.changerStatut(andidat);
    this.candidats = this.candidatsService.getCandidats(); // refresh
  }
}


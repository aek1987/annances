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
  selectedCandidat: Candidat | null = null;
  constructor(private candidatsService: CandidatService) {}

  ngOnInit(): void {
    this.candidats = this.candidatsService.getCandidats();
  }

changerStatut(candidat: Candidat, accepte: boolean) {
  if (accepte) {
    // On marque le candidat comme validé
    candidat.status = 'active';
    alert(`✅ Candidat ${candidat.username} accepté.`);
  } else {
    // On marque le candidat comme refusé ou désactivé
    candidat.status = 'desactive';
    alert(`🚫 Candidat ${candidat.username} refusé.`);
  }

  // Si tu veux mettre à jour la liste dans ton service
  this.candidatsService.updateCandidatState(candidat);
}


voirDetail(c: Candidat) {
  this.selectedCandidat = c;
}
fermerModal() {
  this.selectedCandidat = null;
}
// ✅ Calcule le pourcentage de progression du profil
  getProgression(candidat: Candidat): number {
    return this.candidatsService.getProgression(candidat);
  }

}


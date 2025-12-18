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
    this.candidatsService.getCandidats().subscribe({
    next: (data) => {
      this.candidats = data;
    },
    error: (err) => {
      console.error('Erreur chargement candidats', err);
    }
  });
  }

changerStatut(candidat: Candidat, accepte: boolean) {
  if (accepte) {
    candidat.status = 'active';
    alert(`✅ Candidat ${candidat.username} accepté.`);
  } else {
    candidat.status = 'desactive';
    alert(`🚫 Candidat ${candidat.username} refusé.`);
  }

  console.log("Changement de status de candidat à ", candidat);

  this.candidatsService.updateStatus(candidat.refId, candidat.status).subscribe({
    next: updatedCandidat => {
      console.log('Status mis à jour :', updatedCandidat);

      // ⚡ Met à jour l'objet dans le tableau
      const index = this.candidats.findIndex(c => c.refId === updatedCandidat.refId);
      if (index !== -1) {
        this.candidats[index] = updatedCandidat; // UI Angular se rafraîchit
      }
    },
    error: err => console.error('Erreur lors de la mise à jour du status', err)
  });
}



voirDetail(c: Candidat) {
  this.selectedCandidat = c;
}
fermerModal() {
  this.selectedCandidat = null;
}
/*✅ Calcule le pourcentage de progression du profil
  getProgression(candidat: Candidat): number {
    return this.candidatsService.getProgression(candidat);
  }*/

}


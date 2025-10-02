import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Candidat } from 'src/app/modeles/candidat';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css']
})
export class CandidatDetailComponent {
  @Input() candidat: Candidat | null = null;  // on reçoit le candidat à afficher
  @Output() closeModal = new EventEmitter<void>(); // pour signaler la fermeture

  fermer() {
    this.closeModal.emit(); // prévient le parent
  }
}

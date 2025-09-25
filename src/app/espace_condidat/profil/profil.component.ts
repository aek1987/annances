import { Component } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/modeles/candidat';
import { Experience } from 'src/app/modeles/experience';
import { CandidatService } from 'src/app/service/candidate.service';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  editMode = false;
   candidat: Candidat | null = null;
  newCompetence = '';
  newExperience: Experience = { poste: '', entreprise: '', duree: '' };
  constructor(private router: Router,private candidatService :CandidatService ) 
  {}
  
  
    ngOnInit() {
    this.loadCandidat();
  }

get candidatSafe(): Candidat {
  return this.candidat ?? { 
    refId: 0,
    username: '',
    email: '',
    fonction: '',
    phone: '',
    photo: '../../assets/user.png',
    competences: [],
    experiences: [],
    cv: ''
  };
}


  
  // 🔹 Charge le candidat connecté depuis le service
loadCandidat() {
  this.candidat = this.candidatService.getCandidatConnecte();
  console.log("condidat info"+ this.candidat);
  if (this.candidat) {
    if (!this.candidat.competences) this.candidat.competences = [];
    if (!this.candidat.experiences) this.candidat.experiences = [];
  }
}

  toggleEdit() {
    this.editMode = !this.editMode;
  }
  retour() {
   this.router.navigate(['/offres-emploi']);
  }
  savecandidat() {
    this.editMode = false;
    alert('✅ Profil mis à jour avec succès');
  }

  addCompetence() {
   /* if (this.newCompetence.trim()) {
      this.candidat.competences.push(this.newCompetence.trim());
      this.newCompetence = '';
    }*/
  }

  removeCompetence(index: number) {
  //  this.candidat.competences.splice(index, 1);
  }

  addExperience() {
  /*  if (this.newExperience.poste && this.newExperience.entreprise) {
      this.profil.experiences.push({ ...this.newExperience });
      this.newExperience = { poste: '', entreprise: '', duree: '' };
    }*/
  }

  removeExperience(index: number) {
   // this.candidat.experiences.splice(index, 1);
  }
}

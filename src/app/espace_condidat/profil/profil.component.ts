import { Component } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';

interface Experience {
  poste: string;
  entreprise: string;
  duree: string;
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  constructor(private router: Router) {}
  editMode = false;

  profil = {
    photo: '../../assets/user.png', // image par défaut
    nom: 'Jean Dupont',
    email: 'jean.dupont@mail.com',
    titre: 'Développeur Full Stack',
    localisation: 'Paris, France',
    bio: 'Passionné par le développement web et l’IA.',
    competences: ['Angular', 'Java', 'Spring Boot'],
    experiences: <Experience[]>[
      { poste: 'Développeur Angular', entreprise: 'Capgemini', duree: '2 ans' },
      { poste: 'Développeur Java', entreprise: 'Sopra Steria', duree: '1 an' }
    ],
    cv: './../assets/exemple_cv.pdf'
  };

  newCompetence = '';
  newExperience: Experience = { poste: '', entreprise: '', duree: '' };

  toggleEdit() {
    this.editMode = !this.editMode;
  }
  retour() {
   this.router.navigate(['/offres-emploi']);
  }
  saveProfil() {
    this.editMode = false;
    alert('✅ Profil mis à jour avec succès');
  }

  addCompetence() {
    if (this.newCompetence.trim()) {
      this.profil.competences.push(this.newCompetence.trim());
      this.newCompetence = '';
    }
  }

  removeCompetence(index: number) {
    this.profil.competences.splice(index, 1);
  }

  addExperience() {
    if (this.newExperience.poste && this.newExperience.entreprise) {
      this.profil.experiences.push({ ...this.newExperience });
      this.newExperience = { poste: '', entreprise: '', duree: '' };
    }
  }

  removeExperience(index: number) {
    this.profil.experiences.splice(index, 1);
  }
}

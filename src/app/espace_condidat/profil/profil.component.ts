import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/modeles/candidat';
import { Experience } from 'src/app/modeles/experience';
import { Formation } from 'src/app/modeles/Formation';
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
   // 🔹 Nouveau objet formation à remplir via le formulaire
  newFormation: Formation = {  diplome: '',   ecole: '',    annee: ''  };
  constructor(private router: Router,private candidatService :CandidatService ) 
  {}
  
 experience: Experience = { poste: '', entreprise: '', duree: '' }
    ngOnInit() {
    this.loadCandidat();
  }

get candidatSafe(): Candidat {
  return this.candidat ?? { 
    refId: 0,
    username: '',
    email: '',
    fonction: '',
    status:"active",
    phone: '',
    photo: '../../assets/user.png',
    competences: [],
    experiences: [],
    formations: [],
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
  if (this.candidat) {
    this.candidatService.updateCandidat(this.candidat); // ✅ sauvegarde dans le service/localStorage
    this.editMode = false;
    alert('✅ Profil mis à jour avec succès');
  }
}


  addCompetence(newSkill: string) {
  if (this.candidat) {
    this.candidat.competences.push(newSkill);
    this.candidatService.checkAndActivateCandidat(this.candidat.refId);
  }
  }

  removeCompetence(index: number) {
  //  this.candidat.competences.splice(index, 1);
  }

  addExperience(newExp: Experience) {
 if (this.candidat) {
    this.candidat.experiences.push(newExp);
    this.candidatService.checkAndActivateCandidat(this.candidat.refId);
  }
  }

  removeExperience(index: number) {
   // this.candidat.experiences.splice(index, 1);
  }

 changerPhoto(photoPath: string) {
  if (this.candidat) {
    this.candidat.photo = photoPath;
    this.candidatService.updatePhoto(this.candidat.refId, photoPath);
  }
}
// ➕ Ajouter une formation
addFormation() {
  if (!this.newFormation.diplome || !this.newFormation.ecole || !this.newFormation.annee) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  if (this.candidat) {  // ✅ Vérifie que candidat n'est pas null
    if (!this.candidat.formations) {
      this.candidat.formations = []; // init si undefined
    }
    this.candidat.formations.push({ ...this.newFormation });

    // Reset du formulaire
    this.newFormation = { diplome: '', ecole: '', annee: '' };
  }
}

// ❌ Supprimer une formation par index
removeFormation(index: number) {
  if (this.candidat && this.candidat.formations) {  // ✅ Vérifie que candidat existe
    this.candidat.formations.splice(index, 1);
  }
}
onCvUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (this.candidat) {
        // On stocke le contenu du PDF en base64 (ou en URL si backend)
        this.candidat.cv = reader.result as string;
        
      }
    };
    reader.readAsDataURL(file); // encode en Base64
  }
}


}



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/modeles/candidat';
import { Experience } from 'src/app/modeles/experience';
import { Formation } from 'src/app/modeles/Formation';
import { CandidatService } from 'src/app/service/candidate.service';
import { CvParserService } from 'src/app/service/cv/cv-parser.service';
import { PdfReaderService } from 'src/app/service/cv/pdf-reader.service';



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
  newFormation: Formation = {  diplome: '',   ecole: '',    annee: ''  };
  experience: Experience = { poste: '', entreprise: '', duree: '' }//aucun idee
  cvText: string = '';
  newLangue: string = '';
  constructor(private router: Router,private candidatService :CandidatService,private pdfReader: PdfReaderService ,private cvParser: CvParserService) 
  {}  
 
   ngOnInit() {
    this.loadCandidat();
  }
  
  // 🔹 Charge le candidat connecté depuis le service
loadCandidat() {
  this.candidat = this.candidatService.getCandidatConnecte();

/*
if (this.candidat) {
   const progression = this.progression;     
    this.candidat.status = this.candidatService.getStatus(this.candidat);
    console.log("Progression calculée :", progression+" status :",  this.candidat.status);
   
   
  }*/
 
}

 // ✅ Gestion des fichiers PDF CV
  async onCvUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const texte = await this.pdfReader.extraireTexte(file);
      const infos = this.cvParser.extraireInformations(texte);
      //console.log('📄 Infos détectées depuis le CV :', infos);

      // auto-remplissage partiel
      this.candidat!.username = infos.nom || this.candidat!.username;
      this.candidat!.email = infos.email || this.candidat!.email;
      this.candidat!.phone = infos.telephone || this.candidat!.phone;
      this.candidat!.competences = infos.competences || this.candidat!.competences;
    //  this.candidat!.formations = infos.formations || this.candidat!.competences;

      alert('✅ CV analysé avec succès ! Informations ajoutées.');
    //  this.updateProgression();
    } catch (error) {
      console.error('Erreur lecture CV :', error);
      alert('❌ Erreur lors de l’analyse du CV.');
    }
  }

  extraireInfosCandidat(texte: string) {
    // Exemple très simple (tu peux améliorer avec des regex)
    const email = texte.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    const phone = texte.match(/\+?\d[\d\s().-]{7,}/);

    console.log('📧 Email détecté :', email ? email[0] : 'Aucun');
    console.log('📞 Téléphone détecté :', phone ? phone[0] : 'Aucun');
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

  toggleEdit() {
    this.editMode = !this.editMode;
  }
  retour() {
   this.router.navigate(['/offres-emploi']);
  }

  savecandidat() {
  if (this.candidat) {
     // ✅ sauvegarde dans le service/localStorage et calcluse de status 
    this.candidatService.updateCandidatState(this.candidat);
    this.editMode = false;
    
    alert('✅ Profil mis à jour avec succès');
  }
}


  addCompetence(newSkill: string) {
  if (this.candidat) {
    this.candidat.competences.push(newSkill);
   
  }
  }

  removeCompetence(index: number) {
  //  this.candidat.competences.splice(index, 1);
  }

  addExperience(newExp: Experience) {
 if (this.candidat) {
    this.candidat.experiences.push(newExp);
   
  }
  }

  removeExperience(index: number) {
   // this.candidat.experiences.splice(index, 1);
  }


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
 changerPhoto(photoPath: string) {
  if (this.candidat) {
    this.candidat.photo = photoPath;
    this.candidatService.updatePhoto(this.candidat.refId, photoPath);
  }
}
// 

get progression(): number {
  if (!this.candidat) return 0;
  return this.candidatService.getProgression(this.candidat);
}


addLangue() {
  if (this.newLangue.trim()) {
  //  this.candidat?.langues.push(this.newLangue.trim());
    this.newLangue = '';
  }
}

removeLangue(index: number) {
 // this.candidat?.langues.splice(index, 1);
}

}



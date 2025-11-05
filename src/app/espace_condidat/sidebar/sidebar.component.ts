import { Component, Input } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Account } from 'src/app/modeles/accounts';
import { Candidat } from 'src/app/modeles/candidat';
import { AuthService } from 'src/app/service/auth.service';
import { CandidatService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  faLogout = faSignOutAlt;

  @Input() candidatures: any[] = [];
   profil = {
    photo: 'assets/homme.png', // image par défaut
    nom: 'Jean Dupont',
    email: 'jean.dupont@mail.com',
    titre: 'Développeur Full Stack',
    localisation: 'Paris, France',
    bio: 'Passionné par le développement web et l’IA.',
    competences: ['Angular', 'Java', 'Spring Boot'],
   
    cv: './../assets/exemple_cv.pdf'
  };
   candidat: Candidat | null = null;
  currentUser: Account | null = null;
  constructor(private authService: AuthService, private translate: TranslateService,private candidatService :CandidatService) {
  
    }
  
  ngOnInit() {
  this.currentUser = this.authService.getUser();
  this.loadCandidat();
  }

   // 🔹 Charge le candidat connecté depuis le service
loadCandidat() {
  this.candidatService.getCandidatConnecte().subscribe(candidat => {
    this.candidat = candidat;
    console.log('👤 Candidat connecté  slider:', candidat);
  });
  console.log("condidat info"+ this.candidat);
  
  
 if (this.candidat) {
   const progression = this.progression;     
    this.candidat.status = this.candidatService.getStatus(this.candidat);
    console.log("Progression calculée :", progression+" status :",  this.candidat.status);
   
   
  }



}

get progression(): number {
  if (!this.candidat) return 0;
  return this.candidatService.getProgression(this.candidat);
}





}

import { Component, Input } from '@angular/core';
import { faSignInAlt, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Account } from 'src/app/modeles/accounts';
import { Candidat } from 'src/app/modeles/candidat';
import { AuthService } from 'src/app/service/auth.service';
import { CandidatService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-sidebar-visiteur',
  templateUrl: './sidebar-visiteur.component.html',
  styleUrls: ['./sidebar-visiteur.component.css']
})
export class SidebarVisiteurComponent {

   faStar = faStar;  faUserPlus = faUserPlus; faSignInAlt = faSignInAlt;

  @Input() candidatures: any[] = [];
   profil = {
    photo: 'assets/visiteur.png', // image par défaut
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
  //this.loadCandidat();
  }

   // 🔹 Charge le candidat connecté depuis le service
/*loadCandidat() {
  this.candidat = this.candidatService.getCandidatConnecte();
 
 
  if (this.candidat) {
  
    if (!this.candidat.competences) this.candidat.competences = [];
    if (!this.candidat.experiences) this.candidat.experiences = [];
     console.log("condidat info"+ this.candidat.username);
  } else {  
     console.log("⚠️ Aucun candidat trouvé !");
    }
}*/
}

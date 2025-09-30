import { Component } from '@angular/core';
import { faCreditCard, faLifeRing } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/modeles/accounts';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar-entreprise',
  templateUrl: './sidebar-entreprise.component.html',
  styleUrls: ['./sidebar-entreprise.component.css']
})
export class SidebarEntrepriseComponent {
currentUser: Account | null = null;
 faCreditCard = faCreditCard;
  faLifeRing = faLifeRing;
   constructor(
       private authService: AuthService) {
  
    }
     profil = {
    photo: 'assets/company.png', // image par défaut
    nom: 'Jean Dupont',
    email: 'jean.dupont@mail.com',
    titre: 'Développeur Full Stack',
    localisation: 'Paris, France',
    bio: 'Passionné par le développement web et l’IA.',
    competences: ['Angular', 'Java', 'Spring Boot'],
   
    cv: './../assets/exemple_cv.pdf'
  };
  
ngOnInit(): void {
 this.currentUser = this.authService.getUser();
}


 


}

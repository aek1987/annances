import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() candidatures: any[] = [];
   profil = {
    photo: '../../assets/user.png', // image par défaut
    nom: 'Jean Dupont',
    email: 'jean.dupont@mail.com',
    titre: 'Développeur Full Stack',
    localisation: 'Paris, France',
    bio: 'Passionné par le développement web et l’IA.',
    competences: ['Angular', 'Java', 'Spring Boot'],
   
    cv: './../assets/exemple_cv.pdf'
  };
 
}

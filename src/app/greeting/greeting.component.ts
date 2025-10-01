import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CandidatService } from '../service/candidate.service';
import { Candidat } from '../modeles/candidat';
import { Account } from '../modeles/accounts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent {
 showDropdowns: boolean = false; // false = caché, true = visible
  candidat: Candidat | null = null;
   currentUser: Account | null = null;
constructor(private authService: AuthService,private candidatService :CandidatService, private router: Router,) {
  
    }
  toggleDropdowns() {
    this.showDropdowns = !this.showDropdowns;
  }

   goToAnnonces() {
   
   this.currentUser = this.authService.getUser();
   this.candidat = this.candidatService.getCandidatConnecte();
  
  if (!this.currentUser) {
    // Aucun utilisateur connecté → visiteur
    this.router.navigate(['/visiteur']);
    return;
  }

  switch (this.currentUser.role) {
    case 'candidat':
      this.router.navigate(['/candidat']);
      break;

    case 'entreprise':
      this.router.navigate(['/entreprise']);
      break;

    case 'admin':
      this.router.navigate(['/admin']);
      break;

    default:
      // rôle inconnu → visiteur
      this.router.navigate(['/visiteur']);
      break;
  }

}
}

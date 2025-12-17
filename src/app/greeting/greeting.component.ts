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


  deposerAnnonce() {

  this.currentUser = this.authService.getUser();
  if (!this.currentUser) {
    // 🚨 Aucun utilisateur connecté → aller au login
    this.router.navigate(['/login']);
    return;
  }

  switch (this.currentUser.role) {
    case 'entreprise':
      // ✅ Une entreprise connectée → dépôt d’annonce
      this.router.navigate(['/entreprise/ajouter-offre']);
      break;
   
    default:
      // 👀 rôle inconnu → envoyer au login
      this.router.navigate(['/login']);
      break;
  }
  }
 goToAnnonces() {
  this.currentUser = this.authService.getUser();

  if (!this.currentUser) {
    // Aucun utilisateur connecté → visiteur
    this.router.navigate(['/visiteur']);
    return;
  }

  switch (this.currentUser.role) {
    case 'admin':
      this.router.navigate(['/admin']);
      break;

    case 'entreprise':
      this.router.navigate(['/entreprise']);
      break;

    case 'candidat':
      // Vérifier que le candidat existe côté backend
      this.candidatService.getCandidatConnecte().subscribe(candidat => {
        this.candidat = candidat;
        console.log('👤 Candidat connecté from greeting:', candidat);

        if (!this.candidat) {
          // Si pas trouvé → visiteur
          this.router.navigate(['/visiteur']);
        } else {
          this.router.navigate(['/candidat']);
        }
      });
      break;

    default:
      this.router.navigate(['/visiteur']);
      break;
  }
}

}

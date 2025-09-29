import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../modeles/user';
import { Account } from '../modeles/accounts';
import { Router } from '@angular/router';
import { AlertService } from '../service/alerte-service.service';
import { CandidatService } from '../service/candidate.service';
import { EntrepriseService } from '../service/entreprise.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 user: User = {
  username: '',
  email: '',
  password: '',
  phone: '',
  fonction: 'candidat',
  role: 'candidat',
  photo: '../../assets/user.png'
};
message: string = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: AlertService,
     private candidatService:CandidatService,
    private  entrepriseService :EntrepriseService 
  ) {}

  onSubmit() {
    // 👉 Vérifie que tous les champs sont remplis
    if (!this.user.email || !this.user.password || !this.user.username) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    // 👉 Appelle AuthService.register()
      const newAccount = this.authService.register(this.user);
   
  if (newAccount) {
    if (this.user.role === 'candidat') {
    
      this.candidatService.createEmptyCandidat(newAccount.refId,this.user.username, this.user.email);
    } else if (this.user.role === 'entreprise') {
      this.entrepriseService.createEmptyEntreprise(newAccount.refId,this.user.username, this.user.email);
    }

    this.toastr.success('Compte créé avec succès ✅', 'Inscription réussie');
    this.router.navigate(['/login']);
  } else {
    this.toastr.error('Cet email existe déjà ❌', 'Inscription échouée');
  }

  
  }
}

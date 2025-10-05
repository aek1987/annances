import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modeles/user';
import { AlertService } from 'src/app/service/alerte-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { CandidatService } from 'src/app/service/candidate.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent  {
 user: User = {
  username: '',
  email: '',
  password: '',
  phone: '',
  fonction: '',
  role: 'entreprise',
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
    if (!this.user.phone ||  !this.user.email || !this.user.password || !this.user.username  || !this.user.role) {
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

    this.toastr.success(this.user.role+' Compte créé avec succès ✅', 'Inscription réussie');
    this.router.navigate(['/login']);
  } else {
    this.toastr.error('Cet email existe déjà ❌', 'Inscription échouée');
  }
 
  }


}

import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'; // Service d'authentification
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}
errorMessage: string = '';
  onSubmit() {
  this.errorMessage = ''; // reset erreur avant chaque tentative

  this.authService.login(this.loginData).subscribe({
    next: (response: any) => {
      // Le backend devrait renvoyer { token, role }
      const { token, role } = response;
     console.log("role=== "+response.user.role);
     this.authService.setSession(token, response.user); // 👈 délégué au service

   // 👉 Redirection en fonction du rôle
     switch (response.user.role) {
  case 'entreprise':
    this.router.navigate(['/entreprise']);
    break;
  case 'condidat':
    this.router.navigate(['/candidat']);  console.log("page condidat");
    break;
      case 'standard':
    this.router.navigate(['/greet']);
    break;
     case 'admin':
    this.router.navigate(['/greet']);
    break;
  default:
    this.router.navigate(['/']); // fallback, page d’accueil par ex.
    break;
}

   

      // Exemple avec SweetAlert
      // Swal.fire('✅ Connexion réussie', `Bienvenue ${this.loginData.email}`, 'success');
    },
    error: (error) => {
      console.error('❌ Échec de connexion', error);

      if (error.status === 401) {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      } else if (error.status === 0) {
        this.errorMessage = 'Serveur injoignable. Vérifiez votre connexion.';
      } else {
        this.errorMessage = 'Une erreur inattendue est survenue.';
      }
    },
    complete: () => {
      console.log('Tentative de login terminée.');
    }
  });
}

}

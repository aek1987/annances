import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service'; // Service d'authentification
import { Router } from '@angular/router';
import { AlertService } from '../../service/alerte-service.service';
import { AuthgService } from '../../service/google/authg.service';


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

  constructor(private authService: AuthService, private authServiceg: AuthgService,private router: Router,public  alertService :AlertService) {}
errorMessage: string = '';
onSubmit() {
  this.errorMessage = '';
  console.log('Tentative de login debut.');
  // reset erreur avant chaque tentative
  this.authService.login(this.loginData).subscribe({
    next: (response: any) => {
      // Le backend renvoie { token, email, username, role, ... }
      const { token, email, role, username } = response;

      console.log("Réponse login : role=", role, "username=", username);

      // Stocker les informations de session avec le username
      this.authService.setSession(response);

      // 👉 Redirection en fonction du rôle
      switch (role) {
        case 'entreprise':
          this.router.navigate(['/entreprise']);
          break;

        case 'candidat':
          this.router.navigate(['/candidat']);
          break;

        case 'admin':
          this.router.navigate(['/admin']);
          break;

        default:
          // si login échoué ou rôle inconnu
          console.log("Login Failed ou rôle inconnu");
          this.alertService.error('Email ou mot de passe incorrect', 'Login Failed');
          this.router.navigate(['/greet']);
          break;
      }

      // Exemple avec SweetAlert (optionnel)
      // Swal.fire('✅ Connexion réussie', `Bienvenue ${username}`, 'success');
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

 loginWithGoogle() {
    this.authServiceg.loginWithGoogle()
      .then(res => console.log('Utilisateur connecté avec Google:', res.user))
      .catch(err => console.error(err));
  }
}

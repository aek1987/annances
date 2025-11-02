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
  this.errorMessage = ''; // reset erreur avant chaque tentative

  this.authService.login(this.loginData).subscribe({
    next: (response: any) => {
      // Le backend devrait renvoyer { token, role }
     const { token, user, role } = response;
     console.log("reponse=== ",response);
    
     this.authService.setSession(token, response.user, response.roles); // 👈 délégué au service

   // 👉 Redirection en fonction du rôle
     switch (response.roles) {
  case 'entreprise':
    this.router.navigate(['/entreprise']);
    break;
  case 'candidat':
    console.log("success username "+response.user.username);
    this.router.navigate(['/candidat']); 
    break;
     case 'standard': // le login est echoué   
    console.log("Login Failed");
    this.alertService.error('Invalid email or password', 'Login Failed'); 
    this.router.navigate(['/greet']);
    break;
     case 'admin':
    this.router.navigate(['/admin']);
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
 loginWithGoogle() {
    this.authServiceg.loginWithGoogle()
      .then(res => console.log('Utilisateur connecté avec Google:', res.user))
      .catch(err => console.error(err));
  }
}

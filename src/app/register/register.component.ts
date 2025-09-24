import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../modeles/user';
import { Account } from '../modeles/accounts';
import { Router } from '@angular/router';
import { AlertService } from '../service/alerte-service.service';

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
    private toastr: AlertService
  ) {}

  onSubmit() {
    // 👉 Vérifie que tous les champs sont remplis
    if (!this.user.email || !this.user.password || !this.user.username) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    // 👉 Appelle AuthService.register()
    const registered = this.authService.register(this.user);

    if (registered) {
      this.toastr.success('Compte créé avec succès ✅', 'Inscription réussie');
      this.router.navigate(['/login']); // redirige vers login
    } else {
      this.toastr.error('Cet email existe déjà ❌', 'Inscription échouée');
    }
  }
}

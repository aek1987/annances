import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../modeles/user';
import { Account } from '../modeles/accounts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 user: Account = {
  username: '',
  email: '',
  password: '',
  phone: '',
  fonction: '',
  role: 'candidat'
};
message: string = '';

constructor(private authService: AuthService) {}

onSubmit() {
  const success = this.authService.register(this.user);
  if (success) {
    this.message = 'Inscription réussie !';
  } else {
    this.message = 'Cet utilisateur existe déjà.';
  }
}

}

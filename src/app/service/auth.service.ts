import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../modeles/accounts';
import { User } from '../modeles/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*private accounts: Account[] = [
  // 👤 Candidats
  { email: 'ali.candidat@gmail.com', password: '123', role: 'candidat',  fonction: 'Développeur Java',  phone: '0550-123-456',photo: '../../assets/user.png',refId: 1  },
  { email: 'sara.candidat@gmail.com', password: '1234',  role: 'candidat', username: 'Sara Bensalem',   fonction: 'Ingénieure Data',         phone: '0551-987-654',photo: '../../assets/user.png' ,refId: 1},
  { email: 'mohamed.job@gmail.com', password: 'pass',  role: 'candidat', username: 'Mohamed Lamine',  fonction: 'Technicien Réseau',       phone: '0552-111-222' ,photo: '../../assets/user.png',refId: 1},
  { email: 'amina.cv@gmail.com', password: 'amina', role: 'candidat', username: 'Amina Karim',     fonction: 'Designer UX/UI',          phone: '0553-333-444',photo: '../../assets/user.png',refId: 1 },
  { email: 'youssef.talent@gmail.com',   password: 'youss', role: 'candidat', username: 'Youssef Haddad',  fonction: 'Développeur Angular',     phone: '0554-555-666',photo: '../../assets/user.png',refId: 1 },
  { email: 'nadia.profil@gmail.com', password: 'nadia', role: 'candidat', username: 'Nadia Rahmani',   fonction: 'Chef de projet IT',       phone: '0555-777-888' ,photo: '../../assets/user.png',refId: 1},
  { email: 'candidat@gmail.com',password: '123', role: 'candidat', username: 'Nadia Rahmani',   fonction: 'Chef de projet IT',  phone: '0555-777-888',photo: '../../assets/user.png' ,refId: 1},
  
  // 🏢 Entreprises
  { email: 'hr@techcorp.com', password: '123',   role: 'entreprise', username: 'TechCorp SARL', fonction: 'Recruteur',  phone: '021-123-456',photo: '../../assets/user.png' ,refId: 1},
  { email: 'jobs@foodly.com', password: 'jobs',  role: 'entreprise', username: 'Foodly Group',  fonction: 'Responsable RH', phone: '021-654-987' ,photo: '../../assets/user.png',refId: 1},
  { email: 'contact@webdev.fr', password: 'azerty',role: 'entreprise', username: 'WebDev France', fonction: 'Manager Recrutement',  phone: '+33-1-2345-6789',photo: '../../assets/user.png',refId: 1 },
  // 👑 Admin
  { email: 'admin@gmail.com ',  password: 'admin', role: 'admin',     username: 'Super Admin',    fonction: 'Administrateur système',  phone: '010-000-0000',photo: '../../assets/user.png',refId: 1 }
];*/
private accounts: Account[] = [
  // 👤 Candidats
  { email: 'ali.candidat@gmail.com', password: '123',username: 'Sara Bensalem', role: 'candidat', refId: 1 },
  { email: 'Lamine.candidat@gail.com', password: '1234',username: 'Mohamed Lamine', role: 'candidat', refId: 2 },
  { email: 'mohamed.job@gmail.com', password: 'pass',username: 'Amina Karim', role: 'candidat', refId: 3 },
  { email: 'amina.cv@gmail.com', password: 'amina',  username: 'Youssef Haddad',role: 'candidat', refId: 4 },
  { email: 'youssef.talent@gmail.com', password: 'youss', username: 'Nadia Rahmani', role: 'candidat', refId: 5 },
  { email: 'nekaa.profil@gmail.com', password: 'nadia', username: 'nekaa aek',role: 'candidat', refId: 6 },
  { email: 'candidat@gmail.com', password: '123',  username: 'candidat aek',role: 'candidat', refId: 7 },

  // 🏢 Entreprises
  { email: 'hr@techcorp.com', password: '123', username: 'candidat aek',role: 'entreprise', refId: 1 },
  { email: 'jobs@foodly.com', password: 'jobs',username: 'candidat aek', role: 'entreprise', refId: 2 },
  { email: 'contact@webdev.fr', password: 'azerty',username: 'candidat aek', role: 'entreprise', refId: 3 },

  // 👑 Admin
  { email: 'admin@gmail.com', password: 'admin',username: 'candidat aek', role: 'admin', refId: 0 }
];

  constructor() {}

  login(credentials: { email: string; password: string }): Observable<any> {
    const account = this.accounts.find(
      acc => acc.email === credentials.email && acc.password === credentials.password
    );

    if (account) {
      // Stocke l'utilisateur complet + token

      this.setSession('fake-token', account);
      return of({ token: 'fake-token', user: account });
    } else {
      return of({ token: null, user: { role: 'standard' }});
    }
  }

  // 🔹 Nouvelle version de setSession
  setSession(token: string, user: Account) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken') && !!localStorage.getItem('user');
  }

  getUser(): Account | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
// ✅ Enregistrement
  register(user: User): boolean {
    const usersString = localStorage.getItem('users');
    const users: Account[] = usersString ? JSON.parse(usersString) : [];

    // Vérifie si l'email existe déjà
    const exists = users.find(u => u.email === user.email);
    if (exists) {
      return false; // utilisateur déjà existant
    }

    // Ajoute le nouvel utilisateur
   // users.push(user);
   // localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

}

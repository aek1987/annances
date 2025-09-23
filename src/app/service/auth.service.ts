import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../modeles/accounts';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private accounts: Account[] = [
  // 👤 Candidats
  { email: 'ali.candidat@gmail.com',     password: '123',   role: 'candidat', username: 'Ali Benomar',     fonction: 'Développeur Java',        phone: '0550-123-456' },
  { email: 'sara.candidat@gmail.com',    password: '1234',  role: 'candidat', username: 'Sara Bensalem',   fonction: 'Ingénieure Data',         phone: '0551-987-654' },
  { email: 'mohamed.job@gmail.com',      password: 'pass',  role: 'candidat', username: 'Mohamed Lamine',  fonction: 'Technicien Réseau',       phone: '0552-111-222' },
  { email: 'amina.cv@gmail.com',         password: 'amina', role: 'candidat', username: 'Amina Karim',     fonction: 'Designer UX/UI',          phone: '0553-333-444' },
  { email: 'youssef.talent@gmail.com',   password: 'youss', role: 'candidat', username: 'Youssef Haddad',  fonction: 'Développeur Angular',     phone: '0554-555-666' },
  { email: 'nadia.profil@gmail.com',     password: 'nadia', role: 'candidat', username: 'Nadia Rahmani',   fonction: 'Chef de projet IT',       phone: '0555-777-888' },
  { email: 'candidat@gmail.com',     password: '123', role: 'candidat', username: 'Nadia Rahmani',   fonction: 'Chef de projet IT',       phone: '0555-777-888' },
  // 🏢 Entreprises
  { email: 'hr@techcorp.com',            password: '123',   role: 'entreprise', username: 'TechCorp SARL', fonction: 'Recruteur',               phone: '021-123-456' },
  { email: 'jobs@foodly.com',            password: 'jobs',  role: 'entreprise', username: 'Foodly Group',  fonction: 'Responsable RH',          phone: '021-654-987' },
  { email: 'contact@webdev.fr',          password: 'azerty',role: 'entreprise', username: 'WebDev France', fonction: 'Manager Recrutement',     phone: '+33-1-2345-6789' },

  // 👑 Admin
  { email: 'admin@gmail.com',            password: 'admin', role: 'admin',     username: 'Super Admin',    fonction: 'Administrateur système',  phone: '010-000-0000' }
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
  register(user: Account): boolean {
  // Récupère tous les utilisateurs enregistrés
  const usersString = localStorage.getItem('users');
  const users: Account[] = usersString ? JSON.parse(usersString) : [];

  // Vérifie si l'utilisateur existe déjà
  const exists = users.find(u => u.email === user.email);
  if (exists) {
    return false; // utilisateur déjà existant
  }

  // Ajoute le nouvel utilisateur
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}


}

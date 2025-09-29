import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Account } from '../modeles/accounts';
import { User } from '../modeles/user';
import { CandidatService } from './candidate.service';
import { EntrepriseService } from './entreprise.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private accounts: Account[] = [
  // 👤 Candidats
  { email: 'ali.candidat@gmail.com', password: '123',username: 'Sara Bensalem', role: 'candidat', refId: 1 },
  { email: 'Lamine.candidat@gail.com', password: '1234',username: 'Mohamed Lamine', role: 'candidat', refId: 2 },
  { email: 'mohamed.job@gmail.com', password: 'pass',username: 'Amina Karim', role: 'candidat', refId: 3 },
  { email: 'amina.cv@gmail.com', password: 'amina',  username: 'Youssef Haddad',role: 'candidat', refId: 4 },
  { email: 'Haddad.talent@gmail.com', password: 'youss', username: 'Nadia Rahmani', role: 'candidat', refId: 5 },
  { email: 'nekaa.profil@gmail.com', password: 'nekka', username: 'nekaa aek',role: 'candidat', refId: 6 },
  { email: 'candidat@gmail.com', password: '123',  username: 'candidat aek',role: 'candidat', refId: 7 },

  // 🏢 Entreprises
  { email: 'hr@techcorp.com', password: '123', username: 'candidat aek',role: 'entreprise', refId: 1 },
  { email: 'jobs@foodly.com', password: 'jobs',username: 'foodly', role: 'entreprise', refId: 2 },
  { email: 'contact@webdev.fr', password: 'azerty',username: 'candidat aek', role: 'entreprise', refId: 3 },

  // 👑 Admin
  { email: 'admin@gmail.com', password: 'admin',username: 'admin', role: 'admin', refId: 0 }
];
// 🔔 BehaviorSubject pour suivre l’utilisateur connecté
  private currentUserSubject = new BehaviorSubject<Account | null>(null);
  currentUser$: Observable<Account | null> = this.currentUserSubject.asObservable();

  constructor( ) 
  {
   
  }

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
    this.currentUserSubject.next(user); // 🔔 notifie Navbar + Sidebar
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
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
register(user: User): Account | null {
   console.log(" creation nouveau compte utilisateur ");
  // Vérifie si l'email existe déjà dans le tableau accounts
  const exists = this.accounts.find(acc => acc.email === user.email);
  if (exists) {
     console.log(" utilisateur déjà existant"+exists);
    return null; // utilisateur déjà existant

  }

  // Crée un nouvel Account à partir du User
  const newAccount: Account = {
    email: user.email,
    password: user.password,
    username: user.username,
    role: user.role || 'candidat', // par défaut 'candidat' si pas précisé
    refId: this.accounts.length + 1 // génère un nouvel ID simple
  };

  // Ajoute le nouvel utilisateur au tableau accounts
 
  this.accounts.push(newAccount);
   
   

  return newAccount; // inscription réussie
}


}

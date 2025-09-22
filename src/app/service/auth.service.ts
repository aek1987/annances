import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Account {
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accounts: Account[] = [
    { email: 'condidat@gmail.com', password: '123', role: 'condidat' },
    { email: 'entreprise@gmail.com', password: '123', role: 'entreprise' },
    { email: 'admin@gmail.com', password: 'admin', role: 'admin' }
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

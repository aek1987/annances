import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
  interface Account {
  email: string;
  password: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';  // Assurez-vous que cette URL est correcte
  private userRole: string | null = null;

  constructor(private http: HttpClient) {

    this.userRole = localStorage.getItem('userRole');
  }

  // 🔹 Simulation d’un login local
  // Liste des comptes fictifs
  private accounts: Account[] = [
    { email: 'condidat@gmail.com', password: '123', role: 'condidat' },
    { email: 'enterprise@gmail.com', password: '123', role: 'entreprise' },
    { email: 'admin@gmail.com', password: 'admin', role: 'admin' }
  ];

login(credentials: { email: string; password: string }): Observable<any> {
   const account = this.accounts.find(acc => 
      acc.email === credentials.email && acc.password === credentials.password
    );
  
    return of({
      token: 'fake-token',
      role: account ? account.role : 'standard'  // rôle par défaut si non trouvé
    });
}

 // Gestion de session
  setSession(token: string, role: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role || 'user');
  }
  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

// Enregistre l'utilisateur dans localStorage
register(user: any): boolean {
  const existingUser = localStorage.getItem(user.email);
  if (existingUser) {
    return false; // L'utilisateur existe déjà
  }
  localStorage.setItem(user.email, JSON.stringify(user)); // Enregistre l'utilisateur
  return true;
}

  isAdmin(): boolean {
    return localStorage.getItem('userRole')=== 'admin';/// renvoi true if amdin
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Account } from '../modeles/accounts';
import { User } from '../modeles/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*
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
  { email: 'hr@techcorp.com', password: '123', username: 'techcorp',role: 'entreprise', refId: 101 },
  { email: 'jobs@foodly.com', password: 'jobs',username: 'foodly', role: 'entreprise', refId: 102 },
  { email: 'contact@webdev.fr', password: 'azerty',username: 'candidat aek', role: 'entreprise', refId: 103 },
  { email: 'webdev@webdev.fr', password: 'webdev',username: 'webdev society', role: 'entreprise', refId: 104 },

  // 👑 Admin
  { email: 'admin@gmail.com', password: 'admin',username: 'admin', role: 'admin', refId: 0 }
];*/
// 🔔 BehaviorSubject pour suivre l’utilisateur connecté
 
  private currentUserSubject = new BehaviorSubject<Account | null>(this.getUser());
  currentUser$: Observable<Account | null> = this.currentUserSubject.asObservable();
 private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient ) 
  {
   
  }
/**
   * Connexion utilisateur (login)
   */

login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, credentials)
    .pipe(
      tap(response => {
        if (response?.token) {
          console.log("✅ Login réussi :", response);
          this.setSession(response);
        }
      })
    );
}

// Modifier setSession pour recevoir le response complet
public setSession(response: any): void {
  const { token, email, role, username } = response;
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify({ email, role, username }));
  this.currentUserSubject.next({ email, role, username } as Account);

 ;
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
 /**
   * ✅ Enregistrement utilisateur (inscription)
   */
  register(user: User): Observable<any> {
    console.log('Création d’un nouveau compte utilisateur...');
    return this.http.post(`${this.apiUrl}/register`, user);
  }


}

// src/app/services/candidat.service.ts
import { Injectable } from '@angular/core';
import { Candidat } from '../modeles/candidat';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private candidats: Candidat[] = [
    { refId: 1, username: 'Sara Bensalem', email: 'ali.candidat@gmail.com', status: 'active'  ,photo: '../../assets/user.png', fonction: 'Développeur Java', phone: '0550-123-456', competences: ['Java', 'Spring Boot'], bio: 'Passionnée de dev web', experiences: [{ poste: 'Dev Java', entreprise: 'Capgemini', duree: '2 ans' }] },
    { refId: 2, username: 'Mohamed Lamine', email: 'sara.candidat@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Ingénieur Data', phone: '0551-987-654', competences: ['Python', 'SQL'], bio: 'Spécialiste data', experiences: [{ poste: 'Data Analyst', entreprise: 'Sopra Steria', duree: '1 an' }] },
    { refId: 3, username: 'Amina Karim', email: 'mohamed.job@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Designer UX/UI', phone: '0553-333-444' },
    { refId: 4, username: 'Youssef Haddad', email: 'amina.cv@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Développeur Angular', phone: '0554-555-666' },
    { refId: 5, username: 'Nadia Rahmani', email: 'youssef.talent@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Chef de projet IT', phone: '0555-777-888' },
    { refId: 6, username: 'nekaa aek', email: 'nekaa.profil@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Full Stack Developer', phone: '0556-000-111' },
    { refId: 7, username: 'candidat aek', email: 'candidat@gmail.com',  status: 'active',photo: '../../assets/user.png', fonction: 'Développeur', phone: '0557-222-333' }
  ];

  constructor(private authService :AuthService) { }
// src/app/services/candidat.service.ts
getCandidatConnecte(): Candidat | null {
  const account = this.authService.getUser();
  if (!account || account.role !== 'candidat') return null;

  // Cherche le candidat correspondant dans la liste
  const candidat = this.candidats.find(c => c.refId === account.refId);
  return candidat || null;
}

  // ✅ Retourne la liste complète des candidats
  getCandidats(): Candidat[] {
    return this.candidats;
  }

  // ✅ Retourne un candidat par refId
  getCandidatById(refId: number): Candidat | undefined {
    return this.candidats.find(c => c.refId === refId);
  }

  // 🔹 Optionnel : recherche par nom ou fonction
  searchCandidat(query: string): Candidat[] {
    return this.candidats.filter(c => 
      c.username.toLowerCase().includes(query.toLowerCase()) ||
      c.fonction?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

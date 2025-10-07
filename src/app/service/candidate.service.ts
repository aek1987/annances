// src/app/services/candidat.service.ts
import { Injectable } from '@angular/core';
import { Candidat } from '../modeles/candidat';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private candidats: Candidat[] = [
    { refId: 1, username: 'Sara Bensalem', email: 'ali.candidat@gmail.com', status: 'desactive'  ,photo: '../../assets/user.png', fonction: 'Développeur Java', phone: '0550-123-456', competences: ['Java', 'Spring Boot'], bio: 'Passionnée de dev web', experiences: [{ poste: 'Dev Java', entreprise: 'Capgemini', duree: '2 ans' }],formations:[],cv:"" },
    { refId: 2, username: 'Mohamed Lamine', email: 'sara.candidat@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Ingénieur Data', phone: '0551-987-654', competences: ['Python', 'SQL'], bio: 'Spécialiste data', experiences: [{ poste: 'Data Analyst', entreprise: 'Sopra Steria', duree: '1 an' }],formations:[] ,cv:""},
    { refId: 3, username: 'Amina Karim', email: 'mohamed.job@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Designer UX/UI', phone: '0553-333-444',  competences:[],experiences:[],formations:[],cv:""},
    { refId: 4, username: 'Youssef Haddad', email: 'amina.cv@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Développeur Angular', phone: '0554-555-666' ,  competences:[],experiences:[],formations:[],cv:""},
    { refId: 5, username: 'Nadia Rahmani', email: 'youssef.talent@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Chef de projet IT', phone: '0555-777-888',  competences:[],experiences:[],formations:[] ,cv:""},
    { refId: 6, username: 'nekaa aek', email: 'nekaa.profil@gmail.com', status: 'active', photo: '../../assets/user.png', fonction: 'Full Stack Developer', phone: '0556-000-111' ,  competences:[],experiences:[],formations:[],cv:""},
    { refId: 7, username: 'candidat aek', email: 'candidat@gmail.com',  status: 'desactive',photo: 'assets/user.png', fonction: 'Développeur', phone: '0557-222-333',  competences:[],experiences:[] ,formations:[],cv:""}
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
  // Crée un candidat vide lié à un Account
  createEmptyCandidat(refId: number, username: string, email?: string): Candidat {
    const newCandidat: Candidat = {
      refId,
      username,
      email,
      status: 'desactive', // 🔴 par défaut
      photo:"assets/homme.png", // 🔴 par défaut
      cv:"vide", 
      competences: [],
      experiences: [], formations: [],progression: 0 
    };

    this.candidats.push(newCandidat);
    // 👉 Affiche l'état du tableau dans la console
  console.log("✅ Nouveau candidat ajouté :", newCandidat);
  console.log("📌 Liste complète des candidats :", this.candidats);
    return newCandidat;
  }

updatePhoto(refId: number, newPhoto: string) {
  const candidat = this.candidats.find(c => c.refId === refId);
  if (candidat) {
    candidat.photo = newPhoto;
    console.log("📷 Photo mise à jour pour :", candidat.username);
  }
}

 // Vérifie la complétude du profil et calcule la progression
getProgression(candidat: Candidat): number {
  
   
  let steps = 0;
  let completed = 0;

  // 📷 Photo
  steps++;
  if (candidat.photo && candidat.photo !== '../../assets/user.png') completed++;

  // ✅ Compétences
  steps++;
  if (candidat.competences && candidat.competences.length > 0) completed++;

  // ✅ Expériences
  steps++;
  if (candidat.experiences && candidat.experiences.length > 0) completed++;

  // 🎓 Formations
  steps++;
  if (candidat.formations && candidat.formations.length > 0) completed++;

  // 📄 CV
  steps++;
  if (candidat.cv && candidat.cv.length > 0) completed++;

 
  // 🔢 Pourcentage
  return Math.round((completed / steps) * 100);
}





// Vérifie si le candidat peut postuler
canPostuler(refId: number): boolean {
  const candidat = this.candidats.find(c => c.refId === refId);
  return candidat ? candidat.status === 'active' : false;
}

 
getStatus(candidat: Candidat): 'active' | 'desactive' |'en_attente_validation'|'incomplet'|'pret' {
  candidat.progression = this.getProgression(candidat);  
 
// 🚀 Cas spécial : si déjà validé par l’admin, on ne touche pas
  if (candidat.status === 'active') {
    return 'active';
  }

  switch (true) {
    case ( candidat.progression < 50):
      return 'incomplet';   // Trop peu d'infos

    case ( candidat.progression >= 50 &&  candidat.progression < 80):
      return 'pret';     // Profil assez rempli

    case ( candidat.progression >= 80):
      return 'en_attente_validation'; // Attente admin

    default:
      return 'desactive';   // fallback
  }

}
updateCandidatState(candidat: Candidat) {
  candidat.progression = this.getProgression(candidat); 
  const index = this.candidats.findIndex(c => c.refId === candidat.refId);
  if (index !== -1) {
    this.candidats[index] = candidat;
  }
 
}


}

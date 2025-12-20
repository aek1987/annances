import { Injectable } from '@angular/core';
import { Entreprise } from '../modeles/entreprise';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
/*
 private entreprises: Entreprise[] = [
  { 
    id: 101, 
    username: 'TechCorp SARL', 
    email: 'hr@techcorp.com', 
    status: 'active',  
    phone: '021-123-456', 
    secteur: 'Informatique', 
    description: 'Société innovante spécialisée dans le développement logiciel.', 
    logo: '../../assets/company.png',
    site: 'https://www.techcorp.com'
  },
  {
    id: 102,
    username: 'Foodly Group', 
    email: 'jobs@foodly.com',
    status: 'active',
    phone: '021-654-987', 
    secteur: 'Agroalimentaire', 
    description: 'Leader dans la transformation agroalimentaire.', 
    logo: '../../assets/company.png',
    site: 'https://www.foodly.com'
  },
  {
    id: 103,
    username: 'GreenTech Solutions', 
    email: 'contact@greentech.com',
    status: 'active',
    phone: '021-987-123', 
    secteur: 'Energie renouvelable', 
    description: 'Entreprise écoresponsable spécialisée dans l’énergie solaire.', 
    logo: '../../assets/company.png',
    site: 'https://www.greentech.com'
  },
  {
    id: 104, 
    username: 'MediCare', 
    email: 'recrutement@medicare.com',
    status: 'active', 
    phone: '021-555-666', 
    secteur: 'Santé', 
    description: 'Clinique privée de référence.', 
    logo: '../../assets/company.png',
    site: 'https://www.medicare.com'
  }
]*/


private apiUrl = `${environment.apiUrl}/api/entreprises`;
  
  constructor(private authService: AuthService,private http: HttpClient) {}

  // 🔹 Retourne l’entreprise connectée (via AuthService)
getEntrepriseConnectee(): Observable<Entreprise | null> {
  const account = this.authService.getUser();
  if (!account || account.role !== 'entreprise') {
    return of(null); // ok maintenant
  }
 return this.http.get<Entreprise>(`${this.apiUrl}/by-email/${account.email}`).pipe(
    catchError(() => of(null))
  );
}



  // ✅ Liste complète
  getEntreprises(): Observable<Entreprise[]> {
  return this.http.get<Entreprise[]>(`${this.apiUrl}`);
}


  // ✅ Recherche par ID
  getEntrepriseById(id: number): Observable<Entreprise> {
     return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);
  }
  // ✅ Recherche par ID
  getEntrepriseById2(id: number): Observable<Entreprise>   {
     return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);
  }
  // ✅ Recherche par nom ou secteur
 /* searchEntreprise(query: string): Entreprise[] {
    return this.entreprises.filter(e =>
      e.username.toLowerCase().includes(query.toLowerCase()) ||
      e.secteur?.toLowerCase().includes(query.toLowerCase())
    );
  }*/

  createEmptyEntreprise(refId: number, name: string, email: string): Entreprise {
  const newEntreprise: Entreprise = {
      id:refId ,
      username: name,
      email,
      phone: '',
      secteur: '',
      description: '',
      logo: '',
      status: 'desactive'   // 🔴 par défaut
    };

 //   this.entreprises.push(newEntreprise);
    return newEntreprise;
  }
   // ✅ Active une entreprise
activerEntreprise(id: number): Observable<Entreprise> {
  return this.http.put<Entreprise>(`${this.apiUrl}/${id}/activer`, {});
}


desactiverEntreprise(id: number): Observable<Entreprise> {
  return this.http.put<Entreprise>(`${this.apiUrl}/${id}/desactiver`, {});
}


saveEntreprise(entreprise: Entreprise): Observable<Entreprise> {
  console.log("this entreprise", entreprise);
  return this.http.put<Entreprise>(`${this.apiUrl}/${entreprise.id}`, entreprise);
}


updateStatus(id: number, status: string) {
  return this.http.put<Entreprise>(
    `${this.apiUrl}/${id}/status`,
    { status }
  );
}


  // ✅ UPDATE (PUT)
  updateEntreprise(id: number, data: Partial<Entreprise>): Observable<Entreprise> {
    console.log('PUT entreprise =>', data);
    return this.http.put<Entreprise>(`${this.apiUrl}/${id}`, data);
  }

}

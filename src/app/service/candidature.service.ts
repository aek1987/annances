import { Injectable } from '@angular/core';
import { Candidature } from '../modeles/candidature';
import { Offre } from '../modeles/offres';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
 
  private candidatures: Candidature[] = [
    { id: 1, offreId: 1, candidatId: 1, dateCandidature: new Date(), statut: 'en attente' },
    { id: 2, offreId: 2, candidatId: 2, dateCandidature: new Date(), statut: 'acceptée' }
  ];


private apiUrl =  `${environment.apiUrl}/api/candidatures`;

constructor(private http: HttpClient) {}
  // ✅ Récupérer toutes les candidatures
  getAllCandidatures(): Candidature[] {
    return this.candidatures;
  }

  // ✅ Récupérer les candidatures d’un candidat depuis le backend
  getCandidaturesByCandidat(candidatId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/${candidatId}`);
  }
  // ✅ Récupérer les candidatures d’une offre
  getCandidaturesByOffre(offreId: number): Candidature[] {
    
    return this.candidatures.filter(c => c.offreId === offreId);
  }

  addCandidature(offreId: number, candidatId: number, message?: string): Observable<Candidature> {
    const params = new HttpParams()
      .set('offreId', offreId)
      .set('candidatId', candidatId)
      .set('message', message || '');

    return this.http.post<Candidature>(`${this.apiUrl}/add`, null, { params });
  }

  getAll(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.apiUrl);
  }

  // ✅ Mettre à jour le statut (acceptée/refusée)
  updateStatut(candidatureId: number, statut: 'en attente' | 'acceptée' | 'refusée'): boolean {
    const index = this.candidatures.findIndex(c => c.id === candidatureId);
    if (index !== -1) {
      this.candidatures[index].statut = statut;
      return true;
    }
    return false;
  }

  // ✅ Supprimer une candidature
  deleteCandidature(id: number): boolean {
    const index = this.candidatures.findIndex(c => c.id === id);
    if (index !== -1) {
      this.candidatures.splice(index, 1);
      return true;
    }
    return false;
  }

  // ✅ Récupérer toutes les candidatures reçues pour les offres d'une entreprise
getCandidaturesByEntreprise(entrepriseId: number, offres: Offre[]): { offre: Offre, candidatures: Candidature[] }[] {
  // Filtrer les offres de l'entreprise
  const offresEntreprise = offres.filter(o => o.entrepriseId === entrepriseId);

  // Retourner un tableau d'objets avec chaque offre et ses candidatures
  return offresEntreprise.map(offre => ({
    offre,
    candidatures: this.getCandidaturesByOffre(offre.id)
  }));
}

}

import { Injectable } from '@angular/core';
import { Alerte } from '../modeles/alerte';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlerteEmploiService {
  private apiUrl = 'http://localhost:8080/api/alertes';

  constructor(private http: HttpClient) {}

  addAlerte(alerte: Alerte): Observable<Alerte> {
    return this.http.post<Alerte>(this.apiUrl, alerte);
  }

  getAlertes(): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(this.apiUrl);
  }

  getAlerteById(id: number): Observable<Alerte> {
    return this.http.get<Alerte>(`${this.apiUrl}/${id}`);
  }

  deleteAlerte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleAlerte(alerte: Alerte): Observable<Alerte> {
    const updated = { ...alerte, active: !alerte.active };
    return this.http.put<Alerte>(`${this.apiUrl}/${alerte.id}`, updated);
  }
}

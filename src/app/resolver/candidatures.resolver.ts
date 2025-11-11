import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { CandidatService } from '../service/candidate.service';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../modeles/candidature';

export const CandidaturesResolver: ResolveFn<{ candidat: any; candidatures: Candidature[]; totalPages: number }> = () => {
  const candidatService = inject(CandidatService);
  const candidatureService = inject(CandidatureService);

  // ⚙️ Paramètres de pagination
  const page = 0;
  const size = 5;

  return candidatService.getCandidatConnecte().pipe(
    switchMap(candidat => {
      if (!candidat?.refId) {
        console.warn('⚠️ Aucun candidat connecté.');
        return of({ candidat: null, candidatures: [], totalPages: 0 });
      }

      return candidatureService.getCandidaturesByCandidatPaginated(candidat.refId, page, size).pipe(
        map(response => ({
          candidat,
          candidatures: response?.content ?? [],   // ✅ Sécurité si `response` est null
          totalPages: response?.totalPages ?? 1    // ✅ Valeur par défaut sûre
        })),
        catchError(err => {
          console.error('❌ Erreur lors du chargement des candidatures :', err);
          return of({ candidat, candidatures: [], totalPages: 0 });
        })
      );
    }),
    catchError(err => {
      console.error('❌ Erreur lors du chargement du candidat :', err);
      return of({ candidat: null, candidatures: [], totalPages: 0 });
    })
  );
};

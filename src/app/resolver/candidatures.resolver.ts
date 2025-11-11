import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { CandidatService } from '../service/candidate.service';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../modeles/candidature';

export const CandidaturesResolver: ResolveFn<{ candidat: any; candidatures: Candidature[] }> = () => {
  const candidatService = inject(CandidatService);
  const candidatureService = inject(CandidatureService);

  return candidatService.getCandidatConnecte().pipe(
    switchMap(candidat => {
      if (!candidat?.refId) {
        console.warn('⚠️ Aucun candidat connecté.');
        return of({ candidat: null, candidatures: [] });
      }
      return candidatureService.getCandidaturesByCandidat(candidat.refId).pipe(
        map(candidatures => ({ candidat, candidatures })),
        catchError(err => {
          console.error('❌ Erreur lors du chargement des candidatures :', err);
          return of({ candidat, candidatures: [] });
        })
      );
    }),
    catchError(err => {
      console.error('❌ Erreur lors du chargement du candidat :', err);
      return of({ candidat: null, candidatures: [] });
    })
  );
};

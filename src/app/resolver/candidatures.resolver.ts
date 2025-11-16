import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of, timeout, take } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { CandidatService } from '../service/candidate.service';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../modeles/candidature';

export const CandidaturesResolver: ResolveFn<{
  candidat: any;
  candidatures: Candidature[];
  currentPage: number;
  totalPages: number;
}> = () => {
  const candidatService = inject(CandidatService);
  const candidatureService = inject(CandidatureService);

  const page = 0;
  const size = 8;

  return candidatService.getCandidatConnecte().pipe(
    take(1),
    timeout(4000),
    switchMap(candidat => {
      if (!candidat?.refId) {
        return of({ candidat: null, candidatures: [], currentPage: 0, totalPages: 0 });
      }

      return candidatureService.getCandidaturesByCandidatPaginated(candidat.refId, page, size).pipe(
        map(response => ({
          candidat,
          candidatures: response?.content ?? [],
          currentPage: response?.currentPage ?? 0,
          totalPages: response?.totalPages ?? 1
        })),
        catchError(err => {
          console.error('❌ Erreur lors du chargement des candidatures :', err);
          return of({ candidat, candidatures: [], currentPage: 0, totalPages: 0 });
        })
      );
    }),
    catchError(err => {
      console.error('❌ Erreur lors du chargement du candidat :', err);
      return of({ candidat: null, candidatures: [], currentPage: 0, totalPages: 0 });
    })
  );
};

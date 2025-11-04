
import { Page } from '../modeles/page';
import { Offre } from '../modeles/offres';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OffresService } from './offres.service';



export const offreResolver: ResolveFn<Page<Offre>> = () => {
  const offreService = inject(OffresService);
  return offreService.getOffresPaged(0, 12, 'datePublication', 'desc');
};

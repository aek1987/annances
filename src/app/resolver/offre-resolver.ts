
import { Page } from '../modeles/page';
import { Offre } from '../modeles/offres';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OffresService } from '../service/offres.service';



export const offreResolver: ResolveFn<Page<Offre>> = () => {
  const offreService = inject(OffresService);
  return offreService.getOffresPaged(0, 10, 'datePublication', 'desc');
};

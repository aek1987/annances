import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/modeles/candidat';
import { Candidature } from 'src/app/modeles/candidature';
import { Entreprise } from 'src/app/modeles/entreprise';
import { Offre } from 'src/app/modeles/offres';
import { CandidatService } from 'src/app/service/candidate.service';
import { CandidatureService } from 'src/app/service/candidature.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-offre-visiteur',
  templateUrl: './offre-visiteur.component.html',
  styleUrls: ['./offre-visiteur.component.css']
})
export class OffreVisiteurComponent implements OnInit {
  // 🔎 Champs recherche
  searchTerm: string = '';
  searchLocation: string = '';
  searchSalary: number | null = null;
  searchExperience: string = '';
  // 🎯 Filtres
  selectedContract: string = '';
  selectedRemote: string = '';
  selectedSector: string = '';
  sectors: string[] = ['Informatique', 'Finance', 'Santé', 'Éducation','Energie renouvelable'];
  // 📩 Alerte email
  alertEmail: string = '';
  // 📂 Données d’exemple
  filteredOffres: Offre[] = [];
// Pour gérer les onglets
  activeTab: 'offres' | 'profil' = 'offres';
 candidatConnecte: Candidat | null = null;

// 🔹 Suivi des candidatures
candidatures: Candidature[] = [];
entrepise: Entreprise  | undefined
newSkill: string = '';
offres: Offre[] = [];
  constructor(private offreService: OffresService,private entrepriseService :EntrepriseService ,  private candidatService: CandidatService,
 private candidature: CandidatureService

  ) {}
  
  ngOnInit(): void {
    // 🔥 Appel du service pour charger les offres
    this.offres = this.offreService.getAllOffres();
    this.filteredOffres = this.offres;   
   // this.candidatConnecte = this.candidatService.getCandidatConnecte();
   // console.log("condidat name  "+this.candidatConnecte?.username +" id= "+this.candidatConnecte?.refId);
  }



  applyFilters() {
  this.filteredOffres = this.offres.filter(offre => {
    const entreprise = this.getentreprise(offre.entrepriseId);

    return (
      (!this.searchTerm || offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.searchLocation || offre.localisation.toLowerCase().includes(this.searchLocation.toLowerCase())) &&
      (!this.searchSalary || offre.salaire >= this.searchSalary) &&
      (!this.selectedContract || offre.contrat === this.selectedContract) &&
      (!this.selectedRemote ||
        (this.selectedRemote === 'oui' && offre.contrat === 'Remote') ||
        (this.selectedRemote === 'non' && offre.contrat !== 'Remote')) &&
      (!this.selectedSector || (entreprise && entreprise.secteur.toLowerCase() === this.selectedSector.toLowerCase()))
    );
  });
}


  // ✅ Postuler
  postuler(offre: Offre) {
   if (!this.candidatConnecte) {
    alert('Vous devez être connecté pour postuler.');
    return;
  }

  // Appelle le service pour créer la candidature
  const candidature = this.candidature.addCandidature(
    offre.id,
    this.candidatConnecte.refId,
    "Je suis très intéressé par cette offre." // message de candidature
  );

   // Confirmation
  alert(`✅ Vous avez postulé à : ${offre.titre}\nCandidature ID : ${candidature.id}`);
  }

  // ⭐ Favoris
  toggleFavori(offre: Offre) {
    offre.favori = !offre.favori;
  }

  
  getentreprise    (entrepriseId :number) : Entreprise  | undefined
  {
  const entrepise = this.entrepriseService.getEntrepriseById(entrepriseId);
  
  return entrepise;

  }

}


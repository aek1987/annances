import { Component, OnInit } from '@angular/core';
import { Offre } from 'src/app/modeles/offres';
import { AuthService } from 'src/app/service/auth.service';
import { OffresService } from 'src/app/service/offres.service';

@Component({
  selector: 'app-offres-admin',
  templateUrl: './offres-admin.component.html',
  styleUrls: ['./offres-admin.component.css']
})
export class OffresAdminComponent implements OnInit {

searchQuery: string = '';
filteredOffres: Offre[] = [];

  offres: Offre[] = [];
  newOffre: Partial<Offre> = {};
  entrepriseId: number | null = null;

  constructor(
    private offreService: OffresService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
   
      
      this.loadOffres(); 
      this.filteredOffres = this.offres;
    
  }

  loadOffres() {
    
     this.offreService.getAllOffres().subscribe({
      next: (data) => {
        this.offres = data; // ✅ ici on affecte les données réelles
      },
      error: (err) => {
        console.error('Erreur lors du chargement des offres', err);
      }
    });
    
  }

  addOffre() {
   /* if (this.entrepriseId && this.newOffre.titre && this.newOffre.description && this.newOffre.localisation) {
      this.offreService.addOffre({
        ...this.newOffre,
        entrepriseId: this.entrepriseId
      });*/
      this.newOffre = {};
      this.loadOffres();
    }
  

  deleteOffre(id: number) {
 /*   this.offreService.deleteOffre(id);
    this.loadOffres();*/
  }
  
  // Édite une offre (exemple basique : redirection vers page édition)
  editOffre(offre: Offre): void {
   // this.router.navigate(['/admin/offres/edit', offre.id]);
  }
  acceptOffre(offre: Offre): void {
  offre.status = 'accepte';
  // 🔹 Si tu utilises un service qui persiste les offres, tu peux appeler :
  // this.offreService.updateOffre(offre);
}
searchOffres(): void {
  if (!this.searchQuery.trim()) {
    this.filteredOffres = this.offres;
    return;
  }

  const query = this.searchQuery.toLowerCase();
  this.filteredOffres = this.offres.filter(offre =>
    (offre.poste?.toLowerCase().includes(query) || 
     offre.localisation?.toLowerCase().includes(query))
  );
}
}
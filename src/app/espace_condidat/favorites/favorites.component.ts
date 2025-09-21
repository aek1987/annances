import { Component, OnInit } from '@angular/core';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  dateSaved: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteJobs: Job[] = [];

  ngOnInit(): void {
    // Exemple de données, à remplacer par ton service réel
    this.favoriteJobs = [
      { id: 1, title: 'Développeur Angular', company: 'Tech Corp', location: 'Paris', dateSaved: '2025-09-20' },
      { id: 2, title: 'Administrateur Linux', company: 'SysAdmin Inc', location: 'Lyon', dateSaved: '2025-09-18' },
      { id: 3, title: 'Chef de projet', company: 'ProjetX', location: 'Marseille', dateSaved: '2025-09-15' },
    ];
  }
  removeFavorite(id: number) {
  this.favoriteJobs = this.favoriteJobs.filter(job => job.id !== id);
}


}

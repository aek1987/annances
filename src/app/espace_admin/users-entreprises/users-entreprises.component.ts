import { Component } from '@angular/core';
import { Entreprise } from 'src/app/modeles/entreprise';
import { EntrepriseService } from 'src/app/service/entreprise.service';

@Component({
  selector: 'app-users-entreprises',
  templateUrl: './users-entreprises.component.html',
  styleUrls: ['./users-entreprises.component.css']
})
export class UsersEntreprisesComponent {
 entreprises: Entreprise[] = [];

  constructor(private entreprisesService: EntrepriseService) {}

  ngOnInit(): void {
    this.entreprises = this.entreprisesService.getEntreprises();
  }
}

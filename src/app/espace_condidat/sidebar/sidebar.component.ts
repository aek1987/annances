import { Component, Input } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Account } from 'src/app/modeles/accounts';
import { Candidat } from 'src/app/modeles/candidat';
import { AuthService } from 'src/app/service/auth.service';
import { CandidatService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  faLogout = faSignOutAlt;

  @Input() candidatures: any[] = [];
 
  candidat: Candidat | null = null;
  currentUser: Account | null = null;
  constructor(private authService: AuthService, private translate: TranslateService,private candidatService :CandidatService) {
  
    }
  
  ngOnInit() {
  this.currentUser = this.authService.getUser();
  this.loadCandidat();
  }

   // 🔹 Charge le candidat connecté depuis le service
loadCandidat() {
  this.candidatService.getCandidatConnecte().subscribe(candidat => {
   if (!candidat) return;
    this.candidat = candidat;

    console.log('👤 Candidat connecté sidebar:', candidat);

    // ✅ Calcul après chargement
    if(this.candidat.status!=="active"){
    const progression = this.progression;
    this.candidat.status = this.candidatService.getStatus(this.candidat);

    console.log(      'Progression calculée :',
      progression,      'Status :',      this.candidat.status    );}
  });

}


get progression(): number {
  if (!this.candidat) return 0;
  return this.candidatService.getProgression(this.candidat);
}





}

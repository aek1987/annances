import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';


import { AdminGuard } from './admin.guard';
import { GreetingComponent } from './greeting/greeting.component';
import { AnnanceEmploiComponent } from './annance-emploi/annance-emploi.component';
import { ProfilComponent } from './espace_condidat/profil/profil.component';
import { LayoutComponent } from './espace_condidat/layout/layout.component';
import { FavoritesComponent } from './espace_condidat/favorites/favorites.component';
import { AuthGuard } from './guards/auth.guard';
import { MesAlertesComponent } from './espace_condidat/alerts/mes-alertes.component';
import { CandidaturesComponent } from './espace_condidat/candidatures/candidatures.component';
import { AdminLayoutComponent } from './espace_admin/admin-layout/admin-layout.component';
import { UsersCandidatsComponent } from './espace_admin/users-candidats/users-candidats.component';
import { UsersEntreprisesComponent } from './espace_admin/users-entreprises/users-entreprises.component';
import { OffresAdminComponent } from './espace_admin/offres-admin/offres-admin.component';
import { CandidaturesAdminComponent } from './espace_admin/candidatures-admin/candidatures-admin.component';
import { AlertsAdminComponent } from './espace_admin/alerts-admin/alerts-admin.component';
import { SettingsAdminComponent } from './espace_admin/settings-admin/settings-admin.component';
import { EntrepriseLayoutComponent } from './espace_entreprise/entreprise-layout/entreprise-layout.component';
import { AjouterOffreComponent } from './espace_entreprise/ajouter-offre/ajouter-offre.component';
import { MesOffresComponent } from './espace_entreprise/mes-offres/mes-offres.component';
import { EntrepriseDashboardComponent } from './espace_entreprise/dashboard/entreprise-dashboard.component';
import { CandidaturesRecuesComponent } from './espace_entreprise/candidatures-recues/candidatures-recues.component';
import { EtrepriseSettingComponent } from './espace_entreprise/etreprise-setting/etreprise-setting.component';
import { OffresEmploiComponent } from './espace_condidat/offre-emploi/offres-emploi.component';
import { AbonneeComponent } from './espace_entreprise/abonnee/abonnee.component';
import { OffreDetailComponent } from './espace_condidat/offre-detail/offre-detail.component';
import { OffreVisiteurComponent } from './espace-visiteur/offre-visiteur/offre-visiteur.component';
import { LayoutVisteurComponent } from './espace-visiteur/layout-visteur/layout-visteur.component';
import { AideSupportComponent } from './components/aide-support/aide-support.component';
import { SuccessStoriesComponent } from './espace-visiteur/success-stories/success-stories.component';
import { RegistersComponent } from './components/registers/registers.component';
import { EntreprisesRecrutentComponent } from './partenaire/entreprises-recrutent/entreprises-recrutent.component';
import { DevenirPartenaireComponent } from './partenaire/devenir-partenaire/devenir-partenaire.component';
import { NosPartenairesComponent } from './partenaire/nos-partenaires/nos-partenaires.component';
import { StagesComponent } from './partenaire/stages/stages.component';
import { ProfilComponentEntreprise } from './espace_entreprise/profil-entreprise/profi-entreprise.component';
import { DetailEntrepriseComponent } from './espace_admin/detail-entreprise/detail-entreprise.component';
import { OffreDetailVisiteurComponent } from './espace-visiteur/offre-detail-visiteur/offre-detail-visiteur.component';
import { CandidaturesOffreComponent } from './espace_entreprise/candidatures-offre/candidatures-offre.component';
import { offreResolver } from './resolver/offre-resolver';
import { CandidaturesResolver } from './resolver/candidatures.resolver';




const routes: Routes = [
  // Partie admin
  
 
  
 // ... autres routes existantes
  { path: 'entreprises-recrutent', component: EntreprisesRecrutentComponent },
  { path: 'devenir-partenaire', component: DevenirPartenaireComponent },
  { path: 'nos-partenaires', component: NosPartenairesComponent },
  //{ path: 'offres-emploi', component: OffresEmploiComponent },
  { path: 'stages', component: StagesComponent },
  // Partie publique
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistersComponent },

 
 
  { path: 'greet', component: GreetingComponent },
  { path: 'annance-emploi', component: AnnanceEmploiComponent },

  {
  path: 'visiteur',
  component: LayoutVisteurComponent,
  children: [
    { path: '', component: OffreVisiteurComponent ,  resolve: { offresData: offreResolver } }, // par défaut
    { path: 'aide-support', component: AideSupportComponent },
    { path: 'success-stories', component: SuccessStoriesComponent },
    { path: 'offre/:id', component: OffreDetailVisiteurComponent }
  ]
},
  // Partie espace candidat
  {
    path: 'candidat',
    component: LayoutComponent,
 //   canActivate: [AuthGuard],
  //  canActivateChild: [AuthGuard],
    children: [
      { path: 'offres-emploi', component: OffresEmploiComponent , resolve: { offresData: offreResolver }},
      { path: 'favorites', component: FavoritesComponent },
      { path: 'settings', component: ProfilComponent },
      { path: 'alerts', component: MesAlertesComponent },
      { path: 'mes-candidatures', component: CandidaturesComponent , resolve: { candidatures: CandidaturesResolver }},
      {path: 'offre/:id',  component: OffreDetailComponent },
      { path: '', redirectTo: 'offres-emploi', pathMatch: 'full' },
    ]
  },

  // Partie admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
   canActivate: [AuthGuard],
   canActivateChild: [AuthGuard],
    children: [
      { path: 'users/candidats', component: UsersCandidatsComponent },
      { path: 'users/entreprises', component: UsersEntreprisesComponent },
      { path: 'offres', component: OffresAdminComponent },
      { path: 'candidatures', component: CandidaturesAdminComponent },
      { path: 'alerts', component: AlertsAdminComponent },
      { path: 'settings', component: SettingsAdminComponent },      
      { path: 'entreprises/:id', component: DetailEntrepriseComponent } ,
      { path: '', redirectTo: 'users/candidats', pathMatch: 'full' },
       // redirection par défaut
    ]
  },

  // Partie entreprise
  {
    path: 'entreprise',
    component: EntrepriseLayoutComponent,
  //  canActivate: [AuthGuard],
  //  canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: EntrepriseDashboardComponent },
      { path: 'mes-offres', component: MesOffresComponent },
      { path: 'ajouter-offre', component: AjouterOffreComponent },
      { path: 'candidatures', component: CandidaturesRecuesComponent },
      { path: 'offre-candidatures/:id', component: CandidaturesOffreComponent },
      { path: 'profil', component: ProfilComponentEntreprise  },
      { path: 'settings', component: EtrepriseSettingComponent },
      { path: 'abonnement', component: AbonneeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirection par défaut
    ]
  },

  // Page d’accueil
  { path: '', redirectTo: 'greet', pathMatch: 'full' },

  // Page 404
  { path: '**', redirectTo: 'greet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

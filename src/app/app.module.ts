
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';  // Import FormsModule
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CarouselComponent } from './carousel/carousel.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ThousandSeparatorPipe } from './pipe/thousand-separator.pipe';
import { AnnanceEmploiComponent } from './annance-emploi/annance-emploi.component';
import { ProfilComponent } from './espace_condidat/profil/profil.component';
import { SidebarComponent } from './espace_condidat/sidebar/sidebar.component';
import { LayoutComponent } from './espace_condidat/layout/layout.component';
import { FavoritesComponent } from './espace_condidat/favorites/favorites.component';
import { CandidaturesComponent } from './espace_condidat/candidatures/candidatures.component';
import { DashboardComponent } from './espace_admin/dashboard/dashboard.component';
import { UsersCandidatsComponent } from './espace_admin/users-candidats/users-candidats.component';
import { UsersEntreprisesComponent } from './espace_admin/users-entreprises/users-entreprises.component';
import { OffresAdminComponent } from './espace_admin/offres-admin/offres-admin.component';
import { CandidaturesAdminComponent } from './espace_admin/candidatures-admin/candidatures-admin.component';
import { AlertsAdminComponent } from './espace_admin/alerts-admin/alerts-admin.component';
import { SettingsAdminComponent } from './espace_admin/settings-admin/settings-admin.component';
import { AdminLayoutComponent } from './espace_admin/admin-layout/admin-layout.component';
import { SidebarAdminComponent } from './espace_admin/sidebar-admin/sidebar-admin.component';
import { EntrepriseLayoutComponent } from './espace_entreprise/entreprise-layout/entreprise-layout.component';
import { SidebarEntrepriseComponent } from './espace_entreprise/sidebar-entreprise/sidebar-entreprise.component';
import { MesOffresComponent } from './espace_entreprise/mes-offres/mes-offres.component';
import { AjouterOffreComponent } from './espace_entreprise/ajouter-offre/ajouter-offre.component';
import { CandidaturesRecuesComponent } from './espace_entreprise/candidatures-recues/candidatures-recues.component';
import { EtrepriseSettingComponent } from './espace_entreprise/etreprise-setting/etreprise-setting.component';
import { OffresEmploiComponent } from './espace_condidat/offre-emploi/offres-emploi.component';
import { AbonneeComponent } from './espace_entreprise/abonnee/abonnee.component';
import { OffreDetailComponent } from './espace_condidat/offre-detail/offre-detail.component';
import { OffreVisiteurComponent } from './espace-visiteur/offre-visiteur/offre-visiteur.component';
import { LayoutVisteurComponent } from './espace-visiteur/layout-visteur/layout-visteur.component';
import { SidebarVisiteurComponent } from './espace-visiteur/sidebar-visiteur/sidebar-visiteur.component';
import { AideSupportComponent } from './components/aide-support/aide-support.component';
import { SuccessStoriesComponent } from './espace-visiteur/success-stories/success-stories.component';
import { RegistersComponent } from './components/registers/registers.component';
import { NotificationMenuComponent } from './components/notification-menu/notification-menu.component';
import { EntreprisesRecrutentComponent } from './partenaire/entreprises-recrutent/entreprises-recrutent.component';
import { DevenirPartenaireComponent } from './partenaire/devenir-partenaire/devenir-partenaire.component';
import { NosPartenairesComponent } from './partenaire/nos-partenaires/nos-partenaires.component';
import { StagesComponent } from './partenaire/stages/stages.component';
import { EntrepriseDashboardComponent } from './espace_entreprise/dashboard/entreprise-dashboard.component';
import localeFr from '@angular/common/locales/fr';
import { CandidatDetailComponent } from './espace_admin/candidat-detail/candidat-detail.component';
import { ProfilComponentEntreprise } from './espace_entreprise/profil-entreprise/profi-entreprise.component';
import { DetailEntrepriseComponent } from './espace_admin/detail-entreprise/detail-entreprise.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { OffreDetailVisiteurComponent } from './espace-visiteur/offre-detail-visiteur/offre-detail-visiteur.component';
import { CandidaturesOffreComponent } from './espace_entreprise/candidatures-offre/candidatures-offre.component';
import { AuthInterceptor } from './interceptors/interceptor';
import { MesAlertesComponent } from './espace_condidat/alerts/mes-alertes.component';
import { AlerteFrequenceModalComponent } from './espace_condidat/alerts/alerte-frequence-modal/alerte-frequence-modal.component';




registerLocaleData(localeFr);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    RegistersComponent,
    LoginComponent,  
    NavbarComponent,
    CarouselComponent,     
    ThousandSeparatorPipe,   
    AnnanceEmploiComponent,
    ProfilComponent,
    SidebarComponent,
    LayoutComponent,
    FavoritesComponent,
    CandidaturesComponent,
    MesAlertesComponent,
    UsersCandidatsComponent,
    UsersEntreprisesComponent,
    OffresAdminComponent,
    CandidaturesAdminComponent,
    AlertsAdminComponent,
    SettingsAdminComponent,
    AdminLayoutComponent,
    DashboardComponent,
    SidebarAdminComponent,
    EntrepriseLayoutComponent,
    SidebarEntrepriseComponent,
    MesOffresComponent,
    AjouterOffreComponent,
    CandidaturesRecuesComponent,
    EtrepriseSettingComponent,
    OffresEmploiComponent,
    AbonneeComponent,
    OffreDetailComponent,
    OffreDetailVisiteurComponent,
    OffreVisiteurComponent,
    LayoutVisteurComponent,
    SidebarVisiteurComponent,
    AideSupportComponent,
    SuccessStoriesComponent,
    RegistersComponent,
    NotificationMenuComponent,
    EntreprisesRecrutentComponent,
    DevenirPartenaireComponent,
    NosPartenairesComponent,
    StagesComponent,
    EntrepriseDashboardComponent,
    CandidatDetailComponent,
    ProfilComponentEntreprise,
    DetailEntrepriseComponent,
    CandidaturesOffreComponent,
    AlerteFrequenceModalComponent
   
  
   
   
  ],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     ReactiveFormsModule, 
    HttpClientModule,FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Position des messages toast
      timeOut: 3000, // Temps d'affichage en millisecondes
    }), 
    TranslateModule.forRoot({ // Configurez TranslateModule
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  
  ],
 
  providers: [ { provide: LOCALE_ID, useValue: 'fr-FR' } , 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],

  bootstrap: [AppComponent]
})
export class AppModule { }

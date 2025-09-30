
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { NavbarComponent } from './components/navbar/navbar.component';  // Import FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ThousandSeparatorPipe } from './pipe/thousand-separator.pipe';
import { OrderManagementComponent } from './order-management/order-management.component';
import { CartComponent } from './cart/cart.component';
import { AnnanceEmploiComponent } from './annance-emploi/annance-emploi.component';
import { ProfilComponent } from './espace_condidat/profil/profil.component';
import { SidebarComponent } from './espace_condidat/sidebar/sidebar.component';
import { LayoutComponent } from './espace_condidat/layout/layout.component';
import { FavoritesComponent } from './espace_condidat/favorites/favorites.component';
import { CandidaturesComponent } from './espace_condidat/candidatures/candidatures.component';
import { AlertsComponent } from './espace_condidat/alerts/alerts.component';
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








export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    RegistersComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    OrderTrackingComponent,   
    NavbarComponent,
    DeliveryFormComponent,
    CarouselComponent,  
    ProductDetailComponent,
    ThousandSeparatorPipe,
    OrderManagementComponent,    
    AnnanceEmploiComponent,
    ProfilComponent,
    SidebarComponent,
    LayoutComponent,
    FavoritesComponent,
    CandidaturesComponent,
    AlertsComponent,
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
    OffreVisiteurComponent,
    LayoutVisteurComponent,
    SidebarVisiteurComponent,
    AideSupportComponent,
    SuccessStoriesComponent,
    RegistersComponent,
   
   
  ],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,FontAwesomeModule,
    BrowserAnimationsModule,
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
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StcoktManagerComponent } from './stock-manager/stock-manager.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { AdminGuard } from './admin.guard';
import { GreetingComponent } from './greeting/greeting.component';
import { AnnanceEmploiComponent } from './annance-emploi/annance-emploi.component';
import { OffresEmploiComponent } from './offre-emploi/offres-emploi.component';
import { ProfilComponent } from './espace_condidat/profil/profil.component';
import { LayoutComponent } from './espace_condidat/layout/layout.component';
import { FavoritesComponent } from './espace_condidat/favorites/favorites.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertsComponent } from './espace_condidat/alerts/alerts.component';
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

const routes: Routes = [
  // Partie admin
  { path: 'ordersAllClient', component: OrderManagementComponent, canActivate: [AdminGuard] },
  { path: 'stock', component: StcoktManagerComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'orders', component: OrderTrackingComponent },

  // Partie publique
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'delivery', component: DeliveryFormComponent },
  { path: 'confirm-order', component: OrderConfirmationComponent },
  { path: 'cart', component: CartComponent },
  { path: 'greet', component: GreetingComponent },
  { path: 'annance-emploi', component: AnnanceEmploiComponent },
  { path: 'offres-emploi', component: OffresEmploiComponent },
  // Partie espace candidat
  {
    path: 'candidat',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'offres-emploi', component: OffresEmploiComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'settings', component: ProfilComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'mes-candidatures', component: CandidaturesComponent },
      { path: '', redirectTo: 'offres-emploi', pathMatch: 'full' },
    ]
  },

  // Partie admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
   // canActivate: [AuthGuard],
  //  canActivateChild: [AuthGuard],
    children: [
      { path: 'users/candidats', component: UsersCandidatsComponent },
      { path: 'users/entreprises', component: UsersEntreprisesComponent },
      { path: 'offres', component: OffresAdminComponent },
      { path: 'candidatures', component: CandidaturesAdminComponent },
      { path: 'alerts', component: AlertsAdminComponent },
      { path: 'settings', component: SettingsAdminComponent },
      { path: '', redirectTo: 'users/candidats', pathMatch: 'full' }, // redirection par défaut
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
      { path: 'profil', component: ProfilComponent },
      { path: 'settings', component: EtrepriseSettingComponent },
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

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
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { OffresEmploiComponent } from './espace_condidat/offre-emploi/offres-emploi.component';
import { ProfilComponent } from './espace_condidat/profil/profil.component';
import { LayoutComponent } from './espace_condidat/layout/layout.component';
import { FavoritesComponent } from './espace_condidat/favorites/favorites.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertsComponent } from './espace_condidat/alerts/alerts.component';
import { CandidaturesComponent } from './espace_condidat/candidatures/candidatures.component';


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
  { path: 'entreprise', component: EntrepriseComponent },
  { path: 'annance-emploi', component: AnnanceEmploiComponent },

  // Partie espace candidat (protégé)
  {  
    path: 'candidat', component: LayoutComponent,
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

  // Page d’accueil par défaut
  { path: '', redirectTo: 'greet', pathMatch: 'full' },

  // Page 404
  { path: '**', redirectTo: 'greet' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

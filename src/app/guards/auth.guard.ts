import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  // Vérifie l'accès à la route principale
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  // Vérifie l'accès aux enfants de la route (LayoutComponent)
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

private checkLogin(): boolean {
  const user = this.authService.getUser();
  console.log("valeur récupérée par getUser " + user?.role);

  if (user) {
    if (user.role === 'candidat') {
      return true;
    } else {
      console.log("Mauvais rôle → accès refusé");
      this.router.navigate(['/login']);
      return false;
    }
  } else {
    console.log("Pas connecté → redirection login");
    this.router.navigate(['/login']);
    return false;
  }
}
}

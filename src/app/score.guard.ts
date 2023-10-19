import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Obtiene el valor del 'score' del parámetro de la ruta
    const score = parseFloat(route.params['score']);

    // Comprueba si el 'score' es mayor o igual a 30.0
    if (score >= 30) {
      // Permite la navegación
      return true;
    } else {
      // Redirige a una página de error
      this.router.navigate(['/error']); 
      return false;
    }
  }
}

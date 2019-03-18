import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class UnauthorizedGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userIsAuthenticated = this.authService.isAuthenticated();

    if (userIsAuthenticated !== true) {
      return true;
    }

    // navigate to not found page
    this.router.navigate(['/app']);
    return false;
  }

}

import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '@services/utils.service';
import { environment } from '@environments/environment';

@Injectable()
export class UnauthorizedGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilsService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const userIsAuthenticated = await this.authService.isAuthenticated();
    if (userIsAuthenticated !== true) {
      // skip global login on local development and on registration
      if (environment.skipGlobalLogin || state.url.includes('registration')) {
        return true;
      }
      // redirect to global login
      this.utils.openUrl(`${ environment.globalLoginUrl }?referrer=${ window.location.hostname }&stackUuid=${ environment.stackUuid }`);
      return false;
    }

    // navigate to not found page
    this.router.navigate(['/app']);
    return false;
  }

}

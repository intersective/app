import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '@services/storage.service';

@Injectable()
export class ProgramSelectedGuard implements CanActivate {


  constructor(
    private router: Router,
    private storage: BrowserStorageService
  ) {}

  // if user hasn't selected a program
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.storage.getUser();
    const timelineId = user.timelineId;

    if (timelineId) {
      return true;
    }

    // navigate to not found page
    this.router.navigate(['switcher', 'switcher-program']);
    return false;
  }

}

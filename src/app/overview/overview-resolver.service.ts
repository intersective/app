import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { User, BrowserStorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class OverviewResolverService implements Resolve<User> {
  constructor(private storage: BrowserStorageService, private router: Router) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return await this.storage.getUser();
  }
}

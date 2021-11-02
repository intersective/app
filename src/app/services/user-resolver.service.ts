import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { User, BrowserStorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<User> {
  constructor(
    private storage: BrowserStorageService,
  ) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): any {
    return this.storage.getUser();
  }
}

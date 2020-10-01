import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { SwitcherService, ProgramObj } from './switcher.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramsResolverService implements Resolve<Promise<Observable<ProgramObj[]>>> {
  constructor(private switcherService: SwitcherService, private router: Router) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<ProgramObj[]>> {
    const programs = await this.switcherService.getPrograms();
    return programs;
  }
}

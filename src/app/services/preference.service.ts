import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '@environments/environment';

export const APIs = {
  preference: environment.lambdaServices.preferences,
};

export interface PreferenceOption {
  name: string;
  medium: string;
  value: boolean;
  locked: boolean;
  locked_name: string;
}

export interface Preference {
  key: string;
  name: string;
  description: string;
  remarks?: string;
  options?: PreferenceOption[];
}

export interface Category {
  name: string;
  order: number;
  preferences: Preference[];
}

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private _preferences$ = new BehaviorSubject<any>({});

  preference$ = this._preferences$.asObservable();

  constructor(private request: RequestService) { }

  getPreference(): Subscription {
    return this.request.get(APIs.preference, {}).pipe(
      distinctUntilChanged(),
      tap(res => {
        this._preferences$.next(res);
      })
    ).subscribe();
  }
}

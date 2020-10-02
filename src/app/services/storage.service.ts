import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NativeStorageService } from './native-storage.service';
import { Capacitor } from '@capacitor/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

export interface User {
  id?: string;
  name?: string;
  apikey?: string;
  contactNumber?: string;
  email?: string;
  role?: string;
  image?: string;
  linkedinConnected?: boolean;
  linkedinUrl?: string;
  programId?: number;
  programName?: string;
  programImage?: string;
  experienceId?: number;
  timelineId?: number;
  projectId?: number;
  teamId?: number;
  userHash?: string;
  maxAchievablePoints?: number;
  themeColor?: string;
  activityCardImage?: string;
  hasReviewRating?: boolean;
  truncateDescription?: boolean;
  enrolment?: any;
  hasEvents?: boolean;
  hasReviews?: boolean;
  LtiReturnUrl?: string;
}

export interface Config {
  logo?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})

export class BrowserStorageService {
  private isNative = Capacitor.isNative;
  public memoryCache: any;

  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage,
    private nativeStorage: NativeStorageService
  ) {}

  nativeGet(key: string) {
    return this.nativeStorage.getObject(key);
  }

  nativeSet(key: string, value: any) {
    return this.nativeStorage.setObject(key, value);
  }

  get(key: string): Promise<any> {
    if (this.isNative) {
      return this.nativeGet(key);
    }

    const cached = this.storage.getItem(key);
    if (cached) {
      return JSON.parse(this.storage.getItem(key) || null);
    }
    return null;
  }

  set(key: string, value: any) {
    if (this.isNative) {
      return this.nativeSet(key, value);
    }
    return this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  async getUser(): Promise<any> {
    const result = await this.get('me');
    return result || {};
  }

  async setUser(user: User) {
    const cachedUser = await this.getUser();
    await this.set('me', Object.assign(cachedUser, user));
    return true;
  }

  getConfig() {
    return this.get('config') || {};
  }

  setConfig(config: Config) {
    this.set('config', Object.assign(this.getConfig(), config));
    return true;
  }
  /*********
    'bookedEventActivityIds' records the single booking activity ids that event has been booked for current user
  **********/
  // get the list of activity ids in local storage to check whether we need to show the single booking pop up or not
  getBookedEventActivityIds(): Array<number> {
    return this.get('bookedEventActivityIds') || [];
  }

  // 1. set this value when we get events data from API
  // 2. record the activity id when user book an event
  setBookedEventActivityIds(id: number): void {
    const ids = this.getBookedEventActivityIds();
    ids.push(id);
    this.set('bookedEventActivityIds', ids);
  }

  // remove the activity id when user cancel booking
  removeBookedEventActivityIds(id: number): void {
    const ids = this.getBookedEventActivityIds();
    const index = ids.indexOf(id);
    if (index < 0) {
      return;
    }
    ids.splice(index, 1);
    this.set('bookedEventActivityIds', ids);
    return;
  }

  // remove this cache from local storage
  initBookedEventActivityIds(): void {
    this.remove('bookedEventActivityIds');
  }

  setCountry(country: string) {
    this.set('country', country);
  }

  getCountry(): Promise<string> {
    return this.get('country');
  }

  setCurrentChatChannel(channel) {
    this.set('chatChannel', channel);
  }

  getCurrentChatChannel() {
    return this.get('chatChannel');
  }
}

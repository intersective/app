import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NativeStorageService } from './native-storage.service';
import { Capacitor } from '@capacitor/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

export interface User {
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

  async get(key: string) {
    if (this.isNative) {
      return await this.nativeStorage.getItem(key);
    } else {
      const cached = this.storage.getItem(key);
      if (cached) {
        return JSON.parse(this.storage.getItem(key) || null);
      }
      return null;
    }
  }

  async set(key: string, value: any) {
    if (this.isNative) {
      return await this.nativeStorage.setItem(key, value);
    } else {
      return this.storage.setItem(key, JSON.stringify(value));
    }
  }

  async remove(key: string) {
    if (this.isNative) {
      return await this.nativeStorage.removeItem(key);
    } else {
      return this.storage.removeItem(key);
    }
  }

  async clear() {
    if (this.isNative) {
      return await this.nativeStorage.clear();
    } else {
      return this.storage.clear();
    }
  }

  async getUser(): Promise<User> {
    if (this.isNative) {
      return await this.nativeStorage.getObject('me') || {};
    } else {
      return this.get('me') || {};
    }
  }

  async setUser(user: User) {
    if (this.isNative) {
      return await this.nativeStorage.setObject('me', user);
    } else {
      this.set('me', Object.assign(this.getUser(), user));
      return true;
    }
  }

  async getConfig() {
    if (this.isNative) {
      return await this.nativeStorage.getObject('config') || {};
    } else {
      return this.get('config') || {};
    }
  }

  async setConfig(config: Config) {
    if (this.isNative) {
      const currentConfig = await this.getConfig();
      return await this.nativeStorage.setObject('config', Object.assign(currentConfig, config));
    } else {
      this.set('config', Object.assign(this.getConfig(), config));
      return true;
    }
  }
  /*********
    'bookedEventActivityIds' records the single booking activity ids that event has been booked for current user
  **********/
  // get the list of activity ids in local storage to check whether we need to show the single booking pop up or not
  async getBookedEventActivityIds(): Promise<number[]> {
    return await this.get('bookedEventActivityIds') || [];
  }

  // 1. set this value when we get events data from API
  // 2. record the activity id when user book an event
  async setBookedEventActivityIds(id: number): Promise<void> {
    const ids = await this.getBookedEventActivityIds();
    ids.push(id);
    return await this.set('bookedEventActivityIds', ids);
  }

  // remove the activity id when user cancel booking
  async removeBookedEventActivityIds(id: number): Promise<void> {
    const ids = await this.getBookedEventActivityIds();
    const index = ids.indexOf(id);
    if (index < 0) {
      return;
    }
    ids.splice(index, 1);
    return await this.set('bookedEventActivityIds', ids);
  }

  // remove this cache from local storage
  async initBookedEventActivityIds(): Promise<void> {
    return await this.remove('bookedEventActivityIds');
  }

  async setCountry(country: string) {
    return await this.set('country', country);
  }

  async getCountry() {
    return await this.get('country');
  }

  async setCurrentChatChannel(channel) {
    return await this.set('chatChannel', channel);
  }

  async getCurrentChatChannel() {
    return await this.get('chatChannel');
  }
}

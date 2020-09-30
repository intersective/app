import { Inject, Injectable, InjectionToken } from '@angular/core';
import { User, Config } from './storage.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class NativeStorageService {
  constructor(private storage: Storage) {}

  async setObject(key, value) {
    try {
      const result = await this.storage.set(key, value);
      return result;
    } catch (err) {
      return err;
    }
  }

  async getObject(key) {
    try {
      const ret = await this.storage.get({ key });
      const result = JSON.parse(ret.value);
      return result;
    } catch (err) {
      return err;
    }
  }

  async setItem(key, value) {
    try {
      const result = await this.storage.set({
        key,
        value
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  async getItem(key) {
    try {
      const { value } = await this.storage.get({ key });
      console.log('Got item: ', value);
      return value;
    } catch (err) {
      return err;
    }
  }

  async removeItem(key) {
    try {
      const result = await this.storage.remove({ key });
      return result;
    } catch (err) {
      return err;
    }
  }

  async keys() {
    try {
      const { keys } = await this.storage.keys();
      console.log('Got keys: ', keys);
    } catch (err) {
      return err;
    }
  }

  async clear() {
    try {
      const cleared = await this.storage.clear();
      return cleared;
    } catch (err) {
      return err;
    }
  }
}

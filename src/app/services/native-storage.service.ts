import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { User, Config } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class NativeStorageService {
  constructor() {}

  async setObject(key, value) {
    try {
      const result = await Storage.set({
        key,
        value: JSON.stringify(value)
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  async getObject(key) {
    try {
      const ret = await Storage.get({ key });
      const result = JSON.parse(ret.value);
      return result;
    } catch (err) {
      return err;
    }
  }

  async setItem(key, value) {
    try {
      const result = await Storage.set({
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
      const { value } = await Storage.get({ key });
      console.log('Got item: ', value);
      return value;
    } catch (err) {
      return err;
    }
  }

  async removeItem(key) {
    try {
      const result = await Storage.remove({ key });
      return result;
    } catch (err) {
      return err;
    }
  }

  async keys() {
    try {
      const { keys } = await Storage.keys();
      console.log('Got keys: ', keys);
    } catch (err) {
      return err;
    }
  }

  async clear() {
    try {
      const cleared = await Storage.clear();
      return cleared;
    } catch (err) {
      return err;
    }
  }
}

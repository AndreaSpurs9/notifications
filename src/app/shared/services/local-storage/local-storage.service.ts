import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor() {}

  public async setObject(key: string, value: string) {
    await Preferences.set({
      key: key,
      value: JSON.stringify({
        id: key,
        name: value
      })
    });
  }

  // JSON "get" example
  public async getObject(): Promise<string> {
    const res = await Preferences.get({ key: 'user' });
    return JSON.stringify(res);
  }
}

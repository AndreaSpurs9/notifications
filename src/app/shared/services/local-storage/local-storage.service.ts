import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DefaultPreferences } from '../../interfaces/defaultPreferences.interface';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor() {}

  private readonly defaultPreferences: DefaultPreferences = {
    pushToken: '',
    webToken: ''
  };

  private defaultPreferences$: BehaviorSubject<DefaultPreferences> = new BehaviorSubject<DefaultPreferences>(
    this.defaultPreferences
  );

  private preferences$: BehaviorSubject<DefaultPreferences> = new BehaviorSubject<DefaultPreferences>(
    this.defaultPreferences
  );

  public setPushPreferences(preferences: DefaultPreferences): void {
    try {
      this.preferences$.next({...this.preferences$.value, pushToken: preferences.pushToken})
    } catch (error) {
      console.error('[LocalStorageService] - updatePushToken', error);
    }
  }

  public setWebPreferences(preferences: DefaultPreferences): void {
    try {
      this.preferences$.next({...this.preferences$.value, webToken: preferences.webToken})
    } catch (error) {
      console.error('[LocalStorageService] - updatePushToken', error);
    }
  }

  public getPreferences(): Observable<DefaultPreferences> {
    try {
      return this.preferences$;
    }  catch (error) {
      console.error('[LocalStorageService] - getPreferencesCache', error);
      return this.returnDefaultPreferences();
    }
  }

  private returnDefaultPreferences(): Observable<DefaultPreferences> {
    console.info('[LocalStorageService] - returnDefaultPreferences()');
    return this.defaultPreferences$;
  }
}

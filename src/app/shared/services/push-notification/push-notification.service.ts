// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class PushNotificationsService {

  constructor(private local: LocalStorageService) {}

  public initPush(): void {
    PushNotifications.checkPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      } else {
        // If permission is not granted
      }
    });
    PushNotifications.addListener('registration', async (token) => {
      this.local.setPushPreferences({ pushToken: token.value })
    });
    PushNotifications.addListener('registrationError', (error) => {
      console.log(error);
    });
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notifications) => {
        console.log(notifications);
      }
    );
  }

  public unregister(): void {
    PushNotifications.removeAllListeners();
  }
}

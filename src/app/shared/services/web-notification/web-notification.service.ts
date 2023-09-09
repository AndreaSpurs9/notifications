// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment.prod';
import { SwPush } from "@angular/service-worker";
@Injectable({ providedIn: 'root' })
export class WebNotificationService {

  currentMessage: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private local: LocalStorageService) {}

  public initPush(): void {
    const messaging = getMessaging();
    getToken(messaging,
     { vapidKey: environment.firebase.vapidKey}).then(
       (token) => {
         if (token) {
          this.local.setWebPreferences({ webToken: token })
           console.log('token: ', token);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  public receiveMessage(): void {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload)
    });
  }

  public addListner(): void {

    //  this.local.setPushPreferences({ pushToken: token.value })

  }
}

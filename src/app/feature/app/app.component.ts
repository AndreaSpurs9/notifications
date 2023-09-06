import { Platform } from '@ionic/angular';
import { PushNotificationsService } from '../../shared/services/push-notification/push-notification.service';

import { Component, OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotifications,
} from '@capacitor/push-notifications';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private plt: Platform,
              private push: PushNotificationsService) {}
  public ngOnInit(): void {
    this.plt.ready().then(() => {
      if(this.plt.is('android') || this.plt.is('ios')){
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            this.push.initPush();
            this.push.addListner();
            PushNotifications.addListener(
              'pushNotificationActionPerformed',
              (notification: ActionPerformed) => {
                console.log("action", notification);
                this.notification(notification);
              },
            );
          } else {
            // Show some error
          }
        })
      } else {}
    })
  }


  private async notification(notificationInfo: any): Promise<void> {
    console.log('Push action performed: ' + JSON.stringify(notificationInfo));
    if (!!notificationInfo) {
      switch (notificationInfo.action) {
        case 'click':
          break;
        default:
          break;
      }
    }
  }
}

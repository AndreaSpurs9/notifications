import { Platform } from '@ionic/angular';
import { PushNotificationsService } from '../../shared/services/push-notification/push-notification.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotifications,
} from '@capacitor/push-notifications';
import { WebNotificationService } from 'src/app/shared/services/web-notification/web-notification.service';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  message: any;

  constructor(
    private swPush: SwPush,
    private plt: Platform,
    private router: Router,
    private push: PushNotificationsService,
    private webPush: WebNotificationService
  ) {}

  public ngOnInit(): void {
    this.plt.ready().then(() => {
      if (this.plt.is('android') || this.plt.is('ios')) {
        PushNotifications.checkPermissions().then((perm) => {
          if (perm.receive === 'granted') {
            this.addPush();
          } else {
            PushNotifications.requestPermissions().then((result) => {
              if (result.receive === 'granted') {
                this.addPush();
              } else {
                // Show some error
              }
            });
          }
        });
      } else {
        this.webPush.initPush();
        this.webPush.receiveMessage();
      }
    });
  }

  private addPush(): void {
    this.push.initPush();
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.notification(notification);
      }
    );
  }

  private notification(notificationInfo: any): void {
    console.log('Push action performed: ' + notificationInfo.actionId);
    switch (notificationInfo.actionId) {
      case 'tap':
        this.router.navigateByUrl('received', {
          state: { notification: notificationInfo },
        });
        break;
    }
  }
}

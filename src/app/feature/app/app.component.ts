import { Platform } from '@ionic/angular';
import { PushNotificationsService } from '../../shared/services/push-notification/push-notification.service';

import { Component, OnInit } from '@angular/core';

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
        this.push.initPush()
      }
    })

  }

}

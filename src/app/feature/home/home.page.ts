import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private pushKey: string = "";

  constructor(private http: HttpClient,
    private local: LocalStorageService) {}

  public async ngOnInit(): Promise<void> {
    this.pushKey = await this.local.getObject();
  }

  public sendPush(): void {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key:" + environment.pushServerKey
    });
    let body = {
      "to": this.pushKey,
      "notification": {
        "title": "Title",
        "body": "Body notifications",
        "sound": "default"
      }
    };
    console.log("send push")
    this.http.post("https://fcm.googleapis.com/fcm/send", body, {headers: headers})
  }
}

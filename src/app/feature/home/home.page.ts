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


  constructor(private http: HttpClient,
    private local: LocalStorageService) {}

  public ngOnInit(): void {
  }

  public async sendPush(): Promise<void> {
    let pushKey = "";
    await this.local.getObject().then(
      (val) => {
        pushKey = val;
      }
    );
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key=" + environment.pushServerKey
    });
    console.log("sendPush", pushKey)
    let body = {
      "to": pushKey.toString(),
      "notification": {
        "title": "Check this Mobile (title)",
        "body": "Rich Notification testing (body)",
        "mutable_content": true,
        "sound": "Tri-tone"
        }
    };
    this.http.post<any>("https://fcm.googleapis.com/fcm/send", body, {headers: headers}).subscribe(() =>{
      console.log("Sended")
    })
  }
}
